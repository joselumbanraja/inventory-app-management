const mongoose = require('mongoose');

const TransaksiSchema = new mongoose.Schema({
    barang: { type: mongoose.Schema.Types.ObjectId, ref: 'Barang', required: true },
    tipe : { type: String, enum: ['masuk', 'keluar'], required: true },
    jumlah: { type: Number, required: true },
    keterangan: { type: String },
    tanggal: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaksi', TransaksiSchema);