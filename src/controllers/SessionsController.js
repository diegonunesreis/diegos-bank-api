import jwt from "jsonwebtoken";
import Client from "../models/Client";
import { checkPassword } from "../services/auth";
import authConfig from "../config/auth";

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;
    const client = await Client.findOne({ email }) ;
  
    if(!client){
      return res.status(401).json({ error: "User / password invalid." })
    }

    if(!await checkPassword(password, client.password)) {
      return res.status(401).json({ error: "User / password invalid" })
    }
    const { id } = client;

    return res.json({
      client: {
        id,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

export default new SessionsController();