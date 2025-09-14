"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Home() {
  const [status, setStatus] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
  // const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  // const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    emailjs
      .sendForm(
        "service_7ad8vub", // EmailJS service ID
        "template_jrzkgpm", // EmailJS template ID
        form,
        "_QUr_BayH9eL25mRz" // Public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("success"); // ✅ trigger toast
          form.reset();

          // Auto-hide after 3 seconds
          setTimeout(() => setStatus(""), 3000);
        },

        (error) => {
          console.log(error.text);
          setStatus("Failed to send message. Try again.");
          form.reset();
        }
      );
  };

  // Slideshow images under reviews
  const reviewImages = [
    "/New-Project-300x300 copy.png",
    "/New-Project-4-300x300 copy.png",
    "/New-Project-5-300x300 copy.png",
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % reviewImages.length);
  const prevImage = () =>
    setCurrentImage(
      (prev) => (prev - 1 + reviewImages.length) % reviewImages.length
    );

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
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
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a
              href="#about"
              onClick={(e) => smoothScroll(e, "about")}
              className="hover:text-blue-600"
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => smoothScroll(e, "services")}
              className="hover:text-blue-600"
            >
              Services
            </a>
            <a
              href="#reviews"
              onClick={(e) => smoothScroll(e, "reviews")}
              className="hover:text-blue-600"
            >
              Reviews
            </a>
            <a
              href="#faq"
              onClick={(e) => smoothScroll(e, "faq")}
              className="hover:text-blue-600"
            >
              FAQ
            </a>
            <a
              href="https://accounts.shopify.com/select?rid=76799fe7-5095-4a77-8df8-154f39200e6b"
              className="hover:text-blue-600"
              target="_blank"
            >
              Cleaning Products
            </a>
            <a
              href="#contact"
              onClick={(e) => smoothScroll(e, "contact")}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700"
            >
              Book Now
            </a>
          </nav>
        </div>
      </header>

      {/* Hero / About-style intro */}
      <section id="hero" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-widest text-xs text-blue-700/70 font-semibold">
              Locally owned • Insured & bonded
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
              Let Shiny Light Green Cleaning Services brighten up your space!
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From standard upkeep to deep resets, our pros bring hotel-level
              detail to every visit—eco-friendly products, honest pricing, and a
              100% happiness pledge.
            </p>
            {/* <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={(e) => smoothScroll(e, "contact")}
                className="px-5 py-3 rounded-2xl bg-blue-600 text-white shadow hover:bg-blue-700"
              >
                Book Your Clean
              </a>
              <a
                href="#services"
                onClick={(e) => smoothScroll(e, "services")}
                className="px-5 py-3 rounded-2xl border border-slate-200 hover:border-slate-300"
              >
                Explore Services
              </a>
            </div> */}
            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-100 p-4 shadow-sm">
                <p className="text-sm font-semibold">5‑Star Rated</p>
                <p className="text-xs text-slate-600">
                  Consistently loved by clients
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 p-4 shadow-sm">
                <p className="text-sm font-semibold">Insured & Bonded</p>
                <p className="text-xs text-slate-600">Your space, protected</p>
              </div>
              <div className="rounded-2xl border border-slate-100 p-4 shadow-sm">
                <p className="text-sm font-semibold">Eco‑Friendly</p>
                <p className="text-xs text-slate-600">Safe for kids & pets</p>
              </div>
            </div>
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

      {/* Story / About block */}
      {/* Services Preview */}
      <section
        id="services"
        className="bg-slate-50/60 border-y border-slate-100"
      >
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h3 className="text-3xl font-bold text-center">What We Offer</h3>
          <p className="mt-2 text-center text-slate-600">
            Pick the clean that fits your life.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                {/* Circular Image */}
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
                {/* <p className="mt-3 text-slate-600">{s.desc}</p> */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedService(s.title); // ✅ populate service field
                    smoothScroll(e, "contact");
                  }}
                  className="mt-5 inline-block text-sm font-medium text-blue-700 hover:underline"
                >
                  Get a Quote →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-bold">Our Story</h3>
            <p className="mt-4 text-slate-700">
              Shiny Light Green Cleaning Services was born out of determination,
              resilience, and a vision for something better. In 2014, Marie
              Jeanne, a single mother in New York City, set out to support her
              son and build a future. With nothing more than hard work,
              determination, and a desire to make ends meet, she launched her
              cleaning services on Groupon—quickly earning a 5-star reputation
              for excellence and trust. A few years later, Marie Jeanne
              relocated to Philadelphia with a bigger dream: to reinvent her
              business and create something lasting. She founded Shiny Light
              Green Commercial Cleaning, a company dedicated to delivering
              exceptional service while staying true to her values of health,
              sustainability, and integrity. Today, Shiny Light Green Cleaning
              Services stands as a successful and growing business—trusted by
              commercial clients across industries. As a token to its mission of
              being evironmentally conscious, Shiny Light Green Cleaning
              Services is proudly accessible through the Clark Park Market every
              Saturday.
            </p>
            {/* <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>{" "}
                Flat, transparent pricing
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>{" "}
                Background‑checked, friendly staff
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>{" "}
                Supplies included and green by default
              </li>
            </ul> */}
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-xl relative">
              <Image
                src="/photos/clement-dellandrea-pVLNny2Thxo-unsplash.jpg"
                alt="The Bronx"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
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
              On‑Time Rate
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
            "Professional, punctual, and thorough. We signed up for bi‑weekly right away.",
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

        {/* Customer Photo Slideshow */}
        {/* <div className="mt-16">
          <h3 className="text-3xl font-bold text-center">
            Customer Photo Gallery
          </h3>
          <p className="mt-2 text-center text-slate-600">
            A few snapshots from happy clients ✨
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center">
            {reviewImages.map((src, idx) => (
              <div
                key={idx}
                className="relative w-[300px] h-[500px] overflow-hidden rounded-2xl shadow-md"
              >
                <Image
                  src={src}
                  alt={`Customer review ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div> */}
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

      {/* Contact / CTA Banner */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-500 text-white p-10 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-3xl font-bold">
                Ready to get your space sparkly and shiny?
              </h3>
              <p className="mt-2 text-blue-50">
                Tell us about your space and we’ll send a fast, fair quote.
              </p>
            </div>
            <div className="md:text-right">
              <a
                href="#contact"
                onClick={(e) => smoothScroll(e, "contact")}
                className="inline-block px-6 py-3 rounded-2xl bg-white text-blue-700 font-medium shadow hover:bg-blue-50"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h3 className="text-3xl font-bold text-center">Contact Us</h3>

          {/* EmailJS Contact Form */}
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
              onChange={(e) => setSelectedService(e.target.value)} // ✅ still editable
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
              className="mt-2 md:col-span-2 w-full bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700"
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
      <footer className="bg-slate-900 text-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img
                src="/photos/Marie-Jeanne-Bacchus-10.png"
                alt="Shiny Light Green Cleaning Services Logo"
                className="h-8 w-auto"
              />

              <span className="font-semibold">
                Shiny Light Green Cleaning Services llc.
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Serving our community with dependable, detail‑oriented cleaning.
              Licensed, insured, and people‑first.
            </p>
          </div>
          <div>
            <p className="font-semibold">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href="#about"
                  onClick={(e) => smoothScroll(e, "about")}
                  className="hover:text-white"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => smoothScroll(e, "services")}
                  className="hover:text-white"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => smoothScroll(e, "faq")}
                  className="hover:text-white"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Get in Touch</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>267-299-8404 | Mon–Sat, 8am–6pm</li>
              <li>Products email: shinylightgreen@gmail.com</li>
              <li>
                <div className="flex gap-4 mt-2">
                  <a
                    href="https://facebook.com/Shiny Light Green Cleaning"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <FaFacebookF className="text-blue-500" size={18} />
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com/@shinylight934"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <FaInstagram className="text-pink-500" size={18} />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://tiktok.com/@mariebacchus876"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <FaTiktok className="text-slate-200" size={18} />
                    <span>TikTok</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Shiny Light Green Cleaning Services llc.
          All rights reserved.
        </div>
      </footer>
    </main>
  );
}
