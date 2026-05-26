import { Link, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/vendor/register", label: "For Vendors" },
  { to: "/driver/register", label: "For Drivers" },
] as const;

export function Nav() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-2xl tracking-tight text-charcoal">
            Dollivery<span className="text-deep-rose">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm transition-colors ${
                  path === l.to ? "text-deep-rose" : "text-charcoal hover:text-deep-rose"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden sm:grid place-items-center w-10 h-10 rounded-full hover:bg-blush transition" aria-label="Search">
              <Search className="w-4 h-4 text-charcoal" />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="relative grid place-items-center w-10 h-10 rounded-full hover:bg-blush transition"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 text-charcoal" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-deep-rose text-white text-[10px] w-5 h-5 grid place-items-center rounded-full font-medium">
                  {count}
                </span>
              )}
            </button>
            <Link
              to="/auth"
              className="hidden md:inline-flex ml-2 px-5 py-2 rounded-full bg-charcoal text-white text-sm hover:bg-deep-rose transition-colors"
            >
              Sign In
            </Link>
            <button
              className="md:hidden grid place-items-center w-10 h-10 rounded-full hover:bg-blush"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-cream md:hidden flex flex-col fade-up">
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-display text-2xl">Dollivery<span className="text-deep-rose">.</span></span>
            <button onClick={() => setMobileOpen(false)} className="w-10 h-10 grid place-items-center">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="font-display text-4xl text-charcoal hover:text-deep-rose"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/auth"
              onClick={() => setMobileOpen(false)}
              className="mt-6 px-8 py-3 rounded-full bg-charcoal text-white"
            >
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
