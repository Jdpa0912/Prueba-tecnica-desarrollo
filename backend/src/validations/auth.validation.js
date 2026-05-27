const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

module.exports = { loginSchema, registerSchema };