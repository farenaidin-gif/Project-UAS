import { MenuItem } from "./models";

export const daftarMenu: MenuItem[] = [
  { id: "M01", nama: "Nasi Goreng Kampus", kategori: "Makanan", harga: 15000 },
  { id: "M02", nama: "Ayam Geprek Sambal Bawang", kategori: "Makanan", harga: 14000 },
  { id: "M03", nama: "Mie Goreng Spesial", kategori: "Makanan", harga: 12000 },
  { id: "D01", nama: "Es Teh Manis", kategori: "Minuman", harga: 4000 },
  { id: "D02", nama: "Es Jeruk Peras", kategori: "Minuman", harga: 5000 },
];

export function tampilkanMenu(): void {
  console.log("\n=== DAFTAR MENU KANTIN ===");
  console.table(daftarMenu);
}

export function cariMenuById(id: string): MenuItem | undefined {
  return daftarMenu.find((item) => item.id.toUpperCase() === id.toUpperCase());
}