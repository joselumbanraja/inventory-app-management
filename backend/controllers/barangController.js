const Barang = require('../models/Barang');
const cloudinary = require('cloudinary').v2;

exports.getBarang = async (req, res) => {
  try {
    const barang = await Barang.find();
    res.json(barang);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBarang = async (req, res) => {
  try {
    const gambar = req.file ? req.file.path : (req.body.gambar || '');

    const barang = await Barang.create({
      nama:     req.body.nama,
      kategori: req.body.kategori || '',
      stok:     Number(req.body.stok) || 0,
      harga:    Number(req.body.harga) || 0,
      satuan:   req.body.satuan || 'pcs',
      gambar,
    });

    res.status(201).json(barang);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBarang = async (req, res) => {
  try {
    const existing = await Barang.findById(req.params.id);
    if (!existing)
      return res.status(404).json({ message: 'Barang tidak ditemukan' });

    if (req.file && existing.gambar && existing.gambar.includes('cloudinary')) {
      const publicId = existing.gambar.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`inventory/${publicId}`);
    }

    const gambar = req.file ? req.file.path
                 : (req.body.gambar || existing.gambar || '');

    const barang = await Barang.findByIdAndUpdate(
      req.params.id,
      {
        nama:     req.body.nama,
        kategori: req.body.kategori || '',
        stok:     Number(req.body.stok) || 0,
        harga:    Number(req.body.harga) || 0,
        satuan:   req.body.satuan || 'pcs',
        gambar,
      },
      { returnDocument: 'after' } // ← fix warning Mongoose
    );

    res.json(barang);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBarang = async (req, res) => {
  try {
    const barang = await Barang.findById(req.params.id);
    if (!barang)
      return res.status(404).json({ message: 'Barang tidak ditemukan' });

    if (barang.gambar && barang.gambar.includes('cloudinary')) {
      const publicId = barang.gambar.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`inventory/${publicId}`);
    }

    await Barang.findByIdAndDelete(req.params.id);
    res.json({ message: 'Barang berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};