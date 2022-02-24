const { Sequelize } = require("sequelize");

var sequelize = new Sequelize(
  "postgres://fvjmmmhqotmwpw:56681942048be2de11eab837fa618c7480b504fe47bff11679bdc9e232f91b23@ec2-54-157-160-218.compute-1.amazonaws.com:5432/df6euqkdmg8293",
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// var sequelize = new Sequelize("cms", "root", "fimarasa", {
//   dialect: "postgres",
// });

module.exports = { db: sequelize };
