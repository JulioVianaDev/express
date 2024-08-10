// importando a biblioteca de app
const express = require("express");
// importando biblioteca de permissão
const cors = require("cors");
// criando o backend
const app = express();
// criando a variável da porta
const port = 4444;
// importando a váriavel da rota de sensores
const SensorRouter = require("./routes/sensorRouter");
const AuthRouter = require("./routes/authRouter");
// importando as configurações do de privacidade
require("dotenv").config();
// usando a proteção de rede
app.use(cors());
// permitindo comunicação com jsons
app.use(express.json());
// usando a rota de sensor no endereço /sensor
app.use("/sensors", SensorRouter);
app.use("/auth", AuthRouter);
// criando a rota de api
app.get("/api", (req, res) => {
  const response = {message: "success"};
  res.json(response);
});
app.get("/", (req, res) => {
  const response = {message: "bem vindo ao sistema"};
  res.json(response);
});
// fazendo o app rodar na porta escolhida e dizendo aonde ele está rodando
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// executando a conexão do banco de dados
require("./database/connection");
module.exports = app;
