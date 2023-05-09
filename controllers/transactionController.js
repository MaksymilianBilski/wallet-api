const fs = require("fs/promises");
const Transactions = require("../schemas/transaction");
const balance = require("./balance");

const createTransaction = async (data) => {
  return await Transactions.create(data);
};

const findTransaction = async (value, credentials) => {
  return await Transactions.findOne({ [value]: credentials });
};

const updateTransaction = async (id, updateInfo) => {
  return await Transactions.findByIdAndUpdate(id, updateInfo);
};

const getAllTransactions = async (property, value) => {
  return await Transactions.find({ [property]: value });
};

const getTransactionCategories = async () => {
  const categoriesFile = await fs.readFile("./data/categories.json");
  const categories = JSON.parse(categoriesFile.toString()).map((el) => {
    return { id: el.id, name: el.name, type: el.type };
  });
  return categories;
};

const getTransactionSummary = async (id, year, month) => {
  const allTransactions = await getAllTransactions("userId", id);
  const allTransactionsCategories = await getTransactionCategories(
    "userId",
    id
  );
  const summary = balance(allTransactions, year, month);
  return { summary, allTransactionsCategories };
};

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
  getTransactionCategories,
};
