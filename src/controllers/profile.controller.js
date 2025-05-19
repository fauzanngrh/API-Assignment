const db = require('../utils/db')

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id

    const result = await db.query(
      `SELECT first_name, last_name, email. profile_image FROM users WHERE id = $1`,
      [userId],
    )

    const user = result.rows[0]

    res.status(200).json({
      status: 0,
      message: 'Get profile success',
      data: user,
    })
  } catch (err) {
    console.error('Get profile error', err)
    res.status(500).json({
      status: 1,
      message: 'internal server error',
    })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const { first_name, last_name } = req.body

    await db.query(
      `UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3`,
      [first_name, last_name, userId],
    )

    res.status(200).json({
      status: 0,
      message: 'Update profile success',
    })
  } catch (err) {
    console.error(' update profile error', err)
    res.status(500).json({
      status: 1,
      message: 'internal server error',
    })
  }
}

exports.updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.id
    const { profile_image } = req.body

    await db.query(`UPDATE users SET profile_image = $1 WHERE id = $2`, [
      profile_image,
      userId,
    ])

    res.status(200).json({
      status: 0,
      message: 'update profile image success',
    })
  } catch (err) {
    res.status(500).json({
      status: 1,
      message: 'internal server error',
    })
  }
}
