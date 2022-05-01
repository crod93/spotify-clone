import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;
  let user = null;
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hasSync(password, salt),
      },
    });
  } catch (error) {
    console.error('There was an error', error);
    res.status(401);
    return res.json({ error });
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    'hello',
    { expiresIn: '8h' }
  );

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('TRAX_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: '6h',
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  res.json(user);
};
