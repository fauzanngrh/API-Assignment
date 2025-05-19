const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const topupController = require('../controllers/topup.controller')

router.post('/', authMiddleware, topupController.topupBalance)

module.exports = router
