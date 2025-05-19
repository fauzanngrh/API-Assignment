const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const transactionController = require('../controllers/transaction.controller')

router.post('/', authMiddleware, transactionController.makeTransaction)

module.exports = router
