// ============================================================================
// DEFINISI STRUKTUR DATA (INTERFACE) SISTEM KASIR KANTIN
// ============================================================================

// Struktur data untuk menyimpan informasi setiap item menu di kantin
export interface MenuItem {
  id: string;        // Kode unik menu (contoh: M01, D01)
  nama: string;      // Nama makanan atau minuman
  kategori: string;  // Kategori menu ("Makanan" atau "Minuman")
  harga: number;     // Harga satuan menu dalam Rupiah
}

// Struktur data untuk menyimpan detail setiap item yang dibeli dalam satu pesanan
export interface OrderItem {
  menuId: string;    // Referensi kode unik menu yang dipesan
  nama: string;      // Nama menu yang dipesan
  harga: number;     // Harga satuan saat transaksi dibuat
  qty: number;       // Jumlah porsi yang dibeli
  subtotal: number;  // Total harga per item (harga * qty)
}

// Struktur data utama untuk mencatat satu transaksi lengkap
export interface Transaction {
  id: string;              // Nomor unik transaksi (contoh: TRX-001)
  tanggal: string;         // Waktu dan tanggal transaksi dibuat
  items: OrderItem[];      // Daftar seluruh item yang dipesan
  totalHarga: number;      // Total keseluruhan tagihan transaksi
  uangBayar: number;       // Nominal uang tunai yang dibayarkan pembeli
  kembalian: number;       // Uang kembalian untuk pembeli (uangBayar - totalHarga)
  status: "Lunas" | "Belum Lunas"; // Status pembayaran transaksi
}