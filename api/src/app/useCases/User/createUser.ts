import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../../models/User";

export async function createUser(request: Request, response: Response){
  try {
    {
      const checkUserExists = await User.findOne({
        email: request.body.email
      })

      if(checkUserExists){
        return response.sendStatus(400).json({
          error: 'Email already exists.'
        })
      }

      const hashedPassword = await hash(request.body.password, 8)

      const user = await User.create({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword
      })

      response.status(201).json(user)
     }
  } catch (error) {
    console.error(error);
    response.sendStatus(500).json({
      error: 'Internal Server Error.'
    });
  }
}
