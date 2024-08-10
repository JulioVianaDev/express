// importando a biblioteca de rotas
const router = require("express").Router();
// importando o controlador
const AuthController = require("../controllers/authController");
// rota para checar se está funcionando
router.post("/", AuthController.init);
// exportando a rota
module.exports = router;
