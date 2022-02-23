const { DataTypes } = require("sequelize");
const { db } = require("../connection");

const Slider = db.define(
  "slider_data",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      defaultValue: "7d75da64-5f73-47c9-a85e-2b651d18bc11",
      primaryKey: true,
      // autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    imageurl: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },

  {
    timestamps: false,
    // Other model options go here
  }
);

module.exports = { Slider: Slider };
