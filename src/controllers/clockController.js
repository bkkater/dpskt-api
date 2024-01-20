const ClockModel = require('../models/Clock');
const { listTimeZones } = require('timezone-support')
const { parseFromTimeZone, formatToTimeZone } = require('date-fns-timezone')
 
// List canonical time zone names: [ 'Africa/Abidjan', ... ]
const timeZones = listTimeZones()

const { User: UserModel } = require('../models/User');
const { addHours } = require('date-fns');
const format = ''
const clockController = {
  create: async (req, res) => {
    try {
      const { _id } = req.body;
      
      const clock = {
        userId: _id,
        startAt: new Date(formatToTimeZone(addHours(Date.now(),-1),format,{timeZone: 'America/Sao_Paulo'})),
        endAt: null,
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
      const { id } = req.params;
      const user = await UserModel.findOne({ id });
      const clock = await ClockModel.find( {userId: user._id.toString()}).sort({ createdAt: -1});

      if (!clock) {
        res.status(404).json({ msg: 'Clock não encontrado!' });
      }
      res.json(clock);
    } catch (err) {
      console.log(err);
    }
  },
  delete: async (req, res) => {
    // ID do banco do clock
    try {
      const { id } = req.params;
      const clock = await ClockModel.findById(id);

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
      // é pra pegar o id do player vem do front
      const { id } = req.params;
      // acha o player pelo id do player
      const user = await UserModel.findOne({ id });
      // acha o ultimo clock do player
      const clock = await ClockModel.findOne( {userId: user._id.toString()}).sort({ createdAt: -1});

      // se não achar o clock
      if (!clock) {
        res.status(404).json({ msg: 'Clock não encontrado!' });
      }

      await UserModel.findByIdAndUpdate(user._id, {
        player: { ...user.player, statusClock: false },
      });

      const clockData = {
        userId: user._id,
        startAt: clock.startAt,
        endAt: new Date(formatToTimeZone(addHours(Date.now(),-1),format,{timeZone: 'America/Sao_Paulo'})),
      };

      const updateService = await ClockModel.findByIdAndUpdate(
        clock._id.toString(), 
        clockData
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
