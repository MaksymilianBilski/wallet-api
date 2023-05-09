const balance = (allTransactions, year, month) => {

  const expenseMonth = allTransactions
    .filter((el) => el.type.toUpperCase() === "EXPENSE")
    .filter((el) => Number(el.transactionDate.slice(0, 4)) === year)
    .filter((el) => Number(el.transactionDate.slice(5, 7)) === month)
    .map((el) => el.amount)
    .reduce((pv, acc) => {
      const value = pv + acc;
      return value;
    }, 0);

  const expenseYear = allTransactions
    .filter((el) => el.type.toUpperCase() === "EXPENSE")
    .filter((el) => Number(el.transactionDate.slice(0, 4)) === year)
    .map((el) => el.amount)
    .reduce((pv, acc) => {
      const value = pv + acc;
      return value;
    }, 0);

  const expenseAll = allTransactions
    .filter((el) => el.type.toUpperCase() === "EXPENSE")
    .map((el) => el.amount)
    .reduce((pv, acc) => {
      const value = pv + acc;
      return value;
    }, 0);

  const incomeAll = allTransactions
    .filter((el) => el.type.toUpperCase() === "INCOME")
    .map((el) => el.amount)
    .reduce((pv, acc) => {
      const value = pv + acc;
      return value;
    }, 0);

  const incomeMonth = allTransactions
    .filter((el) => el.type.toUpperCase() === "INCOME")
    .filter((el) => Number(el.transactionDate.slice(0, 4)) === year)
    .filter((el) => Number(el.transactionDate.slice(5, 7)) === month)
    .map((el) => el.amount)
    .reduce((pv, acc) => {
      const value = pv + acc;
      return value;
    }, 0);

  const incomeYear = allTransactions
    .filter((el) => el.type.toUpperCase() === "INCOME")
    .filter((el) => Number(el.transactionDate.slice(0, 4)) === year)
    .map((el) => el.amount)
    .reduce((pv, acc) => {
      const value = pv + acc;
      return value;
    }, 0);

  const balanceYear = incomeYear - expenseYear;
  const balanceMonth = incomeMonth - expenseMonth;
  const balance = incomeAll - expenseAll;
  return {
    balance: { balance, balanceYear, balanceMonth },
    income: { incomeAll, incomeYear, incomeMonth },
    expense: { expenseAll, expenseYear, expenseMonth },
  };
};

module.exports = balance;
