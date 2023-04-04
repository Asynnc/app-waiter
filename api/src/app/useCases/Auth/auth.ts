import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from 'jsonwebtoken';
import AuthConfig from '../../config/auth';
import { AppError } from "../../errors";
import { User } from "../../models/User";

export async function authenticate(request: Request, response: Response) {
  try {
    const user = await User.findOne({ email: request.body.email.toLowerCase() });

    if (!user) {
      throw new AppError('Email does not exists.', 400)
    }

    const isPasswordValid = await compare(request.body.password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn
    })

    return response.status(200).json({
      user,
      token
    })
  } catch (error) {
    console.error(error);
    response.sendStatus(500).json({
      error: 'Internal Server Error.'
    });
  }
}
