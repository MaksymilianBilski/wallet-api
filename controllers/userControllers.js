const Users = require("../schemas/user");

const createUser = async (credentials) => {
  return await Users.create(credentials);
};

const findUser = async (value, credentials) => {
  const user = await Users.findOne({ [value]: credentials });
  return user;
};

const getCurrentUserInfo = async (email) => {
  await Users.findOne({ email });
};

module.exports = { createUser, getCurrentUserInfo, findUser };
