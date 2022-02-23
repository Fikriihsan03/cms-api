const { Keywords } = require("../models/Keywords");

const createKeywords = (req, res) => {
  const { name } = req.body;

  Keywords.create({
    name: name,
  })
    .then((data) => {
      return res.status(200).json({
        status: "200",
        message: "Berhasil membuat Keywords",
        data: data,
      });
    })
    .catch(() => {
      return res.status(400).json({
        status: "400",
        message: "gagal membuat Keywords",
      });
    });
};

const getKeywordsById = (req, res) => {
  const { keyword_id } = req.params;
  Keywords.findOne({
    where: {
      id: keyword_id,
    },
  }).then((data) => {
    if (data === null) {
      return res.status(400).json({
        status: "400",
        message: "tidak ada Keywords dengan id tersebut",
      });
    }
    return res.status(200).json({
      status: "200",
      data: data,
    });
  });
};

const updateKeywordsById = (req, res) => {
  const { keyword_id } = req.params;
  const { name } = req.body;

  Keywords.update(
    {
      name: name,
    },
    { where: { id: keyword_id } }
  )
    .then(() => {
      return Keywords.findOne({
        where: {
          id: keyword_id,
        },
      });
    })
    .then((response) => {
      if (response === null) {
        return res.status(400).json({
          status: "400",
          message: "tidak ada Keywords dengan id tersebut yang bisa di update",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Berhasil update Keywords",
        data: response,
      });
    });
};

const deleteKeywordsById = (req, res) => {
  const { keyword_id } = req.params;
  Keywords.destroy({
    where: {
      id: keyword_id,
    },
  }).then((data) => {
    if (data === 0) {
      return res.status(400).json({
        status: 400,
        message: "Tidak berhasil menghapus Keywords karena id tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Berhasil menghapus Keywords",
    });
  });
};

const keywordsPagination = (req, res) => {
  const { page, perPage } = req.query;
  Keywords.findAll({
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
  createKeywords: createKeywords,
  getKeywordsById: getKeywordsById,
  updateKeywordsById: updateKeywordsById,
  deleteKeywordsById: deleteKeywordsById,
  keywordsPagination: keywordsPagination,
};
