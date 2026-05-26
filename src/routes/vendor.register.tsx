import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sparkles, TrendingUp, Heart } from "lucide-react";

export const Route = createFileRoute("/vendor/register")({
  head: () => ({
    meta: [
      { title: "Become a Vendor — Dollivery" },
      { name: "description", content: "List your beauty business on Dollivery and reach thousands of customers." },
    ],
  }),
  component: VendorRegister,
});

const products = ["Wigs", "Extensions", "Braiding", "Weaves", "Lace Frontals", "Custom Orders"];

function VendorRegister() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    business: "", owner: "", email: "", phone: "", city: "",
    category: "Wigs", years: "", logo: "",
    products: [] as string[],
    bank: "", account: "", holder: "",
  });

  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));
  const toggleProduct = (p: string) =>
    set("products", form.products.includes(p) ? form.products.filter((x) => x !== p) : [...form.products, p]);

  if (done) {
    return (
      <div className="min-h-[80vh] grid place-items-center px-6">
        <div className="text-center max-w-md fade-up relative">
          <Sparkles className="w-12 h-12 text-deep-rose mx-auto animate-pulse" />
          <h1 className="font-display text-5xl mt-6">You're on the list!</h1>
          <p className="text-warm-grey mt-4">We'll be in touch within 48 hours to onboard your business.</p>
          <Link to="/" className="inline-block mt-8 px-8 py-3 rounded-full bg-deep-rose text-white">Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
      {/* Left panel */}
      <aside className="bg-blush grain p-12 lg:p-16 flex flex-col justify-between">
        <Link to="/" className="font-display text-3xl">Dollivery<span className="text-deep-rose">.</span></Link>
        <div className="relative z-10 my-12">
          <h1 className="font-display text-5xl lg:text-6xl leading-tight">Grow your beauty business.</h1>
          <ul className="mt-10 space-y-5 text-charcoal">
            {[
              { i: TrendingUp, t: "Reach thousands of new customers" },
              { i: Heart, t: "Tools built for beauty entrepreneurs" },
              { i: Sparkles, t: "Same-day delivery, handled for you" },
            ].map(({ i: Icon, t }) => (
              <li key={t} className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-cream grid place-items-center"><Icon className="w-4 h-4 text-deep-rose" /></span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-warm-grey">© Dollivery — Dolls & Delivery.</p>
      </aside>

      {/* Form */}
      <section className="p-8 lg:p-16 bg-cream">
        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={`h-1.5 flex-1 rounded-full transition ${n <= step ? "bg-deep-rose" : "bg-blush"}`} />
          ))}
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-deep-rose mb-3">Step {step} of 4</p>

        {step === 1 && (
          <div className="fade-up space-y-5">
            <h2 className="font-display text-4xl mb-6">Business info</h2>
            <Field label="Business name"><input value={form.business} onChange={(e) => set("business", e.target.value)} className={inp} /></Field>
            <Field label="Owner name"><input value={form.owner} onChange={(e) => set("owner", e.target.value)} className={inp} /></Field>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Email"><input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inp} /></Field>
              <Field label="Phone"><input value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inp} /></Field>
            </div>
            <Field label="City"><input value={form.city} onChange={(e) => set("city", e.target.value)} className={inp} /></Field>
          </div>
        )}

        {step === 2 && (
          <div className="fade-up space-y-5">
            <h2 className="font-display text-4xl mb-6">Business details</h2>
            <Field label="Primary category">
              <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inp}>
                {products.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Years in business"><input type="number" value={form.years} onChange={(e) => set("years", e.target.value)} className={inp} /></Field>
            <Field label="Business logo">
              <div className="border border-dashed border-deep-rose/40 rounded-2xl p-8 text-center text-warm-grey text-sm bg-white">
                Drop your logo here or click to upload
              </div>
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="fade-up space-y-5">
            <h2 className="font-display text-4xl mb-6">Products & services</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {products.map((p) => {
                const on = form.products.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => toggleProduct(p)}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition ${
                      on ? "bg-deep-rose text-white border-deep-rose" : "bg-white border-blush hover:border-deep-rose"
                    }`}
                  >
                    <span>{p}</span>
                    {on && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="fade-up space-y-5">
            <h2 className="font-display text-4xl mb-6">Payout details</h2>
            <Field label="Bank name"><input value={form.bank} onChange={(e) => set("bank", e.target.value)} className={inp} /></Field>
            <Field label="Account number"><input value={form.account} onChange={(e) => set("account", e.target.value)} className={inp} /></Field>
            <Field label="Account holder"><input value={form.holder} onChange={(e) => set("holder", e.target.value)} className={inp} /></Field>
          </div>
        )}

        <div className="flex justify-between mt-10">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="px-6 py-3 rounded-full border border-charcoal/20 disabled:opacity-30 hover:bg-blush"
          >
            Back
          </button>
          {step < 4 ? (
            <button onClick={() => setStep((s) => s + 1)} className="px-8 py-3 rounded-full bg-deep-rose text-white hover:bg-charcoal transition">
              Next
            </button>
          ) : (
            <button onClick={() => setDone(true)} className="px-8 py-3 rounded-full bg-deep-rose text-white hover:bg-charcoal transition">
              Submit Application
            </button>
          )}
        </div>
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
