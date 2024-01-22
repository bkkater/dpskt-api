const ClockModel = require('../models/Clock');

const { User: UserModel } = require('../models/User');

const clockController = {
  create: async (req, res) => {
    try {
      const { userId, hash, startAt } = req.body;

      await UserModel.findByIdAndUpdate(userId, {
        $set: { 'player.statusClock': true },
      });

      const clock = {
        userId,
        hash,
        startAt,
      };

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
    try {
      const id = req.params.id;

      const user = await UserModel.findOne({ 'player.id': id });

      const clock = await ClockModel.find({ userId: user._id.toString() }).sort(
        { createdAt: -1 }
      );

      if (!clock) {
        res.status(404).json({ msg: 'Clock não encontrado!' });
      }

      res.json(clock);
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (req, res) => {
    try {
      const { hash } = req.params;

      const clock = await ClockModel.findOne({ hash });

      if (!clock) {
        res.status(404).json({ msg: 'Clock não encontrado!' });
      }

      await ClockModel.findByIdAndDelete(clock._id.toString());

      res.json({ msg: 'Clock deletado com sucesso!' });
    } catch (err) {
      console.log(err);
    }
  },
  update: async (req, res) => {
    try {
      const { hash, endAt, userId } = req.body;

      const clock = await ClockModel.findOne({ hash });

      if (!clock) {
        res.status(404).json({ msg: 'Clock não encontrado!' });
      }

      await UserModel.findByIdAndUpdate(userId, {
        $set: { 'player.statusClock': false },
      });

      const updateService = await ClockModel.findByIdAndUpdate(
        clock._id.toString(),
        { $set: { endAt: new Date(endAt) } },
        { new: true }
      );

      res
        .status(200)
        .json({ updateService, msg: 'Clock atualizado com sucesso!' });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = clockController;
