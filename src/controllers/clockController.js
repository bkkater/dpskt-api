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
      const { userId,hash,startAt } = req.body;

      await UserModel.findByIdAndUpdate(userId, {$set: {'player.statusClock': true}}, {new: true});

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
    // ID do player
    try {
      const id  = req.params.id;

      const user = await UserModel.findOne({ 'player.id': id });

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
      // pega o hash pelo parametro do front
      const { hash } = req.params;

      // acha
      const clock = await ClockModel.findOne({hash});

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
      // é pra pegar os parametros do front pelo body 
      const {hash,endAt,userId} = req.body;
      
      // pega o clock pelo hash
      const clock = await ClockModel.findOne({ hash });
      
      // se n achar da erro
      if (!clock) {
        res.status(404).json({ msg: 'Clock não encontrado!' });
      }

      // atualiza o status do player
      await UserModel.findByIdAndUpdate(userId, {$set: {'player.statusClock': false}},{new: true});

      // atualiza o endAt do clock pelo dado do front
      const updateService = await ClockModel.findByIdAndUpdate(
        clock._id.toString(), 
        {$set: {endAt}}
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
