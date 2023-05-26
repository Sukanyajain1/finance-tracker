const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

const mongoose = require("./user.model");
const mongoose = require("./role.model");

db.ROLES = ["user", "admin"];

module.exports = db;