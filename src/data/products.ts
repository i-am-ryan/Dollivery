export type Product = {
  id: string;
  name: string;
  vendor: string;
  vendorId: string;
  price: number;
  rating: number;
  category: "Wigs" | "Extensions" | "Braiding" | "Weaves" | "Lace Frontals";
  deliveryMin: number;
  color: string;
};

export const products: Product[] = [
  { id: "p1", name: "Silk Bob — Honey", vendor: "Maison Lumière", vendorId: "v1", price: 5760, rating: 4.9, category: "Wigs", deliveryMin: 45, color: "#d4a574" },
  { id: "p2", name: "Body Wave 22\"", vendor: "Velvet Strands", vendorId: "v4", price: 5040, rating: 4.8, category: "Extensions", deliveryMin: 60, color: "#3a2418" },
  { id: "p3", name: "HD Lace Frontal", vendor: "Crown & Co.", vendorId: "v2", price: 7380, rating: 4.9, category: "Lace Frontals", deliveryMin: 40, color: "#1a0f0a" },
  { id: "p4", name: "Knotless Bundle — Noir", vendor: "Soft Studio", vendorId: "v3", price: 1170, rating: 4.7, category: "Braiding", deliveryMin: 30, color: "#0d0806" },
  { id: "p5", name: "Glueless Glam Wig", vendor: "Rose Atelier", vendorId: "v5", price: 9720, rating: 5.0, category: "Wigs", deliveryMin: 50, color: "#5a3a28" },
  { id: "p6", name: "Deep Wave Weave", vendor: "Bloom Beauty", vendorId: "v6", price: 3960, rating: 4.6, category: "Weaves", deliveryMin: 55, color: "#2a1810" },
  { id: "p7", name: "Pixie Cut — Auburn", vendor: "Maison Lumière", vendorId: "v1", price: 3510, rating: 4.8, category: "Wigs", deliveryMin: 35, color: "#8b3a2a" },
  { id: "p8", name: "Silky Straight 18\"", vendor: "Velvet Strands", vendorId: "v4", price: 4320, rating: 4.7, category: "Extensions", deliveryMin: 45, color: "#1f1410" },
  { id: "p9", name: "Curly Fro Wig", vendor: "Rose Atelier", vendorId: "v5", price: 6840, rating: 4.9, category: "Wigs", deliveryMin: 50, color: "#3d2418" },
];
