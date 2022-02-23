const { Teams } = require("../models/Teams");

const createTeams = (req, res) => {
  const { name, position, order, imageUrl, socialMedia } = req.body;

  Teams.create({
    name: name,
    position: position,
    order: order,
    imageurl: imageUrl,
    socialmedia: socialMedia,
  })
    .then((data) => {
      return res.status(200).json({
        status: "200",
        message: "Berhasil membuat team",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        status: "400",
        message: "gagal membuat team",
      });
    });
};

const getTeamsById = (req, res) => {
  const { team_id } = req.params;
  Teams.findOne({
    where: {
      id: team_id,
    },
  }).then((data) => {
    if (data === null) {
      return res.status(400).json({
        status: "400",
        message: "tidak ada Team dengan id tersebut",
      });
    }
    return res.status(200).json({
      status: "200",
      data: data,
    });
  });
};

const updateTeamsDataById = (req, res) => {
  const { team_id } = req.params;
  const { name, position, order, imageUrl, socialMedia } = req.body;

  Teams.update(
    {
      name: name,
      position: position,
      order: order,
      imageUrl: imageUrl,
      socialMedia: socialMedia,
    },
    { where: { id: team_id } }
  )
    .then(() => {
      return Teams.findOne({
        where: {
          id: team_id,
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

const deleteTeamById = (req, res) => {
  const { team_id } = req.params;
  Teams.destroy({
    where: {
      id: team_id,
    },
  }).then((data) => {
    if (data === 0) {
      return res.status(400).json({
        status: 400,
        message: "Tidak berhasil menghapus Team karena id tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Berhasil menghapus Team",
    });
  });
};
const teamsPagination = (req, res) => {
  const { page, perPage } = req.query;
  Teams.findAll({
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
  createTeams: createTeams,
  getTeamsById: getTeamsById,
  updateTeamsDataById: updateTeamsDataById,
  deleteTeamById: deleteTeamById,
  teamsPagination: teamsPagination,
};
