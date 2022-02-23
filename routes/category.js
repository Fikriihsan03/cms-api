const { Category } = require("../models/Category");
const { v4: uuidv4 } = require("uuid");
const createCategory = (req, res) => {
  const { name } = req.body;

  Category.create({
    id: uuidv4(),
    name: name,
  })
    .then((data) => {
      return res.status(200).json({
        status: "200",
        message: "Berhasil membuat category",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        status: "400",
        message: "gagal membuat category",
      });
    });
};

const getCategoryById = (req, res) => {
  const { category_id } = req.params;
  Category.findOne({
    where: {
      id: category_id,
    },
  }).then((data) => {
    if (data === null) {
      return res.status(400).json({
        status: "400",
        message: "tidak ada category dengan id tersebut",
      });
    }
    return res.status(200).json({
      status: "200",
      data: data,
    });
  });
};

const updateCategoryById = (req, res) => {
  const { category_id } = req.params;
  const { name } = req.body;

  Category.update(
    {
      name: name,
    },
    { where: { id: category_id } }
  )
    .then(() => {
      return Category.findOne({
        where: {
          id: category_id,
        },
      });
    })
    .then((response) => {
      if (response === null) {
        return res.status(400).json({
          status: "400",
          message: "tidak ada category dengan id tersebut yang bisa di update",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Berhasil update category",
        data: response,
      });
    });
};

const deleteCategoryById = (req, res) => {
  const { category_id } = req.params;
  Category.destroy({
    where: {
      id: category_id,
    },
  }).then((data) => {
    if (data === 0) {
      return res.status(400).json({
        status: 400,
        message: "Tidak berhasil menghapus category karena id tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Berhasil menghapus category",
    });
  });
};
const categoryPagination = (req, res) => {
  const { page, perPage } = req.query;
  Category.findAll({
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
  createCategory: createCategory,
  getCategoryById: getCategoryById,
  updateCategoryById: updateCategoryById,
  deleteCategoryById: deleteCategoryById,
  categoryPagination: categoryPagination,
};
