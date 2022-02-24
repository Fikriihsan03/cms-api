const { Category } = require("../models/Category");
const { News } = require("../models/News");
const { Tags } = require("../models/Tags");
const { v4: uuidv4 } = require("uuid");
const { Keywords } = require("../models/Keywords");
// const tags = require("./tags");

const createNews = async (req, res) => {
  const { title, image, body, categories, tags, keywords } = req.body;

  let formattedCategories = await Promise.all(
    categories.map(async (el) => {
      let result = await Category.findOne({
        where: {
          name: el,
        },
      }).then((data) => {
        if (data === null) {
          return Category.create({
            id: uuidv4(),
            name: el,
          }).then((result) => {
            return result.dataValues;
          });
        } else {
          return data.dataValues;
        }
      });

      return result;
    })
  );
  let formattedTags = await Promise.all(
    tags.map(async (el) => {
      let result = await Tags.findOne({
        where: {
          name: el,
        },
      }).then((data) => {
        if (data === null) {
          return Tags.create({
            id: uuidv4(),
            name: el,
          }).then((result) => {
            return result.dataValues;
          });
        } else {
          return data.dataValues;
        }
      });

      return result;
    })
  );
  let formattedKeywords = await Promise.all(
    keywords.map(async (el) => {
      let result = await Keywords.findOne({
        where: {
          name: el,
        },
      }).then((data) => {
        if (data === null) {
          return Keywords.create({
            id: uuidv4(),
            name: el,
          }).then((result) => {
            return result.dataValues;
          });
        } else {
          return data.dataValues;
        }
      });

      return result;
    })
  );

  News.create({
    title: title,
    image: image,
    body: body,
    categories: formattedCategories,
    tags: formattedTags,
    keywords: formattedKeywords,
  })
    .then((data) => {
      return res.status(200).json({
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        status: 404,
      });
    });
};
const getNewsById = (req, res) => {
  const { news_id } = req.params;
  News.findOne({
    where: {
      id: news_id,
    },
  }).then((data) => {
    if (data === null) {
      return res.status(400).json({
        status: "400",
        message: "tidak ada news dengan id tersebut",
      });
    }
    return res.status(200).json({
      status: "200",
      data: data,
    });
  });
};
const updateNewsDataById = (req, res) => {
  const { news_id } = req.params;
  const { body } = req.body;

  News.update(
    {
      body: body,
    },
    { where: { id: news_id } }
  )
    .then(() => {
      return News.findOne({
        where: {
          id: news_id,
        },
      });
    })
    .then((response) => {
      if (response === null) {
        return res.status(400).json({
          status: "400",
          message: "tidak ada News dengan id tersebut yang bisa di update",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Berhasil update News",
        data: response,
      });
    });
};
const deleteNewsById = (req, res) => {
  const { news_id } = req.params;
  News.destroy({
    where: {
      id: news_id,
    },
  }).then((data) => {
    if (data === 0) {
      return res.status(400).json({
        status: 400,
        message: "Tidak berhasil menghapus news karena id tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Berhasil menghapus news",
    });
  });
};
const newsPagination = (req, res) => {
  const { page, perPage } = req.query;
  News.findAll({
    limit: Number(perPage * page),
  }).then((data) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    const result = data.slice(startIndex, endIndex);

    return res.status(200).json({
      status: 200,
      data: result,
      meta: {
        page: page,
        perPage: perPage,
        totalData: result.length,
        totalPage: Number(page),
      },
    });
  });
};
module.exports = {
  createNews,
  getNewsById,
  updateNewsDataById,
  deleteNewsById,
  newsPagination,
};
