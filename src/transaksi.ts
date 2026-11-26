// Mengimpor struktur data transaksi dan fungsi pencarian menu
import { OrderItem, Transaction } from "./models";
import { cariMenuById } from "./menu";

// Array utama di memori untuk menampung seluruh riwayat transaksi
export let daftarTransaksi: Transaction[] = [];

// Variabel penghitung urutan nomor transaksi otomatis
let nomorUrut = 1;

// Fungsi bantu untuk membuat format ID transaksi unik (contoh: TRX-001)
function generateIdTransaksi(): string {
  const id = `TRX-${String(nomorUrut).padStart(3, "0")}`;
  nomorUrut++; // Menambah nilai urutan untuk transaksi berikutnya
  return id;
}

// CREATE: Membuat transaksi baru, menghitung total & kembalian, lalu menyimpan ke array
export function buatTransaksi(
  pesananInput: { menuId: string; qty: number }[],
  uangBayar: number
): Transaction | null {
  const itemsValid: OrderItem[] = [];
  let totalHarga = 0;

  // Memeriksa setiap item pesanan dan menghitung subtotal masing-masing
  for (const item of pesananInput) {
    const menu = cariMenuById(item.menuId);
    if (!menu) {
      console.log(`Menu dengan ID '${item.menuId}' tidak ditemukan.`);
      continue;
    }
    if (item.qty <= 0) {
      console.log(`Jumlah pesanan untuk ${menu.nama} harus lebih dari 0.`);
      continue;
    }

    const subtotal = menu.harga * item.qty;
    totalHarga += subtotal; // Menggunakan operator compound (+=) untuk akumulasi total

    itemsValid.push({
      menuId: menu.id,
      nama: menu.nama,
      harga: menu.harga,
      qty: item.qty,
      subtotal,
    });
  }

  // Validasi jika tidak ada satu pun item valid yang dipesan
  if (itemsValid.length === 0) {
    console.log("Transaksi dibatalkan: tidak ada item valid.");
    return null;
  }

  // Validasi kecukupan uang pembayaran dari pembeli
  if (uangBayar < totalHarga) {
    console.log(`Pembayaran kurang! Total: Rp${totalHarga}, Dibayar: Rp${uangBayar}`);
    return null;
  }

  // Menghitung uang kembalian dan menyusun objek transaksi baru
  const kembalian = uangBayar - totalHarga;
  const transaksiBaru: Transaction = {
    id: generateIdTransaksi(),
    tanggal: new Date().toLocaleString("id-ID"),
    items: itemsValid,
    totalHarga,
    uangBayar,
    kembalian,
    status: "Lunas",
  };

  // Menyimpan objek transaksi baru ke dalam array daftarTransaksi
  daftarTransaksi.push(transaksiBaru);
  console.log(`Transaksi ${transaksiBaru.id} berhasil disimpan.`);
  return transaksiBaru;
}

// READ: Menampilkan seluruh riwayat transaksi beserta rincian itemnya
export function lihatSemuaTransaksi(): void {
  console.log("\n=== RIWAYAT TRANSAKSI KANTIN ===");
  if (daftarTransaksi.length === 0) {
    console.log("Belum ada transaksi.");
    return;
  }

  // Melakukan perulangan pada setiap transaksi untuk ditampilkan ke terminal
  daftarTransaksi.forEach((trx) => {
    console.log(
      `[${trx.id}] ${trx.tanggal} | Total: Rp${trx.totalHarga} | Bayar: Rp${trx.uangBayar} | Kembalian: Rp${trx.kembalian} | Status: ${trx.status}`
    );
    trx.items.forEach((item) => {
      console.log(`   - ${item.nama} x${item.qty} = Rp${item.subtotal}`);
    });
  });
}

// UPDATE: Mengubah jumlah porsi suatu item pada transaksi tertentu dan menghitung ulang totalnya
export function updateJumlahItem(
  transaksiId: string,
  menuId: string,
  qtyBaru: number
): boolean {
  const trx = daftarTransaksi.find(
    (t) => t.id.toUpperCase() === transaksiId.toUpperCase()
  );
  if (!trx) {
    console.log(`Transaksi ${transaksiId} tidak ditemukan.`);
    return false;
  }

  const item = trx.items.find(
    (i) => i.menuId.toUpperCase() === menuId.toUpperCase()
  );
  if (!item) {
    console.log(`Menu ${menuId} tidak ada di transaksi ${transaksiId}.`);
    return false;
  }

  if (qtyBaru <= 0) {
    console.log("Jumlah baru harus lebih dari 0.");
    return false;
  }

  // Memperbarui jumlah porsi, subtotal item, total harga, dan uang kembalian
  item.qty = qtyBaru;
  item.subtotal = item.harga * qtyBaru;
  trx.totalHarga = trx.items.reduce((sum, i) => sum + i.subtotal, 0);
  trx.kembalian = trx.uangBayar - trx.totalHarga;

  console.log(`Item ${item.nama} pada ${trx.id} berhasil diubah menjadi ${qtyBaru} porsi.`);
  return true;
}

// DELETE: Menghapus data transaksi dari array berdasarkan ID transaksi
export function hapusTransaksi(transaksiId: string): boolean {
  const index = daftarTransaksi.findIndex(
    (t) => t.id.toUpperCase() === transaksiId.toUpperCase()
  );
  if (index === -1) {
    console.log(`Transaksi ${transaksiId} tidak ditemukan.`);
    return false;
  }

  // Menghapus 1 elemen transaksi pada posisi index menggunakan splice
  daftarTransaksi.splice(index, 1);
  console.log(`Transaksi ${transaksiId} berhasil dihapus.`);
  return true;
}