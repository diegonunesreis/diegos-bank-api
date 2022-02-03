import Client from "../models/Client";
import Transaction from "../models/Transaction"

class TransactionsController {
  async index(req, res) {
    try {
      const { clientId } = req.params;
      const { q } = req.query;
      const clients = await Client.findById(clientId);

      if (!clients) {
        return res.status(404).json();
      }

      let query = {};

      if (q) {
        query = {$or: [{"relatedAccount.name": { $regex: q, $options: 'i' }}, {transactionType: { $regex: q, $options: 'i' }}]}
      }

      const transactions = await Transaction.find({
        clientId: clientId,
        ...query,
      });

      return res.json(transactions);
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." })
    }
  }
}

export default new TransactionsController();