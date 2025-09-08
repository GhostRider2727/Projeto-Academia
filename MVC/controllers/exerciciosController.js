const Exercicio = require("../models/Exercicio");

class ExercicioController {
  static listar(req, res) {

    const exercicios = [
      new Exercicio("Supino reto", "Peito", 4, 12, "20kg"),
      new Exercicio("Agachamento livre", "Pernas", 5, 10, "40kg"),
      new Exercicio("Remada curvada", "Costas", 4, 12, "30kg"),
      new Exercicio("Desenvolvimento militar", "Ombros", 4, 10, "15kg"),
      new Exercicio("Rosca direta", "Bíceps", 3, 12, "10kg"),
      new Exercicio("Tríceps testa", "Tríceps", 3, 12, "12kg"),
      new Exercicio("Leg press", "Pernas", 4, 12, "80kg"),
      new Exercicio("Elevação lateral", "Ombros", 3, 15, "6kg"),
      new Exercicio("Puxada frontal", "Costas", 4, 10, "25kg"),
      new Exercicio("Flexão de braço", "Peito", 3, 20, "Peso corporal"),
    ];

    res.json(exercicios);
  }
}

module.exports = ExercicioController;