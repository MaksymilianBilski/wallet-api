const transaction = require("../schemas/transaction");

const createTransaction = async (data) => {
  await transaction.create(data);
};

const updateTransaction = async () => {};

const getAllTransactions = async () => {};

const getTransactionSummary = async () => {};

const deleteTransaction = async () => {};

module.exports = {
  createTransaction,
  updateTransaction,
  getAllTransactions,
  getTransactionSummary,
  deleteTransaction,
};
