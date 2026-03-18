const router = require('express').Router();
const resetDemoData = require('../utils/resetDemo');

router.post('/reset', async (req, res) => {
  const { secret } = req.body;

  if (secret !== process.env.DEMO_RESET_SECRET) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  await resetDemoData();
  res.json({ message: ' Demo data berhasil direset' });
});

module.exports = router;