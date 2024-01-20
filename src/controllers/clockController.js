const ClockModel = require('../models/Clock');

const { User: UserModel } = require('../models/User');

const clockController = {
  create: async (req, res) => {
    try {
      const { _id } = req.body;

      const clock = {
        userId: _id,
        startAt: Date.now(),
      };

      const user = await UserModel.findById(_id);

      await UserModel.findByIdAndUpdate(_id, {
        player: { ...user.player, statusClock: true },
      });

      const response = await ClockModel.create(clock);

      res.status(201).json({ response, msg: 'Registro criado com sucesso!' });
    } catch (err) {
      console.log(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const clocks = await ClockModel.find();

      res.json(clocks);
    } catch (err) {
      console.log(err);
    }
  },
  get: async (req, res) => {
    // ID do player
    try {
      const discordId = req.params.id;

      const clock = await ClockModel.findOne({ discordId });

      if (!clock) {
        res.status(404).json({ msg: 'Clock não encontrado!' });
      }

      res.json(clock);
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (req, res) => {
    // ID do banco
    try {
      const discordId = req.params.id;

      const clock = await ClockModel.findOne({ discordId });

      if (!clock) {
        res.status(404).json({ msg: 'Clock não encontrado!' });
      }

      const deleteService = await ClockModel.findByIdAndDelete(
        clock._id.toString()
      );

      res.json({ msg: 'Clock deletado com sucesso!' });
    } catch (err) {
      console.log(err);
    }
  },
  update: async (req, res) => {
    // ID do banco
    try {
      const discordId = req.params.id;

      const clock = await ClockModel.findOne({ discordId });

      if (!clock) {
        res.status(404).json({ msg: 'Clock não encontrado!' });
      }

      const updateService = await ClockModel.findByIdAndUpdate(
        clock._id.toString(),
        req.body
      );

      res.json({ msg: 'Clock atualizado com sucesso!' });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = clockController;
