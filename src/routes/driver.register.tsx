import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bike, Car, Sparkles, Clock, Wallet } from "lucide-react";

export const Route = createFileRoute("/driver/register")({
  head: () => ({
    meta: [
      { title: "Drive for Dollivery" },
      { name: "description", content: "Deliver beauty, earn on your terms." },
    ],
  }),
  component: DriverRegister,
});

function DriverRegister() {
  const [done, setDone] = useState(false);
  const [vehicle, setVehicle] = useState("Motorbike");

  if (done) {
    return (
      <div className="min-h-[80vh] grid place-items-center px-6">
        <div className="text-center max-w-md fade-up">
          <Sparkles className="w-12 h-12 text-deep-rose mx-auto animate-pulse" />
          <h1 className="font-display text-5xl mt-6">Application received!</h1>
          <p className="text-warm-grey mt-4">We'll review and contact you within 24 hours.</p>
          <Link to="/" className="inline-block mt-8 px-8 py-3 rounded-full bg-deep-rose text-white">Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
      <aside className="bg-blush grain p-12 lg:p-16 flex flex-col justify-between">
        <Link to="/" className="font-display text-3xl">Dollivery<span className="text-deep-rose">.</span></Link>
        <div className="relative z-10 my-12">
          <h1 className="font-display text-5xl lg:text-6xl leading-tight">Deliver beauty, earn on your terms.</h1>
          <ul className="mt-10 space-y-5">
            {[{ i: Clock, t: "Flexible hours, work when you want" }, { i: Wallet, t: "Weekly payouts, transparent fees" }, { i: Sparkles, t: "Join a community of doll-delivery pros" }].map(({ i: Icon, t }) => (
              <li key={t} className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-cream grid place-items-center"><Icon className="w-4 h-4 text-deep-rose" /></span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-warm-grey">© Dollivery — Dolls & Delivery.</p>
      </aside>

      <section className="p-8 lg:p-16 bg-cream">
        <p className="text-xs uppercase tracking-[0.3em] text-deep-rose mb-3">Driver application</p>
        <h2 className="font-display text-4xl mb-8">Tell us about you.</h2>
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
          <Field label="Full name"><input className={inp} required /></Field>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Phone"><input className={inp} required /></Field>
            <Field label="Email"><input type="email" className={inp} required /></Field>
          </div>
          <Field label="City"><input className={inp} required /></Field>

          <div>
            <span className="block text-xs uppercase tracking-wider text-warm-grey mb-3">Vehicle type</span>
            <div className="grid grid-cols-3 gap-3">
              {[{ t: "Car", i: Car }, { t: "Motorbike", i: Bike }, { t: "Bicycle", i: Bike }].map(({ t, i: Icon }) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setVehicle(t)}
                  className={`flex flex-col items-center gap-2 px-4 py-5 rounded-2xl border transition ${
                    vehicle === t ? "bg-deep-rose text-white border-deep-rose" : "bg-white border-blush hover:border-deep-rose"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{t}</span>
                </button>
              ))}
            </div>
          </div>

          <Field label="ID number"><input className={inp} required /></Field>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Upload ID photo">
              <div className="border border-dashed border-deep-rose/40 rounded-2xl p-6 text-center text-warm-grey text-sm bg-white">Drop file</div>
            </Field>
            <Field label="Upload vehicle photo">
              <div className="border border-dashed border-deep-rose/40 rounded-2xl p-6 text-center text-warm-grey text-sm bg-white">Drop file</div>
            </Field>
          </div>

          <button className="w-full py-4 rounded-full bg-deep-rose text-white hover:bg-charcoal transition mt-4">Apply to Drive</button>
        </form>
      </section>
    </div>
  );
}

const inp = "w-full px-5 py-3 rounded-full bg-white border border-blush focus:outline-none focus:border-deep-rose transition";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-warm-grey mb-2">{label}</span>
      {children}
    </label>
  );
}
