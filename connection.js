const { Sequelize } = require("sequelize");

var sequelize = new Sequelize(
  "df6euqkdmg8293",
  "fvjmmmhqotmwpw",
  "56681942048be2de11eab837fa618c7480b504fe47bff11679bdc9e232f91b23",
  {
    dialect: "postgres",
    host: "ec2-54-157-160-218.compute-1.amazonaws.com",
    port: "5432",
  }
);

module.exports = { db: sequelize };
