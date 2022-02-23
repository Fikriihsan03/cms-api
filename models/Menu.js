const { DataTypes } = require("sequelize");
const { db } = require("../connection");

const Menu = db.define(
  "menus_data",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      defaultValue: "b86fb2a8-ad49-4e5d-9649-d706c3e286fc",
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    parentid: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },

  {
    timestamps: false,
    // Other model options go here
  }
);

module.exports = { Menu: Menu };
