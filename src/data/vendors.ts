export type Vendor = {
  id: string;
  name: string;
  rating: number;
  logo: string;
  city: string;
  specialty: string;
};

export const vendors: Vendor[] = [
  { id: "v1", name: "Maison Lumière", rating: 4.9, logo: "ML", city: "Lagos", specialty: "Luxury Wigs" },
  { id: "v2", name: "Crown & Co.", rating: 4.8, logo: "CC", city: "Accra", specialty: "Lace Frontals" },
  { id: "v3", name: "Soft Studio", rating: 4.7, logo: "SS", city: "Nairobi", specialty: "Braiding Hair" },
  { id: "v4", name: "Velvet Strands", rating: 4.9, logo: "VS", city: "London", specialty: "Extensions" },
  { id: "v5", name: "Rose Atelier", rating: 5.0, logo: "RA", city: "Paris", specialty: "Custom Wigs" },
  { id: "v6", name: "Bloom Beauty", rating: 4.6, logo: "BB", city: "Johannesburg", specialty: "Weaves" },
];
