"use client";

import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
// (useEffect and useRef imported above)
import Link from "next/link";
import { services } from "@/data/services"; // adjust path if needed

declare global {
  interface Window {
    luxy?: {
      init?: (options?: {
        wrapper?: string;
        targets?: string;
        wrapperSpeed?: number;
      }) => void;
      destroy?: () => void;
      scrollTo?: (y: number) => void;
    };
  }
}

export default function Home() {
  const [status, setStatus] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  

  const [reviewIndex, setReviewIndex] = useState(0);

  const reviews = [
    "They left our apartment sparkling and were so friendly. Booking was a breeze!",
    "The deep clean exceeded expectations—appliances and baseboards look brand new.",
    "Professional, punctual, and thorough. We signed up for bi-weekly right away.",
    "The team is courteous and detailed; our office looks amazing.",
    "Great communication and flexible scheduling — highly recommend.",
    "Exceptional attention to detail; they cleaned areas other companies missed.",
  ];

  useEffect(() => {
    if (reviews.length === 0) return;
    const t = setInterval(() => {
      setReviewIndex((r) => (r + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(t);
  }, [reviews.length]);

  

  const closeMenu = () => setMenuOpen(false);

  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = ""; // reset
    }
  }, [menuOpen]);

  // Make left column taller than right column on md+ screens
  useEffect(() => {
    const update = () => {
      if (!leftColRef.current || !rightColRef.current) return;
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 768) {
        const rightH = Math.ceil(rightColRef.current.getBoundingClientRect().height);
        const desired = rightH + 40;
        const cap = Math.round(window.innerHeight * 0.6); // cap at 60vh
        const final = Math.max(360, Math.min(desired, cap));
        leftColRef.current.style.minHeight = `${final}px`;
      } else {
        leftColRef.current.style.minHeight = "";
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Highlight progress state
  const [highlightProgress, setHighlightProgress] = useState(0);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const handleScroll = () => {
      const rect = hero.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // How much of hero is visible
      const visible = Math.max(
        0,
        Math.min(rect.height, windowHeight - Math.max(0, rect.top))
      );

      const ratio = visible / rect.height;

      // Reset completely when hero is above viewport
      if (rect.top >= 0) {
        setHighlightProgress(0);
      } else if (rect.bottom <= 0) {
        setHighlightProgress(1);
      } else {
        setHighlightProgress(ratio);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount (ensures reset on reload)

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Speed multiplier for stroke
  const adjustedProgress = Math.min(1, highlightProgress * 0.75); // speed

  // Robust smooth scroll:
  // - Subtract header height so sticky header doesn't cover the section
  // - Otherwise use window.scrollTo with smooth behavior
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;

    const headerEl = document.querySelector("header");
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;

    const top =
      el.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({ top, behavior: "smooth" });
  }; // ✅ close smoothScroll here

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (response.ok) {
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus(""), 3000);
    } else {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top Bar - OUTSIDE #luxy */}
      <header className="fixed top-0 left-0 right-0 z-[9999] bg-white lg:bg-white/80 lg:backdrop-blur border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Logo + title */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setHighlightProgress(0); // reset highlight completely
                window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
              }}
            >
              <img
                src="/photos/Marie-Jeanne-Bacchus-10.png"
                alt="Shiny Light Green Cleaning Services Logo"
                className="h-8 w-auto"
              />
            </a>

            <h1 className="text-xl font-semibold tracking-tight max-[485px]:hidden">
              Shiny Light Green Cleaning Services
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <a href="#about" onClick={(e) => smoothScroll(e, "about")}>
              About
            </a>
            <a href="#services" onClick={(e) => smoothScroll(e, "services")}>
              Services
            </a>
            <Link href="/store" className="hover:text-[#455d58]">
              Products
            </Link>
            <a href="#reviews" onClick={(e) => smoothScroll(e, "reviews")}>
              Reviews
            </a>
            <a href="#faq" onClick={(e) => smoothScroll(e, "faq")}>
              FAQ
            </a>
            <a
              href="#contact"
              onClick={(e) => smoothScroll(e, "contact")}
              className="px-4 py-2 rounded-xl bg-[#455d58] text-white shadow hover:bg-[#374643]"
            >
              Book Now
            </a>
          </nav>

          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-2xl text-[#455d58] focus:outline-none z-[10060]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Luxy wrapper for scrollable content ONLY */}
      <div id="luxy" className="pt-20">
        {/* Hero */}
        <section
          id="hero"
          className="relative h-auto md:h-screen flex items-center"
        >
          <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-widest text-xs text-[#455d58]/70 font-semibold">
                Locally owned • Insured & bonded
              </p>
              <h2 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
                Let Shiny Light Green Cleaning Services{" "}
                <span className="relative inline-block">
                  brighten
                  <span
                    className="absolute left-0 -bottom-2 h-2 bg-yellow-300 rounded-sm transition-[width] duration-150 ease-out"
                    style={{ width: `${adjustedProgress * 100}%` }}
                  />
                </span>{" "}
                up your space!
              </h2>

              <p className="mt-4 text-lg text-slate-600">
                From standard upkeep to deep resets, our pros bring hotel-level
                detail to every visit—eco-friendly products, honest pricing, and
                a 100% happiness pledge.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1600&auto=format&fit=crop"
                  alt="Cleaner tidying a bright kitchen"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services">
          {/* ... keep your Services content unchanged ... */}
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h3 className="text-3xl font-bold text-center">What We Offer</h3>
            <p className="mt-2 text-center text-slate-600">
              Pick the clean that fits your life.
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.slug}
                  className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col items-center text-center"
                >
                  <div className="mb-6 h-44 w-44 rounded-full overflow-hidden shadow-md relative">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 176px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <h4 className="text-lg font-semibold">
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-[#455d58] hover:underline block"
                    >
                      {s.title}
                    </Link>
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="snap-start flex items-center justify-center px-6 py-16 min-h-screen"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center md:items-stretch max-w-7xl w-full h-full">
            {/* Image + Heading column */}
            <div ref={leftColRef} className="order-1 md:order-1 md:flex md:flex-col">
              <h3 className="text-3xl font-bold mb-4 text-center">
                To New Beginnings: Our Story
              </h3>
              <div className="aspect-[4/3] md:aspect-auto w-full rounded-3xl overflow-hidden shadow-xl relative md:flex-1 md:h-full">
                <Image
                  src="/photos/clement-dellandrea-pVLNny2Thxo-unsplash.jpg"
                  alt="The Bronx"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Text column */}
            <div ref={rightColRef} className="order-2 md:order-2 md:flex md:items-start md:pt-16 lg:pt-24">
              <p className="text-slate-700">
                Shiny Light Green Cleaning Services was born out of determination, resilience, and a vision for something better. In 2014, Marie Jeanne, a single mother in New York City, set out to support her son and build a future. With hard work, determination, and a commitment to quality, she launched her cleaning services on Groupon—quickly earning a 5-star reputation built on excellence and trust.

A few years later, Marie Jeanne relocated to Philadelphia with a larger vision: to reinvent her business and create something lasting. She founded Shiny Light Green Commercial Cleaning, a company dedicated to delivering exceptional service while staying true to its values of health, sustainability, and integrity. As part of this mission, Marie Jeanne began creating and using natural, non-toxic cleaning products, ensuring safer environments for clients, staff, and the community.

Today, Shiny Light Green Cleaning Services is a successful and growing business trusted by commercial clients across industries. In support of its environmentally conscious mission, Shiny Light Green proudly shares its natural cleaning products with the community through the Clark Park Farmers Market every Saturday.
              </p>
            </div>
          </div>
        </section>



        {/* Reviews */}
        <section id="reviews" className="mx-auto max-w-7xl px-6 py-16">
          <h3 className="text-3xl font-bold text-center">Kind Words from Clients</h3>

          <div className="mt-10 overflow-hidden">
            <div
              className="flex transition-transform duration-700"
              style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
            >
              {reviews.map((quote, i) => (
                <figure
                  key={i}
                  className="min-w-full rounded-3xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col items-center justify-center"
                >
                  <blockquote className="text-slate-700 text-center">“{quote}”</blockquote>
                  <figcaption className="mt-4 text-sm text-slate-500">— Verified Customer</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === reviewIndex ? "bg-[#455d58]" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </section>

              {/* Stats */}
        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="rounded-2xl border border-slate-100 p-6 shadow-sm">
              <p className="text-3xl font-extrabold">5k+</p>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Spaces Cleaned
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-6 shadow-sm">
              <p className="text-3xl font-extrabold">98%</p>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                On-Time Rate
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-6 shadow-sm">
              <p className="text-3xl font-extrabold">24h</p>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Reschedule Window
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-6 shadow-sm">
              <p className="text-3xl font-extrabold">100%</p>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Satisfaction
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <h3 className="text-3xl font-bold text-center">
              Frequently Asked Questions
            </h3>
            <div className="mt-8 space-y-4">
              {[
                {
                  q: "What do I need to prepare before my clean?",
                  a: "Ensure building access is arranged (keys, fobs, codes, or security escort). Clear desks, counters, and work surfaces of personal items or sensitive documents. Confirm running water, electricity, and HVAC are available during cleaning. Assign a point of contact for cleaning updates or questions.",
                },
                {
                  q: "Where are you located?",
                  a: "We are located in Philadelphia and cover all 50 states.",
                },
                {
                  q: "What is your cancellation policy?",
                  a: [
                    {
                      label: "",
                      text: "We understand that schedules can change. To provide the best service to all clients and respect our team’s time, we ask that you review our cancellation guidelines:",
                    },
                    {
                      label: "Notice Period:",
                      text: "cancellations must be made at least 48 hours in advance of the scheduled cleaning.",
                    },
                    {
                      label: "Recurring Contracts:",
                      text: "For clients on weekly, bi-weekly, or monthly contracts, more than two consecutive cancellations may result in adjustment of service frequency or contract review.",
                    },
                    {
                      label: "Rescheduling:",
                      text: "We are happy to reschedule your appointment at no additional charge if you notify us 48 hours in advance. Rescheduled appointments are subject to availability.",
                    },
                    {
                      label: "Emergency Exceptions:",
                      text: "We understand emergencies happen. At our discretion, fees may be waived in the case of urgent, unavoidable circumstances.",
                    },
                  ],
                },
                {
                  q: "Do you provide your own cleaning supplies?",
                  a: "Yes — our teams bring eco-friendly, non-toxic cleaning supplies by default. If you prefer we use your products, please let us know when booking.",
                },
                {
                  q: "Are your team members background-checked and insured?",
                  a: "Yes. All employees are background-checked, covered by insurance, and trained on safety and cleaning best practices.",
                },
                {
                  q: "Can I request the same cleaner for recurring visits?",
                  a: [
                    {
                      label: "",
                      text: "We try to assign the same cleaner for recurring clients when possible. To request a specific team member, add a note to your booking or email us and we’ll do our best to accommodate.",
                    },
                  ],
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                    <span>{item.q}</span>
                    <span className="ml-4 text-2xl transition-transform group-open:rotate-45 select-none">
                      +
                    </span>
                  </summary>

                  {/* Render string OR array */}
                  {Array.isArray(item.a) ? (
                    item.a.map((para, i) => (
                      <p key={i} className="mt-3 text-slate-600">
                        {para.label && (
                          <span className="font-semibold">{para.label} </span>
                        )}
                        {para.text}
                      </p>
                    ))
                  ) : (
                    <p className="mt-3 text-slate-600">{item.a}</p>
                  )}
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-3xl bg-gradient-to-r from-[#455d58] to-[#374643] text-white p-10 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-3xl font-bold">
                  Ready to get your space sparkly and shiny?
                </h3>
                <p className="mt-2 text-slate-100">
                  Tell us about your project and we’ll send a fast, fair quote.
                </p>
              </div>
              <div className="md:text-right">
                <a
                  href="#contact"
                  onClick={(e) => smoothScroll(e, "contact")}
                  className="inline-block px-6 py-3 rounded-2xl bg-white text-[#455d58] font-medium shadow hover:bg-slate-100"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className=" bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h3 className="text-3xl font-bold text-center">Contact Us</h3>
            <form
              id="contactform"
              onSubmit={sendEmail}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-3 border rounded-xl"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full p-3 border rounded-xl"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border rounded-xl md:col-span-2"
                required
              />
              <input
                type="text"
                name="service"
                placeholder="Service interested in"
                className="w-full p-3 border rounded-xl md:col-span-2"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                required
              />
              <textarea
                name="message"
                placeholder="Tell us about your space and ideal date"
                className="w-full p-3 border rounded-xl md:col-span-2"
                rows={5}
                required
              ></textarea>
              <button
                type="submit"
                className="mt-2 md:col-span-2 w-full bg-[#455d58] text-white py-3 rounded-xl shadow hover:bg-[#374643]"
              >
                Request Quote
              </button>
              {status === "success" && (
                <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
                  ✅ Message sent successfully!
                </div>
              )}
              {status === "error" && (
                <div className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
                  ❌ Failed to send message. Try again.
                </div>
              )}
            </form>
            <p className="mt-4 text-center text-sm text-slate-500">
              Or call us: 267-299-8404
            </p>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-[#455d58] text-white">
          <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                {/* <img
                  src="/photos/Marie-Jeanne-Bacchus-10.png"
                  alt="Shiny Light Green Cleaning Services Logo"
                  className="h-8 w-auto"
                /> */}
                <span className="font-semibold">
                  Shiny Light Green Cleaning Services llc.
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-100">
                Serving our community with dependable, detail-oriented cleaning.
                Licensed, insured, and people-first.
              </p>
            </div>

            <div>
              <p className="font-semibold">Company</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-100">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => smoothScroll(e, "about")}
                    className="hover:underline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => smoothScroll(e, "services")}
                    className="hover:underline"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="https://acayjv-mz.myshopify.com/"
              target="_blank"
                    className="hover:underline"
                  >
                    Product Store
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold">Contact Us</p>
              <p className="mt-3 text-sm text-slate-100">
                shinylightgreen@gmail.com
              </p>
              <p className="mt-3 text-sm text-slate-100">267-299-8404</p>
              <div className="mt-3 flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="hover:text-slate-200"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:text-slate-200"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.tiktok.com/@mariebacchus876?_r=1&_t=ZT-93Z3NK4fGCj"
                  target="_blank"
                  className="hover:text-slate-200"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#374643] text-center py-6 text-xs text-slate-200">
            © {new Date().getFullYear()} Shiny Light Green Cleaning Services
            llc. All rights reserved.
          </div>
        </footer>
      </div>
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        style={{ zIndex: 10040 }}
      />
      {/* Right-side drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-[#455d58] text-white z-[10050] transform transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={closeMenu}
          className="absolute top-4 left-4 text-3xl text-white focus:outline-none"
          aria-label="Close menu"
        >
          <FaTimes />
        </button>

        {/* Nav links */}
        <nav className="flex flex-col items-center justify-start space-y-8 text-2xl font-medium h-full overflow-y-auto py-20">
          <a
            href="#about"
            onClick={(e) => {
              closeMenu();
              smoothScroll(e, "about");
            }}
          >
            About
          </a>
          <a
            href="#services"
            onClick={(e) => {
              closeMenu();
              smoothScroll(e, "services");
            }}
          >
            Services
          </a>
          <Link href="/store" onClick={() => closeMenu()}>
            Products
          </Link>
          <a
            href="#reviews"
            onClick={(e) => {
              closeMenu();
              smoothScroll(e, "reviews");
            }}
          >
            Reviews
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              closeMenu();
              smoothScroll(e, "faq");
            }}
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              closeMenu();
              smoothScroll(e, "contact");
            }}
            className="px-6 py-3 rounded-xl bg-white text-[#455d58] shadow-lg"
          >
            Book Now
          </a>
        </nav>
      </div>
    </main>
  );
}
