const DEMO_EMAILS = [
  'admin.demo@inventory.com',
  'user.demo@inventory.com'
];

module.exports = (req, res, next) => {
  const isDemoAccount = DEMO_EMAILS.includes(req.user?.email);

  if (!isDemoAccount) return next();

  // Demo tidak bisa DELETE
  if (req.method === 'DELETE') {
    return res.status(403).json({
      message: '⚠️ Akun demo tidak bisa menghapus data'
    });
  }

  next();
};