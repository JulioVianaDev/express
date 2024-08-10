module.exports = class AuthController {
  // sempre conferindo se está funcionando
  static async init(req, res) {
    const {password} = req.body;
    if (password !== "sensores") {
      return res.status(500).json({message: "erro", success: false});
    }
    res.status(200).json({message: "Acesso aprovado", success: true});
  }
};
