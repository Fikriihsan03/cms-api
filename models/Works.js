const { DataTypes } = require("sequelize");
const { db } = require("../connection");
const { Sequelize } = require("sequelize");

const Works = db.define(
  "works",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      defaultValue: "24fa96b1-c112-4904-9d85-9a89e7212b58",
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdat: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedat: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    // Other model options go here
  }
);

module.exports = { Works: Works };
