const { User: UserModel } = require('../models/User');

const userController = {
  create: async (req, res) => {
    const {
      player: { id, name, corporation, role, isAdmin, statusClock, joinedAt},
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

      res.json({ users, entries, onlineClocks: onlineClocks.length});
    } catch (err) {
      console.log(err);
    }
  },
  get: async (req, res) => {
    try {
      const discordId = req.params.id;

      const user = await UserModel.findOne({ discordId });

      if (!user) {
        res.status(404).json({ msg: 'Player não encontrado!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
    }
  },
  getByQueryParm: async (req, res) => {
    try{
      let queryParam;

      if (req.query.name) {
        queryParam = { 'player.name': new RegExp(req.query.name, 'i')};
      } else if (req.query.id) {
        queryParam = { 'player.id': req.query.id };
      } else {
        return res.status(400).json({ msg: 'Parametro não encontrado! Necessário passar id ou nome' });
      }

      const users = await UserModel.find(queryParam);

      if (!users || users.length === 0) {
        return res.status(404).json({ msg: 'Nenhum usuário encontrado' });
      }

      res.json(users);
    }
    catch(err){
      console.log(err);
    }
  },
  delete: async (req, res) => {
    try {
      const discordId = req.params.id;

      const user = await UserModel.findOne({ discordId });

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
      player: { id, name, role, isAdmin, statusClock, corporation, joinedAt},
    } = req.body;

    const discordId = req.params.id;
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

    const updateService = await UserModel.findByIdAndUpdate(
      user._id.toString(),
      userData
    );

    res
      .status(200)
      .json({ updateService, msg: 'Player atualizado com sucesso!' });
  },
};

module.exports = userController;
