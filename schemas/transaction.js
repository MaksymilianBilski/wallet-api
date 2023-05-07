const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transactionSchema = new schema({
  transactionDate: { type: String },
  type: { type: String },
  Enum: { type: Array, validate: (v) => Array.isArray(v) && v.length === 2 },
  categoryId: { type: String },
  comment: { type: String },
  amount: { type: Number },
  userId: { type: schema.ObjectId },
  balanceAfter: { type: Number },
});

const Transactions = mongoose.model("transactions", transactionSchema);

module.exports = Transactions;
