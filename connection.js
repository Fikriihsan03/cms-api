const { Sequelize } = require("sequelize");

var sequelize = new Sequelize(
  "d8a5rk3tahsmma",
  "pfnvvjgarljucb",
  "b679a4534ebbbca0833e8d8f963751f6975ab134dc2c6be3ad89f3fcac24f3a4",
  {
    dialect: "postgres",
    host: "ec2-52-2-118-38.compute-1.amazonaws.com",
    port: "5432",
  }
);

module.exports = { db: sequelize };
