const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.registerUser(email, password);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    if (err.code === '23505') { // unique violation
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser(email, password);
    res.json({ success: true, data: { token, user } });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

module.exports = { register, login };