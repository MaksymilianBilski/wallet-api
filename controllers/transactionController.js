const Transactions = require("../schemas/transaction");

const createTransaction = async (data) => {
  return await Transactions.create(data);
};

const findTransaction = async (value, credentials) => {
  return await Transactions.findOne({ [value]: credentials });
};

const updateTransaction = async (value, updateInfo) => {
  return await Transactions.findOneAndUpdate({ value }, updateInfo);
};

const getAllTransactions = async () => {};

const getTransactionSummary = async () => {};

const deleteTransaction = async () => {};

module.exports = {
  createTransaction,
  findTransaction,
  updateTransaction,
  getAllTransactions,
  getTransactionSummary,
  deleteTransaction,
};
