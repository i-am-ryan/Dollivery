import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Package, Truck, MapPin, Sparkles, Phone } from "lucide-react";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Order — Dollivery" },
      { name: "description", content: "Live tracking for your Dollivery order." },
    ],
  }),
  component: Track,
});

const steps = [
  { icon: Sparkles, t: "Order Placed", time: "12:04 PM", done: true },
  { icon: Package, t: "Vendor Preparing", time: "12:11 PM", done: true },
  { icon: Truck, t: "Driver Picked Up", time: "12:38 PM", done: true },
  { icon: MapPin, t: "On the Way", time: "12:42 PM", done: true, current: true },
  { icon: CheckCircle2, t: "Delivered", time: "ETA 1:05 PM", done: false },
];

function Track() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-deep-rose mb-3">Order #DLV-1042</p>
        <h1 className="font-display text-5xl">On the way, doll.</h1>
        <p className="text-warm-grey mt-2">Your delivery driver is 14 minutes away.</p>
      </header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-10">
          {/* Timeline */}
          <div className="bg-cream rounded-3xl p-8 shadow-soft">
            <h2 className="font-display text-2xl mb-8">Status</h2>
            <ol className="relative space-y-8">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-5 items-start relative">
                  <div className={`shrink-0 w-12 h-12 rounded-full grid place-items-center z-10 ${
                    s.done ? "bg-deep-rose text-white" : "bg-blush text-deep-rose"
                  } ${s.current ? "ring-4 ring-deep-rose/20 animate-pulse" : ""}`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  {i < steps.length - 1 && (
                    <span className={`absolute left-6 top-12 w-px h-12 ${s.done ? "bg-deep-rose/40" : "bg-warm-grey/20"}`} />
                  )}
                  <div>
                    <p className="font-display text-xl">{s.t}</p>
                    <p className="text-xs text-warm-grey mt-1">{s.time}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Map placeholder */}
          <div className="rounded-3xl h-72 grid place-items-center bg-blush text-warm-grey font-display text-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #fff 0, transparent 40%), radial-gradient(circle at 70% 60%, #fff 0, transparent 35%)" }} />
            <span className="relative">Live Map Tracking — Coming Soon</span>
          </div>

          {/* Driver */}
          <div className="bg-cream rounded-3xl p-8 shadow-soft flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-rose/60 grid place-items-center font-display text-2xl text-charcoal">A</div>
            <div className="flex-1">
              <p className="font-display text-2xl">Adaeze N.</p>
              <p className="text-xs text-warm-grey">Pink Vespa · LD-2208</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-warm-grey">ETA</p>
              <p className="font-display text-2xl text-deep-rose">14 min</p>
            </div>
            <button className="w-11 h-11 rounded-full bg-deep-rose text-white grid place-items-center hover:bg-charcoal transition" aria-label="Call driver">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Summary */}
        <aside className="bg-cream rounded-3xl p-8 shadow-soft h-fit">
          <h2 className="font-display text-2xl mb-5">Summary</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span>Silk Bob — Honey</span><span>R5,760</span></li>
            <li className="flex justify-between"><span>HD Lace Frontal</span><span>R7,380</span></li>
          </ul>
          <div className="border-t mt-5 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-warm-grey"><span>Subtotal</span><span>R13,140</span></div>
            <div className="flex justify-between text-warm-grey"><span>Delivery</span><span>R75</span></div>
            <div className="flex justify-between font-display text-2xl pt-2"><span>Total</span><span>R13,215</span></div>
          </div>
          <div className="mt-6 p-4 rounded-2xl bg-blush">
            <p className="text-xs text-warm-grey">Delivering to</p>
            <p className="text-sm mt-1">14 Rue de Lumière, Apt 3B</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
