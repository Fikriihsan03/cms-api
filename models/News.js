// const { ARRAY } = require("sequelize");
const { DataTypes } = require("sequelize");
const { db } = require("../connection");
const { Category } = require("./Category");
const { Keywords } = require("./Keywords");
const { Tags } = require("./Tags");
const News = db.define(
  "news",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      defaultValue: "37c31113-5329-4287-8ce8-5b0df580bbb4",
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categories: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    keywords: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    // Other model options go here
  }
);
// News.belongsToMany(Tags, {
//   through: "news_tag",
//   as: "newsTags",
//   foreignKey: "news_tagName",
// });
// Tags.belongsToMany(News, {
//   through: "news_tag",
//   as: "newsTagName",
//   foreignKey: "tags_name",
// });

// db.sync({ alter: true });
module.exports = { News: News };
