const db = require('../utils/db')

exports.getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id

    const result = await db.query(
      `SELECT invoice_number, service_code, service_name, transaction_type, amount AS total_amount, created_at AS created_on FROM transactions
            WHERE user_id = $1
            ORDER BY created_at DESC`,
      [userId],
    )

    res.status(200).json({
      status: 0,
      message: 'Get transaction history success',
      data: result.rows,
    })
  } catch (err) {
    console.error('get history error', err)
    res.status(500).json({
      status: 1,
      message: 'internal server error',
    })
  }
}
