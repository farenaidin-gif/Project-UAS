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
        
      }
    }
  }
}