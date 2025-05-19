const db = require('../utils/db')
const services = require('../data/services')

function generateInvoiceNumber() {
  const now = new Date()
  const date = now.toISOString().split('T')[0].replace(/-/g, '')
  const rand = Math.floor(100 + Math.random() * 900)
  return `INV${date}-${rand}`
}

exports.makeTransaction = async (req, res) => {
  try {
    const userId = req.user.id
    const { service_code, amount } = req.body

    if (!service_code || !amount || isNaN(amount)) {
      return res.status(400).json({
        status: 1,
        message: 'Service code and valid amount required',
      })
    }

    const service = services.find((s) => s.service_code === service_code)
    if (!service) {
      return res.status(400).json({
        status: 1,
        message: 'invalid service code',
      })
    }

    const userRes = await db.query('SELECT balance FROM users WHERE id = $1', [
      userId,
    ])

    const userBalance = userRes.rows[0]?.balance || 0

    if (userBalance < amount) {
      return res.status(400).json({
        status: 1,
        message: 'Insufficient balance',
      })
    }

    const invoice_number = generateInvoiceNumber()
    const transaction_type = 'PAYMENT'
    const created_on = new Date()

    await db.query(`UPDATE users SET balance = balance - $1 WHERE id = $2`, [
      amount,
      userId,
    ])

    await db.query(
      `INSERT INTO transactions (user_id, service_code, service_name, amount, transaction_type, invoice_number, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        userId,
        service.service_code,
        service.service_name,
        amount,
        transaction_type,
        invoice_number,
        created_on,
      ],
    )

    res.status(200).json({
      status: 0,
      message: 'Transaksi berhasil',
      data: {
        invoice_number,
        service_code: service.service_code,
        service_name: service.service_name,
        transaction_type,
        total_ammount: amount,
        created_on: created_on.toISOString(),
      },
    })
  } catch (err) {
    console.error('Transaction error', err)
    res.status(500).json({
      status: 1,
      message: 'internal server error',
    })
  }
}
