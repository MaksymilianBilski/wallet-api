const Users = require("../schemas/user");

const createUser = async (credentials) => {
  return await Users.create(credentials);
};

const findUser = async (value, credentials) => {
  return await Users.findOne({ [value]: credentials });
};


module.exports = { createUser, findUser };
