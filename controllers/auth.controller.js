import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '@prisma/client';

const prisma = new client.PrismaClient();

export class AuthController {
  async register(req, res) {
    const { email, password, password2, first_name, last_name, display_name } =
      req.body;

    if (password !== password2) {
      return res.status(400).json({ error: 'The passwords do not match.' });
    }
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res
          .status(409)
          .json({ error: 'This email is already registered.' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          first_name,
          last_name,
          display_name,
        },
      });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
      return res.status(201).json({
        user,
        token,
      });
    } catch (err) {
      console.log(err);
      return res.status(err.status).json({ error: err.message });
    }
  }
}
