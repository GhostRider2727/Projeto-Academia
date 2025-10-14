
const Usuario = require("../models/usuario");

class UsuarioController {
  static listar(req, res) {
    
    const usuarios = [
      new Usuario(1, "Alice", "alice@email.com", "123456"),
    ];

    res.json(usuarios);
  }
}

module.exports = UsuarioController;
