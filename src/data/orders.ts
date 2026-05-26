export type OrderRow = {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: "Pending" | "Preparing" | "Complete";
};

export const recentOrders: OrderRow[] = [
  { id: "#DLV-1042", customer: "Amara Okafor", items: "Silk Bob — Honey", total: 5760, status: "Preparing" },
  { id: "#DLV-1041", customer: "Léa Dubois", items: "HD Lace Frontal x2", total: 14760, status: "Complete" },
  { id: "#DLV-1040", customer: "Zanele Khumalo", items: "Body Wave 22\"", total: 5040, status: "Pending" },
  { id: "#DLV-1039", customer: "Kemi Adeyemi", items: "Glueless Glam Wig", total: 9720, status: "Complete" },
  { id: "#DLV-1038", customer: "Naledi Mokoena", items: "Knotless Bundle x3", total: 3510, status: "Complete" },
];

export const monthlyRevenue = [
  { month: "Apr", revenue: 57600 },
  { month: "May", revenue: 73800 },
  { month: "Jun", revenue: 68400 },
  { month: "Jul", revenue: 93600 },
  { month: "Aug", revenue: 109800 },
  { month: "Sep", revenue: 133200 },
];
