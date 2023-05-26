const mongoose = require("mongoose"); //importing mongoose
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

const user = require("./user.model");
const role = require("./role.model");

db.ROLES = ["user", "admin"];

module.exports = db;