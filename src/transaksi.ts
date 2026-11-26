import { OrderItem, Transaction } from "./models";
import { cariMenuById } from "./menu";

const daftarTransaksi: Transaction[] = [];

// CREATE: Buat transaksi baru dan hitung pembayaran
export function buatTransaksi(
  pesananInput: { menuId: string; qty: number }[],
  uangBayar: number
): Transaction | null {
  const items: OrderItem[] = [];

  for (const p of pesananInput) {
    const menu = cariMenuById(p.menuId);
    if (!menu || p.qty <= 0) {
      console.log(`Menu ${p.menuId} tidak valid atau jumlah porsi salah.`);
      return null;
    }
    items.push({
      menuId: menu.id,
      namaMenu: menu.nama,
      hargaSatuan: menu.harga,
      qty: p.qty,
      subtotal: menu.harga * p.qty,
    });
  }

  const totalHarga = items.reduce((sum, item) => sum + item.subtotal, 0);
  if (uangBayar < totalHarga) {
    console.log(`Pembayaran kurang! Total: Rp${totalHarga}, Dibayar: Rp${uangBayar}`);
    return null;
  }

  const transaksiBaru: Transaction = {
    idTransaksi: `TRX-${String(daftarTransaksi.length + 1).padStart(3, "0")}`,
    waktu: new Date().toLocaleString("id-ID"),
    items,
    totalHarga,
    uangBayar,
    kembalian: uangBayar - totalHarga,
    status: "Lunas",
  };

  daftarTransaksi.push(transaksiBaru);
  console.log(`Transaksi ${transaksiBaru.idTransaksi} berhasil disimpan.`);
  return transaksiBaru;
}

// READ: Tampilkan semua riwayat transaksi dan rincian item
export function lihatSemuaTransaksi(): void {
  console.log("\n=== RIWAYAT TRANSAKSI KANTIN ===");
  if (daftarTransaksi.length === 0) {
    console.log("Belum ada transaksi.");
    return;
  }
  daftarTransaksi.forEach((trx) => {
    console.log(
      `[${trx.idTransaksi}] ${trx.waktu} | Total: Rp${trx.totalHarga} | Bayar: Rp${trx.uangBayar} | Kembali: Rp${trx.kembalian} | Status: ${trx.status}`
    );
    trx.items.forEach((item) => {
      console.log(`   - ${item.namaMenu} x${item.qty} = Rp${item.subtotal}`);
    });
  });
}

// UPDATE: Ubah jumlah porsi pada transaksi yang sudah ada
export function updateJumlahItem(
  idTransaksi: string,
  menuId: string,
  qtyBaru: number
): boolean {
  const trx = daftarTransaksi.find((t) => t.idTransaksi === idTransaksi);
  if (!trx || trx.status === "Dibatalkan" || qtyBaru <= 0) return false;

  const item = trx.items.find((i) => i.menuId.toUpperCase() === menuId.toUpperCase());
  if (!item) return false;

  item.qty = qtyBaru;
  item.subtotal = item.hargaSatuan * qtyBaru;
  trx.totalHarga = trx.items.reduce((sum, i) => sum + i.subtotal, 0);
  trx.kembalian = trx.uangBayar - trx.totalHarga;
  console.log(`Transaksi ${idTransaksi} berhasil diperbarui.`);
  return true;
}

// DELETE: Hapus transaksi berdasarkan ID
export function hapusTransaksi(idTransaksi: string): boolean {
  const index = daftarTransaksi.findIndex((t) => t.idTransaksi === idTransaksi);
  if (index === -1) {
    console.log(`Transaksi ${idTransaksi} tidak ditemukan.`);
    return false;
  }
  daftarTransaksi.splice(index, 1);
  console.log(`Transaksi ${idTransaksi} berhasil dihapus.`);
  return true;
}