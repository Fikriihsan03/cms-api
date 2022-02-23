// const { ARRAY } = require("sequelize");
const { DataTypes } = require("sequelize");
const { db } = require("../connection");

const Pages = db.define(
  "pages",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      defaultValue: "ee29f3e7-950e-4d2b-b546-33851a91b07b",
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keywords: {
      // type: DataTypes.ARRAY(DataTypes.TEXT),
      type: DataTypes.JSON,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    // Other model options go here
  }
);

module.exports = { Pages: Pages };
