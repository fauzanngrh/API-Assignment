const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const balanceController = require('../controllers/balance.controller')

router.get('/', authMiddleware, balanceController.getBalance)

module.exports = router
