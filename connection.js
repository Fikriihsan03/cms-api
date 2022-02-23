const { Sequelize } = require("sequelize");

var sequelize = new Sequelize("cms", "root", "fimarasa", {
  dialect: "postgres",
});

module.exports = { db: sequelize };
