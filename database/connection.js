// importando a biblioteca do mongoose
const mongoose = require("mongoose");
// pegando a informação do banco da pasta privada .env
const MONGO_URI = process.env.MONGO_URI;
// criando uma conexão com o banco
const connect = () => {
  // conectando na url
  mongoose.connect(MONGO_URI);
  // criando a variavel de conxão
  const connection = mongoose.connection;
  // se a conexão não der certo avisa no console
  connection.on("error", () => {
    console.log("Erro ao conectar com o mongoDB");
  });
  // se a conexão der certo ela avisa
  connection.on("open", () => {
    console.log("Conectado com o mongoDB");
  });
};
// iniciando a variável
connect();
