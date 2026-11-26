import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { tampilkanMenu } from "./menu";
import {
  buatTransaksi,
  lihatSemuaTransaksi,
  updateJumlahItem,
  hapusTransaksi,
} from "./transaksi";

const rl = readline.createInterface({ input, output });

async function jalankanAplikasi() {
  let berjalan = true;

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

    const pilihan = (await rl.question("Pilih menu (0-5): ")).trim();

    switch (pilihan) {
      case "1": {
        tampilkanMenu();
        break;
      }
      case "2": {
        tampilkanMenu();
        const pesanan: { menuId: string; qty: number }[] = [];
        let tambahLagi = true;

        while (tambahLagi) {
          const menuId = (await rl.question("Masukkan ID Menu (contoh: M01): ")).trim();
          const qtyStr = (await rl.question("Masukkan jumlah porsi: ")).trim();
          const qty = parseInt(qtyStr, 10);

          if (isNaN(qty) || qty <= 0) {
            console.log("Jumlah porsi harus berupa angka lebih dari 0.");
          } else {
            pesanan.push({ menuId, qty });
          }

          const lanjut = (await rl.question("Tambah menu lain? (y/n): ")).trim().toLowerCase();
          if (lanjut !== "y") {
            tambahLagi = false;
          }
        }

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
        lihatSemuaTransaksi();
        break;
      }
      case "4": {
        lihatSemuaTransaksi();
        const idTrx = (await rl.question("Masukkan ID Transaksi (contoh: TRX-001): ")).trim().toUpperCase();
        const menuId = (await rl.question("Masukkan ID Menu yang ingin diubah: ")).trim();
        const qtyBaruStr = (await rl.question("Masukkan jumlah porsi baru: ")).trim();
        const qtyBaru = parseInt(qtyBaruStr, 10);

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
        lihatSemuaTransaksi();
        const idTrx = (await rl.question("Masukkan ID Transaksi yang akan dihapus (contoh: TRX-001): ")).trim().toUpperCase();
        hapusTransaksi(idTrx);
        break;
      }
      case "0": {
        console.log("Terima kasih telah menggunakan Sistem Kasir Kantin!");
        berjalan = false;
        break;
      }
      default: {
        console.log("Pilihan tidak valid, silakan pilih angka 0 sampai 5.");
        break;
      }
    }
  }

  rl.close();
}

jalankanAplikasi();