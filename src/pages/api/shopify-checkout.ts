import type { NextApiRequest, NextApiResponse } from "next";

const SHOPIFY_STORE = process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME || "acayjv-mz";
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { variantId, quantity = 1 } = req.body;

  if (!variantId) {
    return res.status(400).json({ error: "variantId is required" });
  }

  if (!SHOPIFY_ACCESS_TOKEN) {
    return res.status(500).json({ error: "Shopify API token not configured" });
  }

  try {
    // Create  cart instead of using deprecated checkoutCreate
    const createCartQuery = `
      mutation CreateCart($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity,
          },
        ],
      },
    };

    console.log("Creating cart with:", JSON.stringify(variables, null, 2));

    const response = await fetch(
      `https://${SHOPIFY_STORE}.myshopify.com/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: createCartQuery,
          variables,
        }),
      }
    );

    const data = await response.json();

    console.log("Shopify cart response:", JSON.stringify(data, null, 2));

    if (data.errors) {
      console.error("Shopify API errors:", data.errors);
      return res.status(500).json({
        error: "Failed to create cart",
        details: data.errors,
      });
    }

    const cart = data.data?.cartCreate?.cart;
    const errors = data.data?.cartCreate?.userErrors;

    if (errors && errors.length > 0) {
      console.error("Cart user errors:", errors);
      return res.status(500).json({
        error: "Cart error",
        details: errors,
      });
    }

    if (!cart || !cart.checkoutUrl) {
      return res.status(500).json({ error: "No cart created" });
    }

    res.status(200).json({
      checkoutUrl: cart.checkoutUrl,
      cartId: cart.id,
    });
  } catch (error) {
    console.error("Checkout API error:", error);
    res.status(500).json({
      error: "Failed to create checkout",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
