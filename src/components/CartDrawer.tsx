import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal, clear } = useCart();
  const fee = items.length ? 75 : 0;

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-charcoal/30 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 z-[80] h-full w-full sm:w-[420px] bg-cream shadow-luxe transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h3 className="font-display text-2xl">Your Bag</h3>
          <button onClick={() => setOpen(false)} className="w-9 h-9 rounded-full grid place-items-center hover:bg-blush">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-center text-warm-grey font-display text-lg mt-12">Your bag is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 bg-white rounded-2xl p-3 shadow-soft">
                  <div className="w-16 h-16 rounded-xl shrink-0" style={{ background: `linear-gradient(135deg, ${i.color}, #fdf8f5)` }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg leading-tight truncate">{i.name}</p>
                    <p className="text-xs text-warm-grey">{i.vendor}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-blush rounded-full px-2 py-1">
                        <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs w-4 text-center">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase"><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="text-sm font-medium">R{(i.price * i.qty).toLocaleString()}</span>
                    </div>
                  </div>
                  <button onClick={() => remove(i.id)} aria-label="Remove" className="text-warm-grey hover:text-deep-rose">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t px-6 py-5 space-y-3 bg-white">
            <div className="flex justify-between text-sm"><span className="text-warm-grey">Subtotal</span><span>R{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-warm-grey">Delivery</span><span>R{fee.toLocaleString()}</span></div>
            <div className="flex justify-between font-display text-xl pt-2 border-t"><span>Total</span><span>R{(subtotal + fee).toLocaleString()}</span></div>
            <Link
              to="/track"
              onClick={() => { setOpen(false); clear(); }}
              className="block text-center w-full py-3 rounded-full bg-deep-rose text-white hover:bg-charcoal transition-colors"
            >
              Place Order
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
