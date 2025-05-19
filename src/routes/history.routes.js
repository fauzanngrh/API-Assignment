const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const historyController = require('../controllers/history.controller')

router.get('/', authMiddleware, historyController.getTransactionHistory)

module.exports = router
