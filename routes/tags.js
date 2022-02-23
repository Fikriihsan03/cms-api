const { Tags } = require("../models/Tags");

const createTags = (req, res) => {
  const { name } = req.body;

  Tags.create({
    name: name,
  })
    .then((data) => {
      return res.status(200).json({
        status: "200",
        message: "Berhasil membuat Tags",
        data: data,
      });
    })
    .catch(() => {
      return res.status(400).json({
        status: "400",
        message: "gagal membuat Tags",
      });
    });
};

const getTagsById = (req, res) => {
  const { tags_id } = req.params;
  Tags.findOne({
    where: {
      id: tags_id,
    },
  }).then((data) => {
    if (data === null) {
      return res.status(400).json({
        status: "400",
        message: "tidak ada Tags dengan id tersebut",
      });
    }
    return res.status(200).json({
      status: "200",
      data: data,
    });
  });
};

const updateTagsById = (req, res) => {
  const { tags_id } = req.params;
  const { name } = req.body;

  Tags.update(
    {
      name: name,
    },
    { where: { id: tags_id } }
  )
    .then(() => {
      return Tags.findOne({
        where: {
          id: tags_id,
        },
      });
    })
    .then((response) => {
      if (response === null) {
        return res.status(400).json({
          status: "400",
          message: "tidak ada Tags dengan id tersebut yang bisa di update",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Berhasil update Tags",
        data: response,
      });
    });
};

const deleteTagsById = (req, res) => {
  const { tags_id } = req.params;
  Tags.destroy({
    where: {
      id: tags_id,
    },
  }).then((data) => {
    if (data === 0) {
      return res.status(400).json({
        status: 400,
        message: "Tidak berhasil menghapus Tags karena id tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Berhasil menghapus Tags",
    });
  });
};

const tagsPagination = (req, res) => {
  const { page, perPage } = req.query;
  Tags.findAll({
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
  createTags: createTags,
  getTagsById: getTagsById,
  updateTagsById: updateTagsById,
  deleteTagsById: deleteTagsById,
  tagsPagination: tagsPagination,
};
