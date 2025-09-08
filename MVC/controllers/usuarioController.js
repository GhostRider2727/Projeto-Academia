
const Usuario = require("../models/usuario");

class UsuarioController {
  static listar(req, res) {
    
    const usuarios = [
      new Usuario("João Silva", "joao@email.com", "123456"),
      new Usuario("Maria Oliveira", "maria@email.com", "123456"),
      new Usuario("Carlos Souza", "carlos@email.com", "123456"),
      new Usuario("Ana Costa", "ana@email.com", "123456"),
      new Usuario("Pedro Santos", "pedro@email.com", "123456"),
      new Usuario("Juliana Lima", "juliana@email.com", "123456"),
      new Usuario("Felipe Almeida", "felipe@email.com", "123456"),
      new Usuario("Beatriz Martins", "bia@email.com", "123456"),
      new Usuario("Lucas Rocha", "lucas@email.com", "123456"),
      new Usuario("Camila Fernandes", "camila@email.com", "123456"),
    ];

    res.json(usuarios);
  }
}

module.exports = UsuarioController;
