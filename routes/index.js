const router = require('express').Router();
const authRoutes = require('./auth');
const companyRoutes = require('./companies');
const candidatesRoutes = require('./candidates');
const usersRoutes = require('./users')
const offersRoutes = require('./offers')

/* GET home page */
router.get('/', (req, res, next) => {
  res.json('All good in here');
});

router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/candidates', candidatesRoutes);
router.use('/users', usersRoutes);
router.use('/offers', offersRoutes)

module.exports = router;
