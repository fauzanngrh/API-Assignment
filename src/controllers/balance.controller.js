const db = require('../utils/db')

exports.getBalance = async (req, res) => {
  try {
    const userId = req.user.id

    const result = await db.query(`SELECT balance FROM users WHERE id = $1`, [
      userId,
    ])

    const balance = result.rows[0]?.balance || 0

    res.status(200).json({
      status: 0,
      message: 'Get balance success',
      data: { balance },
    })
  } catch (err) {
    res.status(500).json({
      status: 1,
      message: 'internal server serror',
    })
  }
}
