// importando a lib
const mongoose = require("mongoose");
//  criando um esquema do banco de dados, dizendo qual vai ser
// a estrutura do sensor, dizendo que o nome é texto,
// distancia do tipo numero e a data atual criada automática
const markedSchema = new mongoose.Schema({
  temperature: Number,
  createdAt: {type: Date, default: Date.now},
  sensor: {type: mongoose.Types.ObjectId, ref: "Sensor"},
});
// criando a váriavel Sensor
const Marked = mongoose.model("Marked", markedSchema);
// exportando
module.exports = Marked;
