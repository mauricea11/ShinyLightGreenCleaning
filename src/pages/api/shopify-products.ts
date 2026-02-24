import type { NextApiRequest, NextApiResponse } from "next";

const SHOPIFY_STORE = process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME || "acayjv-mz";
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: Array<{
    url: string;
    altText: string;
  }>;
  variants: Array<{
    id: string;
    title: string;
  }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!SHOPIFY_ACCESS_TOKEN) {
    return res.status(500).json({
      error: "Shopify API token not configured",
      message: "Please set SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variable",
    });
  }

  try {
    const query = `
      {
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(`https://${SHOPIFY_STORE}.myshopify.com/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      return res.status(500).json({
        error: "Shopify API error",
        details: data.errors,
      });
    }

    const products: ShopifyProduct[] = data.data.products.edges.map(
      (edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        handle: edge.node.handle,
        description: edge.node.description,
        priceRange: edge.node.priceRange,
        images: edge.node.images.edges.map((img: any) => ({
          url: img.node.url,
          altText: img.node.altText || edge.node.title,
        })),
        variants: edge.node.variants.edges.map((v: any) => ({
          id: v.node.id,
          title: v.node.title,
        })),
      })
    );

    res.status(200).json({ products });
  } catch (error) {
    console.error("Shopify API error:", error);
    res.status(500).json({
      error: "Failed to fetch products",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
