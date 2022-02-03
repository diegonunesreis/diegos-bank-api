import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true
    },
    transactionType: {
      type: String,
      required: true
    },
    relatedAccount: {
      id: { type: String },
      name: { type: String }
    },
    transactionAmount: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Transaction", transactionSchema);