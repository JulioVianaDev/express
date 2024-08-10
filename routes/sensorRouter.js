// importando a biblioteca de rotas
const router = require("express").Router();
// importando o controlador
const SensorController = require("../controllers/sensorController");
// rota para checar se está funcionando
router.get("/", SensorController.init);
// rota para criar o sensor
router.post("/create", SensorController.CreateSensor);
router.post("/acesso", SensorController.SensorRegister);
router.post("/keep-alive", SensorController.keepAlive);
router.get("/all", SensorController.listSensor);
router.post("/filter", SensorController.filterSensorsByDate);

router.get(
  "/sensors-with-keep-alive",
  SensorController.listSensorWithKeepAlive
);
router.get(
  "/sensors-with-temperature/:sensorId",
  SensorController.listSensorWithTemperature
);
router.delete("/:sensorId", SensorController.deleteSensor);

// exportando a rota
module.exports = router;
