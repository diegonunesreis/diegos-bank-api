import Client from "../models/Client"
import Account from "../models/Account"
import Transaction from "../models/Transaction";
import { checkPassword, createPasswordHash } from "../services/auth"

class AccountsController {
  async transact(req, res) {
    try {
      const { clientId, op, amount, password } = req.body;

      const _client = await Client.findById(clientId);

      if (!_client) {
        return res.status(500).json("Client not registered.");
      }

      const isPasswordValid = await checkPassword(password, _client.password);

      if (!isPasswordValid) {
        return res.status(500).json("Invalid password.");
      }

      const _account = await Account.findOne({
        clientId: clientId
      });

      if (!_account) {
        return res.status(500).json("Account not registered.");
      }

      if (op === "withdraw") {
        if (_account.balance >= amount) {
          _account.balance -= amount;
        }
        else {
          return res.status(500).json("insufficient funds");
        }
      } else if (op === "deposit") {
        _account.balance += amount;
      }

      await _account.save();

      await Transaction.create({
        clientId: clientId,
        transactionType: op,
        transactionAmount: amount
      });

      return res.status(200).json();
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." })
    }
  }

  async transfer(req, res) {
    try {
      const { clientId, amount, password, destinationAccount } = req.body;

      const _originClient = await Client.findById(clientId);

      if (!_originClient) {
        return res.status(500).json("Client not registered.");
      }

      const isPasswordValid = await checkPassword(password, _originClient.password);

      if (!isPasswordValid) {
        return res.status(500).json("Invalid password.");
      }

      const _originAccount = await Account.findOne({
        clientId: clientId
      });

      if (!_originAccount) {
        return res.status(500).json("Account not registered.");
      }

      //check destination account
      const _destinationAccount = await Account.findOne({
        accountNumber: destinationAccount
      });

      const _destinationClient = await Client.findById(_destinationAccount.clientId);

      if (!_destinationAccount) {
        return res.status(404).json("Destination account not found.");
      }

      if (_destinationAccount.accountNumber === _originAccount.accountNumber) {
        return res.status(500).json("Source and destination accounts cannot be the same.");
      }

      if (_originAccount.balance >= amount && amount > 0) {
        _originAccount.balance -= amount;
        _destinationAccount.balance += amount;
      }
      else {
        return res.status(500).json("insufficient funds");
      }

      await _originAccount.save();
      await _destinationAccount.save();

      await Transaction.create({
        clientId: clientId,
        transactionType: "sent",
        relatedAccount: {
          id: _destinationClient._id,
          name: _destinationClient.name
        },
        transactionAmount: amount
      });

      await Transaction.create({
        clientId: _destinationAccount.clientId,
        transactionType: "received",
        relatedAccount: {
          id: _originClient._id,
          name: _originClient.name
        },
        transactionAmount: amount
      });

      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." })
    }
  }
}

export default new AccountsController();