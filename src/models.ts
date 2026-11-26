export interface MenuItem {
  id: string;
  nama: string;
  kategori: "Makanan" | "Minuman";
  harga: number;
}

export interface OrderItem {
  menuId: string;
  namaMenu: string;
  hargaSatuan: number;
  qty: number;
  subtotal: number;
}

export interface Transaction {
  idTransaksi: string;
  waktu: string;
  items: OrderItem[];
  totalHarga: number;
  uangBayar: number;
  kembalian: number;
  status: "Lunas" | "Dibatalkan";
}