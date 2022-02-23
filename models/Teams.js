const { DataTypes } = require("sequelize");
const { db } = require("../connection");

const Teams = db.define(
  "teams",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      defaultValue: "537bc063-4ac9-42e4-830b-4d07db6049d9",
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    position: {
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
    socialmedia: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },

  {
    timestamps: false,
    // Other model options go here
  }
);

module.exports = { Teams: Teams };
