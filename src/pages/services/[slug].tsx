import { useRouter } from "next/router";
import { services } from "@/data/services";
import { FaCheck } from "react-icons/fa";

export default function ServicePage() {
  const router = useRouter();
  const { slug } = router.query;
  const service = services.find((s) => s.slug === slug);

  if (!service) return <p className="p-10 text-center">Service not found</p>;

  return (
    <main className="bg-white text-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <img
          src={`/photos/${service.slug}.jpg`} // ✅ name your service images to match slugs
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold">{service.title}</h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          What’s Included
        </h2>
        <div className="space-y-4">
          {service.checklist.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 shadow-sm bg-white transition hover:shadow-md"
            >
              <FaCheck className="text-green-600 flex-shrink-0" />
              <span className="text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-[#455d58] to-[#374643] text-white p-10 shadow-xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to book your {service.title}?
          </h2>
          <p className="mt-3 text-slate-100 max-w-2xl mx-auto">
            Let’s make your space shine. Request a fast, fair quote today and
            schedule your cleaning with ease.
          </p>
          <a
            href="/#contact"
            className="mt-6 inline-block px-8 py-3 rounded-2xl bg-white text-[#455d58] font-medium shadow hover:bg-slate-100 transition"
          >
            Get a Free Quote
          </a>
        </div>
      </section>
    </main>
  );
}
