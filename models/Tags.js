const { DataTypes } = require("sequelize");
const { db } = require("../connection");

const Tags = db.define(
  "tags",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      defaultValue: "5db214ec-a91f-44d1-900b-731c20e10fe6",
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

module.exports = { Tags: Tags };
