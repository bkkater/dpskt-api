const ClockModel = require('../models/Clock');
const { player: PlayerModel } = require('../models/Player');
const clockController = {
  create: async (req, res) => {
    try {
        const {
            startAt,
            endAt,
          } = req.body;
      
        const clock = {
            player: req.body,
            startAt,
            endAt,
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
