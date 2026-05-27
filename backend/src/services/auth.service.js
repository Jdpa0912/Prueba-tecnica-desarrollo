const { createUser, findUserByEmail } = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

const registerUser = async (email, password) => {
  const hashed = await hashPassword(password);
  return createUser(email, hashed);
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = generateToken(user.id, user.email);
  return { token, user: { id: user.id, email: user.email } };
};

module.exports = { registerUser, loginUser };
