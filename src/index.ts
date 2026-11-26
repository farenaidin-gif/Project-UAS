import { tampilkanMenu } from "./menu";
import {
  buatTransaksi,
  lihatSemuaTransaksi,
  updateJumlahItem,
  hapusTransaksi,
} from "./transaksi";

console.log("=== SISTEM KASIR KANTIN v1.0 ===");

tampilkanMenu();

// CREATE
buatTransaksi(
  [
    { menuId: "M01", qty: 2 },
    { menuId: "D01", qty: 2 },
  ],
  50000
);
buatTransaksi([{ menuId: "M02", qty: 1 }], 20000);

// READ
lihatSemuaTransaksi();

// UPDATE
updateJumlahItem("TRX-001", "M01", 1);
lihatSemuaTransaksi();

// DELETE
hapusTransaksi("TRX-002");
lihatSemuaTransaksi();