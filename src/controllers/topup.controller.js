const db = require('../utils/db')

exports.topupBalance = async (req, res) => {
  try {
    const userId = req.user.id
    const { top_up_amount } = req.body

    if (!top_up_amount || isNaN(top_up_amount)) {
      return res.status(400).json({
        status: 1,
        message: 'Top up balance is required and must be number',
      })
    }
    await db.query(`INSERT INTO topups (user_id, amount) VALUES ($1, $2)`, [
      userId,
      top_up_amount,
    ])

    res.status(200).json({
      status: 0,
      message: 'Balance top up success',
    })
  } catch (err) {
    console.error('Top up error', err)
    res.status(500).json({
      status: 1,
      message: 'internal server error',
    })
  }
}
