const { DataTypes } = require("sequelize");
const { db } = require("../connection");

const Category = db.define(
  "categories",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      defaultValue: "6001ccae-3239-4529-9fd4-bd64424cb2c6",
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
  },

  {
    timestamps: false,
    // Other model options go here
  }
);

module.exports = { Category: Category };
