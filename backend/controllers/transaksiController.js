const Transaksi = require('../models/Transaksi');
const Barang    = require('../models/Barang');

exports.createTransaksi = async (req, res) => {
  const { barang: barangId, tipe, jumlah, keterangan } = req.body;

  // Cari barang terkait
  const barang = await Barang.findById(barangId);
  if (!barang) return res.status(404).json({ message: 'Barang tidak ditemukan' });

  // Update stok: tambah jika masuk, kurangi jika keluar
  if (tipe === 'masuk') barang.stok += jumlah;
  if (tipe === 'keluar') {
    if (barang.stok < jumlah)
      return res.status(400).json({ message: 'Stok tidak mencukupi' });
    barang.stok -= jumlah;
  }
  await barang.save();

  const transaksi = await Transaksi.create({ barang: barangId, tipe, jumlah, keterangan });
  res.status(201).json(transaksi);
};

exports.getTransaksi = async (req, res) => {
  // populate: ganti ID barang dengan data barang aslinya
  const transaksi = await Transaksi.find().populate('barang', 'nama satuan').sort('-tanggal');
  res.json(transaksi);
};