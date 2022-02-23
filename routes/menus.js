const { Menu } = require("../models/Menu");

const createMenu = (req, res) => {
  const { name, url, order, parentid } = req.body;

  Menu.create({
    name: name,
    url: url,
    order: order,
    parentid: parentid,
  })
    .then((data) => {
      return res.status(200).json({
        status: "200",
        message: "Berhasil membuat menu",
        data: {
          name: data.name,
          url: data.url,
          order: data.order,
          parentId: data.parentid,
          subMenus: [],
        },
      });
    })
    .catch(() => {
      return res.status(400).json({
        status: "400",
        message: "gagal membuat menu",
      });
    });
};

const getDetailMenuById = (req, res) => {
  const { menus_id } = req.params;
  Menu.findOne({
    where: {
      id: menus_id,
    },
  }).then((data) => {
    if (data === null) {
      return res.status(400).json({
        status: "400",
        message: "tidak ada menu dengan id tersebut",
      });
    }
    return res.status(200).json({
      status: "200",
      data: {
        name: data.name,
        url: data.url,
        order: data.order,
        parentId: data.parentid,
        subMenus: [],
      },
    });
  });
};

const updateDetailMenuById = (req, res) => {
  const { menus_id } = req.params;
  const { name, url, parentId } = req.body;

  Menu.update(
    {
      name: name,
      url: url,
      parentId: parentId,
    },
    { where: { id: menus_id } }
  )
    .then(() => {
      return Menu.findOne({
        where: {
          id: menus_id,
        },
      });
    })
    .then((data) => {
      if (data === null) {
        return res.status(400).json({
          status: "400",
          message: "tidak ada menu dengan id tersebut yang bisa di update",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Berhasil update menu",
        data: {
          name: data.name,
          url: data.url,
          order: data.order,
          parentId: data.parentid,
          subMenus: [],
        },
      });
    });
};
const deleteMenuById = (req, res) => {
  const { menus_id } = req.params;
  Menu.destroy({
    where: {
      id: menus_id,
    },
  }).then((data) => {
    if (data === 0) {
      return res.status(400).json({
        status: 400,
        message: "Tidak berhasil menghapus menu karena id tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Berhasil menghapus menu",
    });
  });
};

module.exports = {
  createMenu: createMenu,
  getDetailMenuById: getDetailMenuById,
  updateDetailMenuById: updateDetailMenuById,
  deleteMenuById: deleteMenuById,
};
