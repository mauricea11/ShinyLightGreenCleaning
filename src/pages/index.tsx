"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect } from "react";

export default function Home() {
  const [status, setStatus] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = ""; // reset
    }
  }, [menuOpen]);

  const [highlightProgress, setHighlightProgress] = useState(0);

  useEffect(() => {
    const hero = document.getElementById("about");
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHighlightProgress(entry.intersectionRatio); // 0 → 1
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0, .01, .02, ... 1
      }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // intersectionRatio speed for marker stroke
  const adjustedProgress = Math.min(1, (1 - highlightProgress) * 3.5);

  // Robust smooth scroll:
  // - Subtract header height so sticky header doesn't cover the section
  // - Use luxy scroll only if luxy instance exposes a proper scrollTo function
  // - Otherwise use window.scrollTo with smooth behavior
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;

    const headerEl = document.querySelector("header");
    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;

    // element top relative to document, minus header height
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    const possibleLuxy = (window as any).luxy;

    // If luxy exists and is the luxy instance AND has a scrollTo function, use it.
    // (Some versions may not expose scrollTo — in that case fallback to window.scrollTo.)
    if (
      possibleLuxy &&
      typeof possibleLuxy === "object" &&
      typeof possibleLuxy.init === "function" &&
      typeof possibleLuxy.scrollTo === "function"
    ) {
      possibleLuxy.scrollTo(top);
    } else {
      // Fallback: scroll the document — luxy listens to document scroll and will animate.
      // Use smooth behavior so it feels nice.
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    emailjs
      .sendForm(
        "service_7ad8vub",
        "template_jrzkgpm",
        form,
        "_QUr_BayH9eL25mRz"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("success");
          form.reset();
          setTimeout(() => setStatus(""), 3000);
        },
        (error) => {
          console.log(error.text);
          setStatus("error");
          form.reset();
        }
      );
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top Bar - OUTSIDE #luxy so sticky works */}
      <header className="fixed top-0 left-0 right-0 z-[9999] bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Logo + title */}
          <div className="flex items-center gap-2">
            <a href="">
              <img
                src="/photos/Marie-Jeanne-Bacchus-10.png"
                alt="Shiny Light Green Cleaning Services Logo"
                className="h-8 w-auto"
              />
            </a>
            <h1 className="text-xl font-semibold tracking-tight">
              Shiny Light Green Cleaning Services llc.
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
            <a href="#reviews" onClick={(e) => smoothScroll(e, "reviews")}>
              Reviews
            </a>
            <a href="#faq" onClick={(e) => smoothScroll(e, "faq")}>
              FAQ
            </a>
            <a
              href="https://accounts.shopify.com/select?rid=..."
              target="_blank"
              className="hover:text-[#455d58]"
            >
              Cleaning Products
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
        <section id="about" className="relative">
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
        <section
          id="services"
          className="bg-slate-50/60 border-y border-slate-100"
        >
          {/* ... keep your Services content unchanged ... */}
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h3 className="text-3xl font-bold text-center">What We Offer</h3>
            <p className="mt-2 text-center text-slate-600">
              Pick the clean that fits your life.
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ... same services array mapping ... */}
              {[
                {
                  title: "Small Businesses",
                  image: "/photos/benyamin-bohlouli-LZLdLR7vuHg-unsplash.jpg",
                },
                {
                  title: "Professional Office",
                  image: "/photos/copernico-p_kICQCOM4s-unsplash.jpg",
                },
                {
                  title: "Move in and Out",
                  image: "/photos/hiveboxx-deX-KChuboY-unsplash.jpg",
                },
                {
                  title: "Airbnb",
                  image: "/photos/aes-5m3v4GBB82o-unsplash.jpg",
                },
                {
                  title: "Hospitals",
                  image: "/photos/adhy-savala-zbpgmGe27p8-unsplash.jpg",
                },
                {
                  title: "Real Estate Clean Outs",
                  image: "/photos/dillon-kydd-2keCPb73aQY-unsplash.jpg",
                },
                {
                  title: "Schools and Universities",
                  image: "/photos/nathan-cima-Qw6wa96IvvQ-unsplash.jpg",
                },
                {
                  title: "Car Dealerships",
                  image: "/photos/i-m-zion-WnDC9k1aiZ8-unsplash.jpg",
                },
                {
                  title: "Construction",
                  image: "/photos/stefan-lehner-biRt6RXejuk-unsplash.jpg",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex flex-col items-center text-center"
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
                  <h4 className="text-lg font-semibold">{s.title}</h4>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedService(s.title);
                      smoothScroll(e, "contact");
                    }}
                    className="mt-5 inline-block text-sm font-medium text-[#455d58] hover:underline"
                  >
                    Get a Quote →
                  </a>
                </div>
              ))}
            </div>
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

        {/* Reviews */}
        <section id="reviews" className="mx-auto max-w-7xl px-6 py-16">
          <h3 className="text-3xl font-bold text-center">
            Kind Words from Clients
          </h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "They left our apartment sparkling and were so friendly. Booking was a breeze!",
              "The deep clean exceeded expectations—appliances and baseboards look brand new.",
              "Professional, punctual, and thorough. We signed up for bi-weekly right away.",
            ].map((quote, i) => (
              <figure
                key={i}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <blockquote className="text-slate-700">“{quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-slate-500">
                  — Verified Customer
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-slate-50/60 border-y border-slate-100">
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
                  a: "We understand that schedules can change. To provide the best service to all clients and respect our team’s time, we ask that you review our cancellation guidelines: Notice Period: cancellations must be made at least 48 hours in advance of the scheduled cleaning. Recurring Contracts: For clients on weekly, bi-weekly, or monthly contracts, more than two consecutive cancellations may result in adjustment of service frequency or contract review. Rescheduling: We are happy to reschedule your appointment at no additional charge if you notify us 48 hours in advance. Rescheduled appointments are subject to availability. Emergency Exceptions: We understand emergencies happen. At our discretion, fees may be waived in the case of urgent, unavoidable circumstances.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                    <span>{item.q}</span>
                    <span className="ml-4 transition-transform group-open:rotate-45 select-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-slate-600">{item.a}</p>
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
                  Tell us about your space and we’ll send a fast, fair quote.
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
        <section id="contact" className="border-t border-slate-100 bg-white">
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
                    href="#faq"
                    onClick={(e) => smoothScroll(e, "faq")}
                    className="hover:underline"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold">Follow Us</p>
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
                  href="https://tiktok.com"
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
            href="https://accounts.shopify.com/select?rid=..."
            target="_blank"
            className="hover:underline"
            onClick={() => closeMenu()}
          >
            Cleaning Products
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
