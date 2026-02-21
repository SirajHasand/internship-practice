const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

/* ---------------- VALIDATION HELPERS ---------------- */
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateUser = ({ username, email, password, confirmPassword }) => {
  if (!username || username.trim().length < 3) {
    throw new Error("Username must be at least 3 characters long");
  }

  if (!email || !isValidEmail(email)) {
    throw new Error("Invalid email address");
  }

  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
};

/* ---------------- MODEL FUNCTIONS ---------------- */
const createUser = async ({ username, email, password, confirmPassword,role }) => {
  // validate input
  validateUser({ username, email, password, confirmPassword,role });

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password,role)
       VALUES ($1, $2, $3,$4)
       RETURNING id, username, email, created_at,role`,
      [username.trim(), email.toLowerCase(), hashedPassword,role.trim()]
    );

    return result.rows[0];
  } catch (err) {
    if (err.code === "23505") {
      if (err.detail.includes("email")) {
        throw new Error("Email already exists");
      }
      if (err.detail.includes("username")) {
        throw new Error("Username already exists");
      }
    }
    throw err;
  }
};

const getUserByEmail = async (email) => {
  if (!email || !isValidEmail(email)) {
    throw new Error("Invalid email address");
  }

  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email.toLowerCase()]
  );

  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await pool.query(
    `SELECT id, username, email, password, password_changed_at FROM users WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

const changedPasswordAfter = (JWTTimestamp, passwordChangedAt) => {
  if (passwordChangedAt) {
    const changedTimestamp = parseInt(passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  changedPasswordAfter,
};
