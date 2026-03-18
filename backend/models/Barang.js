const mongoose = require('mongoose');

const BarangSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    kategori: { type: String},
    stok: { type: Number, default: 0 },
    harga: { type: Number, required: true },
    satuan: { type: String, default: 'pcs' },
    gambar: { type: String, default: '' },
    }, { timestamps: true });

    module.exports = mongoose.model('Barang', BarangSchema);