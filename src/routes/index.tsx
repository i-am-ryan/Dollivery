import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { Search, ShoppingBag, Truck, Star, Smartphone, Instagram, Twitter, Facebook } from "lucide-react";
import { vendors } from "@/data/vendors";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { HeroBubbles } from "@/components/HeroBubbles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dollivery — Hair. Delivered." },
      { name: "description", content: "Luxe wigs, extensions, and lace frontals delivered to your door in under an hour." },
      { property: "og:title", content: "Dollivery — Hair. Delivered." },
      { property: "og:description", content: "The luxury beauty marketplace, at your door." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { add } = useCart();
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative gradient-luxe grain overflow-hidden min-h-[92vh] flex items-center"
      >
        <HeroBubbles containerRef={heroRef} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 text-center w-full">
          <p className="text-xs uppercase tracking-[0.3em] text-deep-rose mb-6 fade-up">Dolls & Delivery</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] leading-[0.95] text-charcoal fade-up">
            Hair. <em className="text-deep-rose not-italic">Delivered.</em>
          </h1>
          <p className="mt-8 max-w-xl mx-auto text-warm-grey text-lg fade-up">
            The luxury beauty marketplace, at your door. From lace to lengths — every look, on demand.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center fade-up">
            <Link to="/shop" className="px-8 py-4 rounded-full bg-deep-rose text-white hover:bg-charcoal transition-colors">
              Order Now
            </Link>
            <Link to="/vendor/register" className="px-8 py-4 rounded-full border border-charcoal/30 text-charcoal hover:bg-white/60 transition-colors">
              List Your Business
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-deep-rose mb-3">How it works</p>
          <h2 className="font-display text-5xl">Beauty, in three steps.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Search, t: "Browse", d: "Discover hand-picked vendors and the season's most-wanted looks." },
            { icon: ShoppingBag, t: "Order", d: "Tap, add to bag, check out. Secure, simple, signature." },
            { icon: Truck, t: "Delivered", d: "Tracked door-to-door delivery from your local atelier." },
          ].map((s, i) => (
            <div key={i} className="bg-cream rounded-2xl p-10 text-center shadow-soft hover-lift">
              <div className="w-14 h-14 rounded-full bg-blush grid place-items-center mx-auto mb-6">
                <s.icon className="w-6 h-6 text-deep-rose" />
              </div>
              <h3 className="font-display text-3xl mb-3">{s.t}</h3>
              <p className="text-warm-grey text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED VENDORS */}
      <section className="bg-blush py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-deep-rose mb-3">Featured</p>
              <h2 className="font-display text-5xl">Vendors we adore.</h2>
            </div>
            <Link to="/shop" className="text-sm text-charcoal underline underline-offset-4 hover:text-deep-rose">
              View all
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 snap-x">
            {vendors.map((v) => (
              <div key={v.id} className="snap-start shrink-0 w-72 bg-cream rounded-2xl p-6 shadow-soft hover-lift">
                <div className="w-16 h-16 rounded-full bg-rose/40 grid place-items-center font-display text-2xl text-deep-rose mb-4">
                  {v.logo}
                </div>
                <h3 className="font-display text-2xl">{v.name}</h3>
                <p className="text-xs text-warm-grey mb-3">{v.specialty} · {v.city}</p>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-3.5 h-3.5 fill-deep-rose text-deep-rose" />
                  <span>{v.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-deep-rose mb-3">Trending</p>
          <h2 className="font-display text-5xl">This week's most-loved.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((p) => (
            <div key={p.id} className="bg-cream rounded-2xl overflow-hidden shadow-soft hover-lift">
              <div className="aspect-[4/5]" style={{ background: `linear-gradient(160deg, ${p.color}, #f7e8e8)` }} />
              <div className="p-5">
                <p className="text-xs text-warm-grey">{p.vendor}</p>
                <h3 className="font-display text-xl leading-tight mt-1">{p.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-medium">R{p.price.toLocaleString()}</span>
                  <button
                    onClick={() => add(p)}
                    className="text-xs px-4 py-2 rounded-full bg-charcoal text-white hover:bg-deep-rose transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

          {/* APP BANNER */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="rounded-3xl bg-charcoal text-cream p-12 md:p-16 grid md:grid-cols-2 gap-10 items-center shadow-luxe">
          <div>
            <Smartphone className="w-8 h-8 text-rose mb-5" />
            <h2 className="font-display text-5xl leading-tight">Order from anywhere, delivered to your door.</h2>
            <p className="mt-4 text-cream/70 max-w-md">Browse hundreds of luxury wig and hair vendors online. Place your order in minutes and we handle the rest — fast, tracked delivery straight to you.</p>
          </div>
          <form className="flex gap-2 md:justify-end" onSubmit={(e) => e.preventDefault()}>
            <input
              placeholder="Your email"
              className="flex-1 md:w-80 px-5 py-3 rounded-full bg-white/10 text-cream placeholder-cream/50 focus:outline-none focus:bg-white/20"
            />
            <button className="px-6 py-3 rounded-full bg-rose text-charcoal hover:bg-cream transition-colors">Get Early Access</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blush py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div>
            <p className="font-display text-3xl">Dollivery<span className="text-deep-rose">.</span></p>
            <p className="text-xs text-warm-grey mt-3">Dolls & Delivery.</p>
          </div>
          {[
            { t: "Shop", l: [["Wigs", "/shop"], ["Extensions", "/shop"], ["Lace Frontals", "/shop"]] },
            { t: "Business", l: [["Become a Vendor", "/vendor/register"], ["Drive with us", "/driver/register"], ["Vendor login", "/auth"]] },
            { t: "Company", l: [["About", "/"], ["Contact", "/"], ["Press", "/"]] },
          ].map((c) => (
            <div key={c.t}>
              <p className="text-xs uppercase tracking-[0.2em] text-deep-rose mb-4">{c.t}</p>
              <ul className="space-y-2 text-sm text-charcoal">
                {c.l.map(([t, h]) => (
                  <li key={t}><Link to={h as string} className="hover:text-deep-rose">{t}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-deep-rose/15 flex flex-col sm:flex-row justify-between gap-4 text-xs text-warm-grey">
          <p>© {new Date().getFullYear()} Dollivery. All rights reserved.</p>
          <div className="flex gap-4">
            <Instagram className="w-4 h-4" /><Twitter className="w-4 h-4" /><Facebook className="w-4 h-4" />
          </div>
        </div>
      </footer>
    </div>
  );
}