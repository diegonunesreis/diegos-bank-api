import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    password: {
      type: String,
      required: true
    },
    accountId: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Client", clientSchema);