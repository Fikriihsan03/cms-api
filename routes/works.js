const { Works } = require("../models/Works");

const createWorks = (req, res) => {
  const { name, description, order, imageUrl, workUrl } = req.body;

  Works.create({
    name: name,
    description: description,
    order: order,
    imageurl: imageUrl,
    workurl: workUrl,
  })
    .then((data) => {
      return res.status(200).json({
        status: "200",
        message: "Berhasil membuat work",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        status: "400",
        message: "gagal membuat work",
      });
    });
};

const getWorksById = (req, res) => {
  const { works_id } = req.params;
  Works.findOne({
    where: {
      id: works_id,
    },
  }).then((data) => {
    if (data === null) {
      return res.status(400).json({
        status: "400",
        message: "tidak ada work dengan id tersebut",
      });
    }
    return res.status(200).json({
      status: "200",
      data: data,
    });
  });
};

const updateWorksDataById = (req, res) => {
  const { works_id } = req.params;
  const { name, description, order, imageUrl, workUrl } = req.body;

  Works.update(
    {
      name: name,
      description: description,
      order: order,
      imageUrl: imageUrl,
      workUrl: workUrl,
    },
    { where: { id: works_id } }
  )
    .then(() => {
      return Works.findOne({
        where: {
          id: works_id,
        },
      });
    })
    .then((response) => {
      if (response === null) {
        return res.status(400).json({
          status: "400",
          message: "tidak ada works dengan id tersebut yang bisa di update",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Berhasil update works",
        data: response,
      });
    });
};

const deleteWorksById = (req, res) => {
  const { works_id } = req.params;
  Works.destroy({
    where: {
      id: works_id,
    },
  }).then((data) => {
    if (data === 0) {
      return res.status(400).json({
        status: 400,
        message: "Tidak berhasil menghapus work karena id tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Berhasil menghapus work",
    });
  });
};

const worksPagination = (req, res) => {
  const { page, perPage } = req.query;
  Works.findAll({
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
  createWorks: createWorks,
  getWorksById: getWorksById,
  updateWorksDataById: updateWorksDataById,
  deleteWorksById: deleteWorksById,
  worksPagination: worksPagination,
};
