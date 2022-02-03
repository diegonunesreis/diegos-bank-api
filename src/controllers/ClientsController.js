import Client from "../models/Client"
import Account from "../models/Account"
import { createPasswordHash } from "../services/auth"

class ClientsController {
  async index(req, res) {
    try {
      const clients = await Client.find();
      return res.json(clients);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." })
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const client = await Client.findById(id);

      if (!client) {
        return res.status(404).json();
      }

      const clientAccount = await Account.findOne({
        clientId: id
      })

      return res.json({ client, clientAccount });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." })
    }
  }

  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const birthDate = new Date(req.body.birthDate);
      const client = await Client.findOne({ email });

      if (client) {
        return res
          .status(422)
          .json({ message: `Email ${email} already exists.` });
      }

      //Encrypting the password
      const encryptedPassword = await createPasswordHash(password);

      const newClient = await Client.create({
        name,
        birthDate,
        email,
        password: encryptedPassword
      });

      const newAccount = await Account.create({
        clientId: newClient._id,
        balance: 0
      });

      return res.status(201).json({ newClient, newAccount });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const birthDate = new Date(req.body.birthDate);

      const client = await Client.findById(id);

      if (!client) {
        return res.status(404).json();
      }

      //Encrypting the password
      const encryptedPassword = await createPasswordHash(password);

      await client.updateOne({
        name,
        birthDate,
        email,
        password: encryptedPassword
      });

      return res.status(200).json();
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." })
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const client = await Client.findById(id);

      if (!client) {
        return res.status(404).json();
      }

      const account = await Account.findOne({
        clientId: id
      });
      
      if (account) {
        await account.deleteOne();
      }

      await client.deleteOne();

      return res.status(200).json();
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." })
    }
  }
}

export default new ClientsController();