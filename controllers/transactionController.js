const Transactions = require("../schemas/transaction");

const createTransaction = async (data) => {
  return await Transactions.create(data);
};

const findTransaction = async (value, credentials) => {
  return await Transactions.findOne({ [value]: credentials });
};

const updateTransaction = async (id, updateInfo) => {
  return await Transactions.findByIdAndUpdate(id, updateInfo);
};

const getAllTransactions = async (value, value2) => {
  return await Transactions.find({ [value]: value2 });
};

const getTransactionSummary = async () => {};

const deleteTransaction = async (id) => {
  return await Transactions.findByIdAndDelete(id);
};

module.exports = {
  createTransaction,
  findTransaction,
  updateTransaction,
  getAllTransactions,
  getTransactionSummary,
  deleteTransaction,
};
