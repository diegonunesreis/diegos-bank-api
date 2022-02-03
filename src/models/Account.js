import mongoose from "mongoose";

const AutoIncrement = require("mongoose-sequence")(mongoose);

var Schema = mongoose.Schema;

const accountSchema = new mongoose.Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId, 
      ref:'Client',
      required: true
    },
    accountNumber: {
      type: Number
    },
    balance: {
      type: Number,
      required: false
    }
  },
  {
    timestamps: true
  }
);

accountSchema.plugin(AutoIncrement, {inc_field: "accountNumber"});

export default mongoose.model("Account", accountSchema);