import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Dollivery" },
      { name: "description", content: "Sign in or create your Dollivery account." },
    ],
  }),
  component: Auth,
});

const tabs = ["Customer", "Vendor", "Driver"] as const;

function Auth() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Customer");
  const [mode, setMode] = useState<"in" | "up">("in");

  return (
    <div className="relative min-h-[calc(100vh-5rem)] gradient-luxe grain grid place-items-center px-4 py-12">
      <div className="relative z-10 w-full max-w-md bg-cream/90 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-luxe fade-up">
        <h1 className="font-display text-4xl text-center">{mode === "in" ? "Welcome back." : "Join Dollivery."}</h1>
        <p className="text-center text-warm-grey text-sm mt-2">
          {mode === "in" ? "Sign in to your account" : "Create your account in seconds"}
        </p>

        {/* Tabs */}
        <div className="grid grid-cols-3 mt-6 p-1 rounded-full bg-blush">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-2 text-sm rounded-full transition ${tab === t ? "bg-cream shadow-soft text-deep-rose" : "text-charcoal"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Form */}
        <form className="space-y-3 mt-6" onSubmit={(e) => e.preventDefault()}>
          {mode === "up" && <input placeholder="Full name" className={inp} />}
          <input placeholder="Email" type="email" className={inp} />
          <input placeholder="Password" type="password" className={inp} />
          <button className="w-full py-3 rounded-full bg-deep-rose text-white hover:bg-charcoal transition">
            {mode === "in" ? `Sign in as ${tab}` : `Create ${tab} account`}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5 text-xs text-warm-grey">
          <div className="flex-1 h-px bg-blush" /> or <div className="flex-1 h-px bg-blush" />
        </div>

        <div className="space-y-2">
          <button className="w-full py-3 rounded-full bg-white border border-blush text-sm hover:border-deep-rose transition">Continue with Google</button>
          <button className="w-full py-3 rounded-full bg-white border border-blush text-sm hover:border-deep-rose transition">Continue with Apple</button>
        </div>

        <p className="text-center text-sm text-warm-grey mt-6">
          {mode === "in" ? "New to Dollivery? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="text-deep-rose hover:underline">
            {mode === "in" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

const inp = "w-full px-5 py-3 rounded-full bg-white border border-blush focus:outline-none focus:border-deep-rose transition";
