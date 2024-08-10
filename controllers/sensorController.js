// importando o modelo do banco de dados
const Sensor = require("../models/sensor");
const Marked = require("../models/marked");
const KeepAlive = require("../models/keepAlive");
// exportando o controller do sensor
module.exports = class SensorController {
  // sempre conferindo se está funcionando
  static async init(req, res) {
    res.send({message: "funcionando"});
  }
  // Sempre que ele receber um sinal dizendo que o sensor está ativado
  // ele irá gravar no banco de dados as informações recebidas
  static async CreateSensor(req, res) {
    // recebe o nome e a distância
    const {name, description} = req.body;
    // cria um sensor novo para o banco de dados
    const sensor = new Sensor({
      name,
      description,
    });
    // tenta salvar, caso salve ele irá salvar o projeto no banco
    try {
      await sensor.save();
      // depois de salvar envia uma resposta para o esp8266
      res.status(201).json({
        message: "Sensor criado com sucesso",
        sensor: sensor,
        success: true,
      });
    } catch (error) {
      console.log("error", error);
      // caso ele ache um erro ele envia uma mensagem dizendo que deu errado
      res.status(500).json({
        message:
          "Ocorreu um erro ao cadastrar o dado do sensor, tente novamente mais tarde",
        success: false,
      });
    }
  }

  static async SensorRegister(req, res) {
    const {sensorId, temperature} = req.body;

    try {
      const sensor = await Sensor.findById(sensorId);
      if (!sensor) {
        return res.status(404).json({message: "Sensor não cadastrado"});
      }
      const marked = new Marked({temperature, sensor});
      await marked.save();
      res.status(201).json({message: "Temperatura registrada", sensor: sensor});
    } catch (error) {
      res.status(500).json({
        message:
          "Ocorreu um erro ao cadastrar o dado do sensor, tente novamente mais tarde",
      });
    }
  }

  static async deleteSensor(req, res) {
    const {sensorId} = req.params;

    try {
      const sensor = await Sensor.findByIdAndDelete(sensorId);
      if (!sensor) {
        return res.status(404).json({message: "Sensor não encontrado"});
      }
      res
        .status(200)
        .json({message: "Sensor deletado com sucesso", success: true});
    } catch (error) {
      res.status(500).json({
        message:
          "Ocorreu um erro ao deletar o sensor, tente novamente mais tarde",
        success: false,
      });
    }
  }

  static async keepAlive(req, res) {
    try {
      const {sensorId} = req.body;

      const sensor = await Sensor.findById(sensorId);
      if (!sensor) {
        return res.status(404).json({message: "Sensor não cadastrado"});
      }

      const keepAlive = new KeepAlive({sensor});
      await keepAlive.save();
      return res.status(201).json({message: "Sensor ativo"});
    } catch (error) {
      res.status(500).json({
        message:
          "Ocorreu um erro ao cadastrar o dado do sensor, tente novamente mais tarde",
      });
    }
  }
  static async listSensor(req, res) {
    try {
      const sensors = await Sensor.find({});

      return res.json({sensors});
    } catch (error) {
      res.status(500).json({
        message:
          "Ocorreu um erro ao cadastrar o dado do sensor, tente novamente mais tarde",
      });
    }
  }
  static async listSensorWithKeepAlive(req, res) {
    try {
      const keepAlives = await KeepAlive.find({}).populate("sensor");

      return res.json({keepAlives});
    } catch (error) {
      res.status(500).json({
        message:
          "Ocorreu um erro ao cadastrar o dado do sensor, tente novamente mais tarde",
      });
    }
  }
  static async listSensorWithTemperature(req, res) {
    const {sensorId} = req.params;

    try {
      const temperatures = await Marked.find({sensor: sensorId}).populate(
        "sensor"
      );

      return res.json({temperatures});
    } catch (error) {
      res.status(500).json({
        message:
          "Ocorreu um erro ao buscar os dados do sensor, tente novamente mais tarde",
      });
    }
  }
  static async filterSensorsByDate(req, res) {
    const {startDate, endDate} = req.body;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({message: "Por favor, forneça ambas as datas de início e fim."});
    }

    try {
      // Parse the start date and end date
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Adjust the end date to include the full day
      end.setHours(23, 59, 59, 999);

      // Debugging: Log the start and end dates
      console.log(`Filtering sensors between ${start} and ${end}`);

      // Find sensors within the date range
      const sensors = await Sensor.find({
        createdAt: {
          $gte: start,
          $lte: end,
        },
      });

      // Debugging: Log the results
      console.log(`Found ${sensors.length} sensors`);

      return res.json({sensors});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({
        message:
          "Ocorreu um erro ao buscar os sensores, tente novamente mais tarde",
      });
    }
  }
};
