"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

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

export default function StorePage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartLoading, setCartLoading] = useState<string | null>(null);
  const [showSignupModal, setShowSignupModal] = useState(true);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail) return;

    setSignupLoading(true);
    try {
      // Store in localStorage as backup
      const emails = JSON.parse(localStorage.getItem("signupEmails") || "[]");
      emails.push({ email: signupEmail, date: new Date().toISOString() });
      localStorage.setItem("signupEmails", JSON.stringify(emails));

      // Send welcome email via EmailJS
      const response = await fetch("/api/send-welcome-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to_email: signupEmail,
        }),
      });

      if (response.ok) {
        setSignupSuccess(true);
        setSignupEmail("");
        setTimeout(() => {
          setShowSignupModal(false);
          setSignupSuccess(false);
        }, 2000);
      } else {
        alert("Error signing up. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to sign up");
    } finally {
      setSignupLoading(false);
    }
  };

  const handleAddToCart = async (variantId: string) => {
    setCartLoading(variantId);
    try {
      const response = await fetch("/api/shopify-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantId,
          quantity: 1,
        }),
      });

      const data = await response.json();
      if (data.checkoutUrl) {
        // Redirect to Shopify checkout
        window.location.href = data.checkoutUrl;
      } else {
        console.error("Checkout error response:", JSON.stringify(data, null, 2));
        const errorMsg = data.details 
          ? `${data.error}: ${JSON.stringify(data.details)}` 
          : data.error || "Unknown error";
        alert(`Error creating checkout: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add to cart");
    } finally {
      setCartLoading(null);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/shopify-products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white lg:bg-white/80 lg:backdrop-blur border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-semibold text-[#455d58]">
            ← Back to Home
          </Link>
          <div />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Our Natural Cleaning Products</h2>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Eco-friendly, non-toxic cleaning solutions created to bring hotel-level clean to your home.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-slate-500">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">Error loading products: {error}</p>
            <a
              href="https://acayjv-mz.myshopify.com/"
              target="_blank"
              className="mt-4 inline-block text-red-600 hover:underline"
            >
              Visit Shopify Store
            </a>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 mb-4">No products available yet.</p>
            <a
              href="https://acayjv-mz.myshopify.com/"
              target="_blank"
              className="inline-block px-6 py-3 rounded-2xl bg-[#455d58] text-white font-medium hover:bg-[#374643]"
            >
              Shop on Shopify
            </a>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                {product.images.length > 0 && (
                  <div className="relative h-64 w-full bg-slate-100">
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].altText || product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}


                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{product.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[#455d58]">
                        ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {product.priceRange.minVariantPrice.currencyCode}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      if (product.variants.length > 0) {
                        handleAddToCart(product.variants[0].id);
                      }
                    }}
                    className="mt-6 w-full px-4 py-3 rounded-xl bg-[#455d58] text-white font-medium hover:bg-[#374643] transition-colors disabled:opacity-50"
                    disabled={cartLoading === product.variants[0]?.id}
                  >
                    {cartLoading === product.variants[0]?.id ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">Also available at Clark Park Farmers Market every Saturday</p>
        </div>
      </div>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowSignupModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
            >
              <FaTimes size={24} />
            </button>

            {signupSuccess ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-2xl font-bold text-[#455d58] mb-2">Thank You!</h3>
                <p className="text-slate-600">Check your email for exclusive offers.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#455d58] mb-2">
                  Stay Updated!
                </h2>
                <p className="text-slate-600 mb-6">
                  Get early access to new products, exclusive discounts, and learn about upcoming events at Clark Park Farmers Market.
                </p>

                <form onSubmit={handleSignup} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#455d58] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={signupLoading}
                    className="w-full px-4 py-3 rounded-xl bg-[#455d58] text-white font-medium hover:bg-[#374643] transition-colors disabled:opacity-50"
                  >
                    {signupLoading ? "Signing up..." : "Sign Me Up"}
                  </button>
                </form>

                <button
                  onClick={() => setShowSignupModal(false)}
                  className="w-full mt-3 py-2 text-slate-600 hover:text-slate-900 transition text-sm"
                >
                  Maybe Later
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
