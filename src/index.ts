// Mengimpor modul readline/promises untuk membaca input keyboard secara interaktif di terminal
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { tampilkanMenu } from "./menu";
import {
  buatTransaksi,
  lihatSemuaTransaksi,
  updateJumlahItem,
  hapusTransaksi,
} from "./transaksi";

// Membuat antarmuka pembaca input dan output terminal
const rl = readline.createInterface({ input, output });

// Fungsi utama berbasis asynchronous untuk menjalankan perulangan menu kasir
async function jalankanAplikasi() {
  let berjalan = true; // Variabel penanda status aplikasi tetap berjalan

  // Perulangan utama menu yang terus tampil selama pengguna belum memilih keluar (0)
  while (berjalan) {
    console.log("\n====================================");
    console.log("   SISTEM KASIR KANTIN INTERAKTIF   ");
    console.log("====================================");
    console.log("1. Lihat Daftar Menu");
    console.log("2. Buat Transaksi Baru");
    console.log("3. Lihat Riwayat Transaksi");
    console.log("4. Update Jumlah Item Transaksi");
    console.log("5. Hapus Transaksi");
    console.log("0. Keluar");
    console.log("====================================");

    // Membaca pilihan menu dari pengguna
    const pilihan = (await rl.question("Pilih menu (0-5): ")).trim();

    // Seleksi kondisi switch untuk mengarahkan ke fitur sesuai pilihan menu
    switch (pilihan) {
      case "1": {
        // Menampilkan daftar menu kantin
        tampilkanMenu();
        break;
      }
      case "2": {
        // Menampilkan menu terlebih dahulu lalu memproses input pesanan baru
        tampilkanMenu();
        const pesanan: { menuId: string; qty: number }[] = [];
        let tambahLagi = true;

        // Perulangan untuk menambahkan satu atau lebih item menu dalam satu transaksi
        while (tambahLagi) {
          const menuId = (await rl.question("Masukkan ID Menu (contoh: M01): ")).trim();
          const qtyStr = (await rl.question("Masukkan jumlah porsi: ")).trim();
          const qty = parseInt(qtyStr, 10);

          // Validasi input jumlah porsi harus berupa angka positif
          if (isNaN(qty) || qty <= 0) {
            console.log("Jumlah porsi harus berupa angka lebih dari 0.");
          } else {
            pesanan.push({ menuId, qty });
          }

          // Menanyakan apakah kasir ingin menambah item menu lain
          const lanjut = (await rl.question("Tambah menu lain? (y/n): ")).trim().toLowerCase();
          if (lanjut !== "y") {
            tambahLagi = false;
          }
        }

        // Memproses pembayaran jika terdapat minimal satu pesanan valid
        if (pesanan.length > 0) {
          const bayarStr = (await rl.question("Masukkan uang pembayaran (Rp): ")).trim();
          const uangBayar = parseInt(bayarStr, 10);
          if (isNaN(uangBayar)) {
            console.log("Nominal pembayaran tidak valid.");
          } else {
            buatTransaksi(pesanan, uangBayar);
          }
        }
        break;
      }
      case "3": {
        // Menampilkan seluruh riwayat transaksi yang tersimpan
        lihatSemuaTransaksi();
        break;
      }
      case "4": {
        // Menampilkan daftar transaksi lalu meminta data pembaruan jumlah porsi
        lihatSemuaTransaksi();
        const idTrx = (await rl.question("Masukkan ID Transaksi (contoh: TRX-001): ")).trim().toUpperCase();
        const menuId = (await rl.question("Masukkan ID Menu yang ingin diubah: ")).trim();
        const qtyBaruStr = (await rl.question("Masukkan jumlah porsi baru: ")).trim();
        const qtyBaru = parseInt(qtyBaruStr, 10);

        // Validasi jumlah porsi baru sebelum memanggil fungsi update
        if (isNaN(qtyBaru) || qtyBaru <= 0) {
          console.log("Jumlah baru tidak valid.");
        } else {
          const berhasil = updateJumlahItem(idTrx, menuId, qtyBaru);
          if (!berhasil) {
            console.log("Gagal memperbarui transaksi. Pastikan ID Transaksi dan ID Menu benar.");
          }
        }
        break;
      }
      case "5": {
        // Menampilkan daftar transaksi lalu menghapus transaksi berdasarkan ID
        lihatSemuaTransaksi();
        const idTrx = (await rl.question("Masukkan ID Transaksi yang akan dihapus (contoh: TRX-001): ")).trim().toUpperCase();
        hapusTransaksi(idTrx);
        break;
      }
      case "0": {
        // Menghentikan perulangan menu dan menutup aplikasi
        console.log("Terima kasih telah menggunakan Sistem Kasir Kantin!");
        berjalan = false;
        break;
      }
      default: {
        // Menangani input menu di luar pilihan 0-5
        console.log("Pilihan tidak valid, silakan pilih angka 0 sampai 5.");
        break;
      }
    }
  }

  // Menutup interface readline setelah aplikasi selesai
  rl.close();
}

// Memanggil fungsi utama untuk memulai aplikasi kasir kantin
jalankanAplikasi();