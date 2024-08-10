// importando a lib
const mongoose = require("mongoose");
//  criando um esquema do banco de dados, dizendo qual vai ser
// a estrutura do sensor, dizendo que o nome é texto,
// distancia do tipo numero e a data atual criada automática
const sensorSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: {type: Date, default: Date.now},
});
// criando a váriavel Sensor
const Sensor = mongoose.model("Sensor", sensorSchema);
// exportando
module.exports = Sensor;
