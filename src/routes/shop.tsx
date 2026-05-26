import { createFileRoute } from "@tanstack/react-router";
import { Search, Star, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { vendors } from "@/data/vendors";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Dollivery" },
      { name: "description", content: "Shop wigs, extensions, weaves and lace frontals from luxury vendors near you." },
    ],
  }),
  component: Shop,
});

const categories = ["Wigs", "Extensions", "Braiding", "Weaves", "Lace Frontals"] as const;

function Shop() {
  const { add } = useCart();
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [vendorFilter, setVendorFilter] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (vendorFilter && p.vendorId !== vendorFilter) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      return true;
    });
  }, [q, cats, vendorFilter, maxPrice, minRating]);

  const toggleCat = (c: string) =>
    setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-deep-rose mb-3">Shop</p>
        <h1 className="font-display text-5xl md:text-6xl">Find your look.</h1>
      </header>

      <div className="relative mb-10">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-grey" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find your look..."
          className="w-full pl-12 pr-5 py-4 rounded-full bg-cream shadow-soft focus:outline-none focus:ring-2 focus:ring-deep-rose/30"
        />
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="space-y-8 lg:sticky lg:top-28 self-start">
          <div>
            <h3 className="font-display text-xl mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={cats.includes(c)} onChange={() => toggleCat(c)} className="accent-deep-rose" />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl mb-3">Price · R{maxPrice.toLocaleString()}</h3>
            <input type="range" min={1000} max={10000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-deep-rose" />
          </div>

          <div>
            <h3 className="font-display text-xl mb-3">Vendor</h3>
            <select
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-cream text-sm focus:outline-none"
            >
              <option value="">All vendors</option>
              {vendors.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>

          <div>
            <h3 className="font-display text-xl mb-3">Rating</h3>
            <div className="flex gap-2">
              {[0, 4, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`px-3 py-1.5 rounded-full text-xs transition ${
                    minRating === r ? "bg-deep-rose text-white" : "bg-cream text-charcoal"
                  }`}
                >
                  {r === 0 ? "All" : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section>
          <p className="text-sm text-warm-grey mb-4">{filtered.length} pieces</p>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <article key={p.id} className="bg-cream rounded-2xl overflow-hidden shadow-soft hover-lift">
                <div className="relative aspect-[4/5]" style={{ background: `linear-gradient(160deg, ${p.color}, #f7e8e8)` }}>
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {p.deliveryMin} min
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-warm-grey">{p.vendor}</p>
                  <h3 className="font-display text-xl leading-tight mt-1">{p.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-warm-grey mt-2">
                    <Star className="w-3 h-3 fill-deep-rose text-deep-rose" /> {p.rating}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-medium">R{p.price.toLocaleString()}</span>
                    <button
                      onClick={() => add(p)}
                      className="text-xs px-4 py-2 rounded-full bg-charcoal text-white hover:bg-deep-rose transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center font-display text-2xl text-warm-grey py-20">No pieces match — soften your filters.</p>
          )}
        </section>
      </div>
    </div>
  );
}
