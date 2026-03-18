const Barang    = require('../models/Barang');
const Transaksi = require('../models/Transaksi');

const demoData = [
  {
    nama: 'Laptop ASUS VivoBook',
    kategori: 'Elektronik',
    stok: 15,
    harga: 8500000,
    satuan: 'unit',
    gambar: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
  },
  {
    nama: 'Mouse Logitech M235',
    kategori: 'Elektronik',
    stok: 50,
    harga: 185000,
    satuan: 'unit',
    gambar: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'
  },
  {
    nama: 'Kursi Ergonomis',
    kategori: 'Furniture',
    stok: 8,
    harga: 2300000,
    satuan: 'unit',
    gambar: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400'
  },
  {
    nama: 'Meja Kerja',
    kategori: 'Furniture',
    stok: 5,
    harga: 1800000,
    satuan: 'unit',
    gambar: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400'
  },
  {
    nama: 'Printer Canon',
    kategori: 'Elektronik',
    stok: 3,
    harga: 1200000,
    satuan: 'unit',
    gambar: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400'
  },
  {
    nama: 'Headset Sony',
    kategori: 'Elektronik',
    stok: 20,
    harga: 450000,
    satuan: 'unit',
    gambar: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
  },
];

const resetDemoData = async () => {
  try {
    await Barang.deleteMany({});
    await Transaksi.deleteMany({});
    await Barang.insertMany(demoData);
    console.log('✅ Demo data reset:', new Date().toISOString());
  } catch (err) {
    console.error('❌ Gagal reset:', err.message);
  }
};

module.exports = resetDemoData;