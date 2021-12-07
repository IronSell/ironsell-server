const router = require('express').Router();
const authRoutes = require('./auth');
const companyRoutes = require('./company');

/* GET home page */
router.get('/', (req, res, next) => {
  res.json('All good in here');
});

router.use('/auth', authRoutes);
router.use('/company', companyRoutes);

module.exports = router;
