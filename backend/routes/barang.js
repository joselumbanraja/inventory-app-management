const router   = require('express').Router();
const auth     = require('../middleware/auth');
const isAdmin  = require('../middleware/isAdmin');
const isDemo   = require('../middleware/isDemo');    // ← TAMBAH
const upload   = require('../config/cloudinary');
const {
  getBarang, createBarang, updateBarang, deleteBarang
} = require('../controllers/barangController');

const uploadOptional = (req, res, next) => {
  upload.single('gambar')(req, res, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    next();
  });
};

router.get('/',       auth,                                    getBarang);
router.post('/',      auth, isAdmin, isDemo, uploadOptional,   createBarang);
router.put('/:id',    auth, isAdmin, isDemo, uploadOptional,   updateBarang);
router.delete('/:id', auth, isAdmin, isDemo,                   deleteBarang);

module.exports = router;