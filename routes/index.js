const router = require('express').Router();
const authRoutes = require('./auth');
const companyRoutes = require('./companies');
const candidatesRoutes = require('./candidates');
const usersRoutes = require('./users')

/* GET home page */
router.get('/', (req, res, next) => {
  res.json('All good in here');
});

router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/candidates', candidatesRoutes);
router.use('/users', usersRoutes);

module.exports = router;
