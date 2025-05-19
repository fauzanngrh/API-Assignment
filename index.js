require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

const authRoutes = require('./src/routes/auth.routes')
app.use('/api/v1/auth', authRoutes)

const profileRoutes = require('./src/routes/profile.routes')
app.use('/api/v1/profile', profileRoutes)

const balanceRoutes = require('./src/routes/balance.routes')
app.use('/api/v1/balance', balanceRoutes)

const topupRoutes = require('./src/routes/topup.routes')
app.use('/api/v1/topup', topupRoutes)

const transactionRoutes = require('./src/routes/transaction.routes')
app.use('/api/v1/transaction', transactionRoutes)

const historyTransaction = require('./src/routes/history.routes')
app.use('/api/v1/history', historyTransaction)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
