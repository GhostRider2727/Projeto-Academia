const Treino = require("../models/Treino");
const Exercicio = require("../models/Exercicio");

class TreinoController {
  static listar(req, res) {
  
    const supino = new Exercicio("Supino reto", "Peito", 4, 12, "20kg");
    const agachamento = new Exercicio("Agachamento livre", "Pernas", 5, 10, "40kg");
    const remada = new Exercicio("Remada curvada", "Costas", 4, 12, "30kg");
    const desenvolvimento = new Exercicio("Desenvolvimento militar", "Ombros", 4, 10, "15kg");
    const rosca = new Exercicio("Rosca direta", "Bíceps", 3, 12, "10kg");
    const triceps = new Exercicio("Tríceps testa", "Tríceps", 3, 12, "12kg");
    const legpress = new Exercicio("Leg press", "Pernas", 4, 12, "80kg");
    const elevacao = new Exercicio("Elevação lateral", "Ombros", 3, 15, "6kg");
    const puxada = new Exercicio("Puxada frontal", "Costas", 4, 10, "25kg");
    const flexao = new Exercicio("Flexão de braço", "Peito", 3, 20, "Peso corporal");

    const treinos = [
      new Treino(1, [supino, rosca, triceps]),
      new Treino(2, [agachamento, legpress, flexao]),
      new Treino(3, [remada, puxada, desenvolvimento]),
      new Treino(4, [supino, agachamento, flexao]),
      new Treino(5, [rosca, triceps, desenvolvimento]),
      new Treino(6, [remada, supino, puxada]),
      new Treino(7, [legpress, agachamento, elevacao]),
      new Treino(8, [supino, rosca, puxada]),
      new Treino(9, [flexao, desenvolvimento, remada]),
      new Treino(10, [agachamento, triceps, legpress]),
    ];

    res.json(treinos);
  }
}

module.exports = TreinoController;
