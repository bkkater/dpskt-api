const { User: UserModel } = require('../models/User');

const userController = {
  create: async (req, res) => {
    const {
      player: { id, name, corporation, role, isAdmin, statusClock, joinedAt },
      discordId,
    } = req.body;

    try {
      const user = {
        discordId,
        player: {
          id,
          name,
          corporation,
          role,
          isAdmin,
          statusClock,
          joinedAt,
        },
      };

      const response = await UserModel.create(user);

      res.status(201).json({ response, msg: 'Registro criado com sucesso!' });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ msg: 'Id já cadastrado!' });
      }
      console.log(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await UserModel.find();

      const entries = await UserModel.countDocuments();

      const onlineClocks = await UserModel.find({ 'player.statusClock': true });

      res.json({ users, entries, onlineClocks: onlineClocks.length });
    } catch (err) {
      console.log(err);
    }
  },
  get: async (req, res) => {
    try {
      const discordId = req.params.id;

      const user = await UserModel.findOne({ discordId });

      if (!user) {
        return res.status(404).json({ msg: 'Player não encontrado!' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);

      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .json({ msg: 'Erro de validação nos dados do jogador.' });
      }

      res.status(500).json({ msg: 'Erro interno do servidor' });
    }
  },
  delete: async (req, res) => {
    try {
      const playerId = req.params.id;

      const user = await UserModel.findOne({ 'player.id': playerId });

      if (!user) {
        res.status(404).json({ msg: 'Player não encontrado!' });
      }

      const deleteService = await UserModel.findByIdAndDelete(
        user._id.toString()
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
      player: { id, name, role, isAdmin, statusClock, corporation, joinedAt },
      discordId,
    } = req.body;

    const user = await UserModel.findOne({ discordId });

    if (!user) {
      res.status(404).json({ msg: 'Player não encontrado!' });
    }

    const userData = {
      discordId,
      player: {
        id,
        name,
        corporation,
        role,
        isAdmin,
        statusClock,
        joinedAt,
      },
    };

    const update = await UserModel.findByIdAndUpdate(
      user._id.toString(),
      userData,
      { $set: { ...userData } },
      { new: true }
    );

    res.status(200).json({ update, msg: 'Player atualizado com sucesso!' });
  },
};

module.exports = userController;
