const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: [
    'https://inventory-frontend-management.vercel.app',
    'https://inventory-app-brown-eta.vercel.app', // URL lama tetap ada
    'http://localhost:5173',                        // untuk development lokal
  ],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())} detik`,
  });
});

app.use('/api/auth',      require('./routes/auth'));
app.use('/api/barang',    require('./routes/barang'));
app.use('/api/transaksi', require('./routes/transaksi'));
app.use('/api/demo',      require('./routes/demo'));   // ← TAMBAH INI

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB terhubung');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server berjalan di port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error('❌ Gagal:', err));

module.exports = app;