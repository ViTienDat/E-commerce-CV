const jwt = require("jsonwebtoken");

const createAccessToken = (uid, role) => {
  return jwt.sign({ _id: uid, role }, process.env.JWT_KEY, { expiresIn: "1d" });
};

module.exports = {
  createAccessToken,
};
