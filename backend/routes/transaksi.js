const router  = require('express').Router();
const auth    = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const isDemo  = require('../middleware/isDemo');    // ← TAMBAH
const {
  getTransaksi, createTransaksi
} = require('../controllers/transaksiController');

router.get('/',  auth,                          getTransaksi);
router.post('/', auth, isAdmin, isDemo,         createTransaksi);

module.exports = router;