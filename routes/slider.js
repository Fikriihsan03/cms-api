const { Slider } = require("../models/Slider");
// const { v4: uuidv4 } = require("uuid");

const createSlider = (req, res) => {
  const { name, description, order, imageUrl } = req.body;

  Slider.create({
    name: name,
    description: description,
    order: order,
    imageurl: imageUrl,
  })
    .then((data) => {
      return res.status(200).json({
        status: "200",
        message: "Berhasil membuat slider",
        data: data,
      });
    })
    .catch(() => {
      return res.status(400).json({
        status: "400",
        message: "gagal membuat Slider",
      });
    });
};
const getSliderDetailById = (req, res) => {
  const { slider_id } = req.params;
  Slider.findOne({
    where: {
      id: slider_id,
    },
  }).then((data) => {
    if (data === null) {
      return res.status(400).json({
        status: "400",
        message: "tidak ada slider dengan id tersebut",
      });
    }
    return res.status(200).json({
      status: "200",
      data: data,
    });
  });
};
const updateSliderDetailById = (req, res) => {
  const { slider_id } = req.params;
  const { name, description, order, imageUrl } = req.body;

  Slider.update(
    {
      name: name,
      description: description,
      order: order,
      imageUrl: imageUrl,
    },
    { where: { id: slider_id } }
  )
    .then(() => {
      return Slider.findOne({
        where: {
          id: slider_id,
        },
      });
    })
    .then((response) => {
      if (response === null) {
        return res.status(400).json({
          status: "400",
          message: "tidak ada slider dengan id tersebut yang bisa di update",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Berhasil update slider",
        data: response,
      });
    });
};
const deleteSliderById = (req, res) => {
  const { slider_id } = req.params;
  Slider.destroy({
    where: {
      id: slider_id,
    },
  }).then((data) => {
    if (data === 0) {
      return res.status(400).json({
        status: 400,
        message: "Tidak berhasil menghapus slider karena id tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Berhasil menghapus slider",
    });
  });
};
const sliderPagination = (req, res) => {
  const { page, perPage } = req.query;
  Slider.findAll({
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
  createSlider: createSlider,
  getSliderDetailById: getSliderDetailById,
  updateSliderDetailById: updateSliderDetailById,
  deleteSliderById: deleteSliderById,
  sliderPagination: sliderPagination,
};
