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
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const { startDate, endDate } = req.query;

      const user = await UserModel.findOne({ 'player.id': id });

      if (!user) {
        res.status(404).json({ msg: 'Usuário não encontrado!' });
      }

      let query = { userId: user._id.toString() };

      if (startDate && endDate) {
        query.createdAt = {
          $gte: startDate,
          $lte: endDate,
        };
      }

      const clock = await ClockModel.find(query).sort({ createdAt: -1 });

      if (!clock) {
        return res.status(404).json({ msg: 'Clock não encontrado!' });
      }

      res.json(clock);
    } catch (err) {
      console.log(err);
    }
  },
  getByRange: async (req, res) => {
    try {
      const { id, range } = req.body;

      const user = await UserModel.findOne({ 'player.id': id });

      const clock = await ClockModel.find({
        userId: user._id.toString(),
        createdAt: {
          $gte: range[0],
          $lte: range[1],
        },
      }).sort({ createdAt: -1 });

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
