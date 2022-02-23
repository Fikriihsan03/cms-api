const { DataTypes } = require("sequelize");
const { db } = require("../connection");

const Keywords = db.define(
  "keywords",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      defaultValue: "70f8f150-9150-4acb-afd7-0f9fd78e11df",
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

module.exports = { Keywords: Keywords };
