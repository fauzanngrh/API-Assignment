const bcrypt = require('bcrypt')
const db = require('../utils/db')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        status: 1,
        message: 'email and password are required',
      })
    }
    const result = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])
    const user = result.rows[0]

    if (!user) {
      return res.status(401).json({
        status: 1,
        message: 'invalid email or password',
      })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({
        status: 1,
        message: 'invalid email or password',
      })
    }
    const payload = {
      id: user.id,
      email: user.email,
      full_name: `${user.first_name} ${user.last_name}`,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(200).json({
      status: 0,
      message: 'Login Success',
      data: { token },
    })
  } catch (err) {
    console.log(' Login Error:', err)
    res.status(500).json({
      status: 1,
      message: 'internal server error',
    })
  }
}

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body

    if (!first_name || !last_name || !email || !password) {
      return res
        .status(400)
        .json({ status: 1, message: 'All fields are required' })
    }

    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])
    if (userExists.rows.length > 0) {
      return res
        .status(409)
        .json({ status: 1, message: 'Email already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.query(
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES ($1, $2, $3, $4)`,
      [first_name, last_name, email, hashedPassword],
    )

    res.status(201).json({ status: 0, message: 'Register success' })
  } catch (err) {
    console.error('REGISTER ERROR:', err)
    res.status(500).json({ status: 1, message: 'Internal Server Error' })
  }
}
