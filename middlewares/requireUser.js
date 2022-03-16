import jwt from 'jsonwebtoken';
import client from '@prisma/client';

const prisma = new client.PrismaClient();

export const requireUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in.' });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'You must be logged in.' });
    }
    return res.status(err.status || 500).json({ error: err.message });
  }
};
