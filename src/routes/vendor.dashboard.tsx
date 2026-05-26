import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, ClipboardList, Wallet, Settings, Plus, Star, X } from "lucide-react";
import { useState } from "react";
import { recentOrders, monthlyRevenue } from "@/data/orders";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/vendor/dashboard")({
  head: () => ({
    meta: [
      { title: "Vendor Dashboard — Dollivery" },
      { name: "description", content: "Manage your beauty business on Dollivery." },
    ],
  }),
  component: VendorDashboard,
});

const nav = [
  { i: LayoutDashboard, t: "Dashboard" },
  { i: Package, t: "My Products" },
  { i: ClipboardList, t: "Orders" },
  { i: Wallet, t: "Earnings" },
  { i: Settings, t: "Settings" },
];

function VendorDashboard() {
  const [active, setActive] = useState("Dashboard");
  const [modal, setModal] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  void path;

  return (
    <div className="grid lg:grid-cols-[240px_1fr] min-h-[calc(100vh-5rem)]">
      {/* Sidebar */}
      <aside className="bg-blush p-6 lg:p-8 lg:sticky lg:top-20 self-start lg:h-[calc(100vh-5rem)]">
        <Link to="/" className="font-display text-2xl block mb-10">Dollivery<span className="text-deep-rose">.</span></Link>
        <nav className="space-y-1">
          {nav.map(({ i: Icon, t }) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm transition ${
                active === t ? "bg-deep-rose text-white" : "text-charcoal hover:bg-cream"
              }`}
            >
              <Icon className="w-4 h-4" /> {t}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <section className="p-6 lg:p-12">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-deep-rose mb-2">Welcome back</p>
            <h1 className="font-display text-5xl">Maison Lumière.</h1>
          </div>
          <button onClick={() => setModal(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-deep-rose text-white hover:bg-charcoal transition">
            <Plus className="w-4 h-4" /> Quick add product
          </button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { l: "Today's Orders", v: "14", s: "+3 vs yesterday" },
            { l: "Total Revenue", v: "R133,200", s: "September" },
            { l: "Active Listings", v: "28", s: "2 low stock" },
            { l: "Average Rating", v: "4.9", s: "★ 142 reviews", icon: true },
          ].map((c) => (
            <div key={c.l} className="bg-cream rounded-2xl p-6 shadow-soft hover-lift">
              <p className="text-xs uppercase tracking-wider text-warm-grey">{c.l}</p>
              <p className="font-display text-4xl mt-2 flex items-center gap-2">
                {c.icon && <Star className="w-5 h-5 fill-deep-rose text-deep-rose" />}
                {c.v}
              </p>
              <p className="text-xs text-warm-grey mt-1">{c.s}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Orders table */}
          <div className="bg-cream rounded-2xl p-6 shadow-soft overflow-x-auto">
            <h2 className="font-display text-2xl mb-5">Recent orders</h2>
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-warm-grey">
                <tr className="text-left">
                  <th className="pb-3 font-normal">Order</th>
                  <th className="pb-3 font-normal">Customer</th>
                  <th className="pb-3 font-normal">Items</th>
                  <th className="pb-3 font-normal">Total</th>
                  <th className="pb-3 font-normal">Status</th>
                  <th className="pb-3 font-normal"></th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-t border-blush/60">
                    <td className="py-3.5">{o.id}</td>
                    <td>{o.customer}</td>
                    <td className="text-warm-grey">{o.items}</td>
                    <td>R{o.total.toLocaleString()}</td>
                    <td>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        o.status === "Complete" ? "bg-blush text-deep-rose" :
                        o.status === "Preparing" ? "bg-deep-rose text-white" :
                        "bg-cream border border-deep-rose/40 text-charcoal"
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td><button className="text-xs text-deep-rose hover:underline">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart */}
          <div className="bg-cream rounded-2xl p-6 shadow-soft">
            <h2 className="font-display text-2xl mb-5">Earnings</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue}>
                  <XAxis dataKey="month" stroke="#8a8080" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#8a8080" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: "#f7e8e8" }} contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(196,124,130,0.18)" }} />
                  <Bar dataKey="revenue" fill="#c47c82" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-[80] bg-charcoal/40 grid place-items-center p-4" onClick={() => setModal(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-cream rounded-3xl p-8 max-w-md w-full shadow-luxe fade-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-3xl">New product</h3>
              <button onClick={() => setModal(false)} className="w-9 h-9 rounded-full grid place-items-center hover:bg-blush"><X className="w-4 h-4" /></button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setModal(false); }}>
              <input placeholder="Product name" className="w-full px-5 py-3 rounded-full bg-white border border-blush focus:outline-none focus:border-deep-rose" />
              <textarea placeholder="Description" rows={3} className="w-full px-5 py-3 rounded-2xl bg-white border border-blush focus:outline-none focus:border-deep-rose" />
              <div className="grid grid-cols-2 gap-3">
                <select className="w-full px-5 py-3 rounded-full bg-white border border-blush focus:outline-none">
                  <option>Wigs</option><option>Extensions</option><option>Lace Frontals</option>
                </select>
                <input placeholder="Price" type="number" className="w-full px-5 py-3 rounded-full bg-white border border-blush focus:outline-none focus:border-deep-rose" />
              </div>
              <div className="border border-dashed border-deep-rose/40 rounded-2xl p-6 text-center text-warm-grey text-sm">Upload image</div>
              <button className="w-full py-3 rounded-full bg-deep-rose text-white hover:bg-charcoal transition">Add product</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
