const { Player: PlayerModel } = require('../models/Player');

const playerController = {
  create: async (req, res) => {
    const {
      player: { id, name, role, isAdmin, statusClock },
      discordId,
    } = req.body;

    try {
      const player = {
        discordId,
        player: {
          id,
          name,
          role,
          isAdmin,
          statusClock,
        },
      };

      const response = await PlayerModel.create(player);

      res.status(201).json({ response, msg: 'Registro criado com sucesso!' });
    } catch (err) {
      console.log(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const players = await PlayerModel.find();

      res.json(players);
    } catch (err) {
      console.log(err);
    }
  },
  get: async (req, res) => {
    try {
      const discordId = req.params.id;

      const player = await PlayerModel.findOne({ discordId });

      if (!player) {
        res.status(404).json({ msg: 'Player não encontrado!' });
      }

      res.json(player);
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (req, res) => {
    try {
      const discordId = req.params.id;

      const player = await PlayerModel.findOne({ discordId });

      if (!player) {
        res.status(404).json({ msg: 'Player não encontrado!' });
      }

      const deleteService = await PlayerModel.findByIdAndDelete(
        player._id.toString()
      );

      res
        .status(200)
        .json({ deleteService, msg: 'Player excluido com sucesso' });
    } catch (err) {
      console.log(err);
    }
  },
  update: async (req, res) => {
    const {
      player: { id, name, role, isAdmin, statusClock },
    } = req.body;

    const discordId = req.params.id;
    const player = await PlayerModel.findOne({ discordId });

    if (!player) {
      res.status(404).json({ msg: 'Player não encontrado!' });
    }

    const playerData = {
      discordId,
      player: {
        id,
        name,
        role,
        isAdmin,
        statusClock,
      },
    };

    const updateService = await PlayerModel.findByIdAndUpdate(
      player._id.toString(),
      playerData
    );

    res
      .status(200)
      .json({ updateService, msg: 'Player atualizado com sucesso!' });
  },
};

module.exports = playerController;
