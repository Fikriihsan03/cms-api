const { Pages } = require("../models/Pages");

const createPages = (req, res) => {
  const { title, body, keywords, image, slug } = req.body;

  Pages.create({
    title: title,
    body: body,
    keywords: keywords,
    image: image,
    slug: slug,
  })

    .then((data) => {
      return res.status(200).json({
        status: "200",
        message: "Berhasil membuat page",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        status: "400",
        message: "gagal membuat page",
      });
    });
};

const getPagesById = (req, res) => {
  const { page_id } = req.params;
  Pages.findOne({
    where: {
      id: page_id,
    },
  }).then((data) => {
    if (data === null) {
      return res.status(400).json({
        status: "400",
        message: "tidak ada page dengan id tersebut",
      });
    }
    return res.status(200).json({
      status: "200",
      data: data,
    });
  });
};

const updatePagesDataById = (req, res) => {
  const { page_id } = req.params;
  const { title, body, keywords, image } = req.body;

  Pages.update(
    {
      title: title,
      body: body,
      keywords: keywords,
      image: image,
    },
    { where: { id: page_id } }
  )
    .then(() => {
      return Pages.findOne({
        where: {
          id: page_id,
        },
      });
    })
    .then((response) => {
      if (response === null) {
        return res.status(400).json({
          status: "400",
          message: "tidak ada Pages dengan id tersebut yang bisa di update",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Berhasil update Pages",
        data: response,
      });
    });
};

const deletePagesById = (req, res) => {
  const { page_id } = req.params;
  Pages.destroy({
    where: {
      id: page_id,
    },
  }).then((data) => {
    if (data === 0) {
      return res.status(400).json({
        status: 400,
        message: "Tidak berhasil menghapus page karena id tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Berhasil menghapus page",
    });
  });
};

const pagesPagination = (req, res) => {
  const { page, perPage } = req.query;
  Pages.findAll({
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
  createPages: createPages,
  getPagesById: getPagesById,
  updatePagesDataById: updatePagesDataById,
  deletePagesById: deletePagesById,
  pagesPagination: pagesPagination,
};
