// db.js
const { Sequelize, DataTypes } = require('sequelize');


// Conexão com PostgreSQL
const sequelize = new Sequelize('app_academia', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});


// Aluno
const Aluno = sequelize.define('Aluno', {
  nome: { type: DataTypes.STRING, allowNull: false },
  data_nascimento: { type: DataTypes.DATEONLY, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  telefone: { type: DataTypes.STRING },
  senha: { type: DataTypes.STRING, unique: true, allowNull: false }
}, { tableName: 'alunos', timestamps: false });

// Instrutor
const Instrutor = sequelize.define('Instrutor', {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  telefone: { type: DataTypes.STRING, unique: true, allowNull: false },
  senha: { type: DataTypes.STRING, unique: true, allowNull: false }
}, { tableName: 'instrutores', timestamps: false });

// Treino
const Treino = sequelize.define('Treino', {
  data_criacao: { type: DataTypes.DATEONLY, defaultValue: Sequelize.NOW },
  objetivo: { type: DataTypes.TEXT }
}, { tableName: 'treinos', timestamps: false });

// Plano
const Plano = sequelize.define('Plano', {
  nome: { type: DataTypes.STRING, allowNull: false },
  preco: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  duracao_meses: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'planos', timestamps: false });

// Matricula
const Matricula = sequelize.define('Matricula', {
  data_inicio: { type: DataTypes.DATEONLY, allowNull: false },
  data_fim: { type: DataTypes.DATEONLY }
}, { tableName: 'matriculas', timestamps: false });

// Local
const Local = sequelize.define('Local', {
  cidade: { type: DataTypes.STRING, allowNull: false },
  estado: { type: DataTypes.STRING },
  pais: { type: DataTypes.STRING, defaultValue: 'Brasil' }
}, { tableName: 'locais', timestamps: false });

// Academia
const Academia = sequelize.define('Academia', {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  senha_hash: { type: DataTypes.TEXT, allowNull: false },
  endereco: { type: DataTypes.TEXT, allowNull: false },
  criado_em: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
}, { tableName: 'academias', timestamps: false });

// Maquina
const Maquina = sequelize.define('Maquina', {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT },
  qr_code: { type: DataTypes.TEXT, unique: true, allowNull: false }
}, { tableName: 'maquinas', timestamps: false });

// Exercicio
const Exercicio = sequelize.define('Exercicio', {
  nome: { type: DataTypes.STRING, allowNull: false },
  tutorial_url: { type: DataTypes.TEXT },
  instrucoes: { type: DataTypes.TEXT, allowNull: false },
  beneficios: { type: DataTypes.TEXT, allowNull: false },
  sequencia: { type: DataTypes.TEXT }
}, { tableName: 'exercicios', timestamps: false });

// Treino_Exercicio (N:N)
const TreinoExercicio = sequelize.define('TreinoExercicio', {
  series: { type: DataTypes.INTEGER },
  repeticoes: { type: DataTypes.INTEGER },
  carga_kg: { type: DataTypes.DECIMAL(5,2) }
}, { tableName: 'treino_exercicio', timestamps: false });

// Avaliacoes_Fisicas
const AvaliacaoFisica = sequelize.define('AvaliacaoFisica', {
  data_avaliacao: { type: DataTypes.DATEONLY, defaultValue: Sequelize.NOW },
  peso_kg: { type: DataTypes.DECIMAL(5,2) },
  altura_m: { type: DataTypes.DECIMAL(3,2) },
  imc: { type: DataTypes.DECIMAL(5,2) },
  observacoes: { type: DataTypes.TEXT }
}, { tableName: 'avaliacoes_fisicas', timestamps: false });

// Pagamentos
const Pagamento = sequelize.define('Pagamento', {
  data_pagamento: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  metodo_pagamento: { 
    type: DataTypes.ENUM('pix', 'cartao', 'boleto'),
    allowNull: false 
  },
  status: {
    type: DataTypes.ENUM('pendente', 'pago', 'cancelado'),
    allowNull: false
  },
  valor_pago: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  codigo_transacao: { type: DataTypes.TEXT },
  observacoes: { type: DataTypes.TEXT }
}, { tableName: 'pagamentos', timestamps: false });

// Posts Timeline
const PostTimeline = sequelize.define('PostTimeline', {
  autor_tipo: { type: DataTypes.ENUM('sistema','instrutor'), allowNull: false },
  id_autor: { type: DataTypes.INTEGER },
  conteudo: { type: DataTypes.TEXT, allowNull: false },
  midia_url: { type: DataTypes.TEXT },
  data_postagem: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'posts_timeline', timestamps: false });

// Curtidas Post
const CurtidaPost = sequelize.define('CurtidaPost', {
  curtido_em: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
}, { tableName: 'curtidas_post', timestamps: false });

// ----------------- RELAÇÕES -----------------

Aluno.hasMany(Treino, { foreignKey: 'aluno_id' });
Treino.belongsTo(Aluno, { foreignKey: 'aluno_id' });

Instrutor.hasMany(Treino, { foreignKey: 'instrutor_id' });
Treino.belongsTo(Instrutor, { foreignKey: 'instrutor_id' });

Aluno.hasMany(Matricula, { foreignKey: 'aluno_id' });
Plano.hasMany(Matricula, { foreignKey: 'plano_id' });
Matricula.belongsTo(Aluno, { foreignKey: 'aluno_id' });
Matricula.belongsTo(Plano, { foreignKey: 'plano_id' });

Local.hasMany(Academia, { foreignKey: 'id_local' });
Academia.belongsTo(Local, { foreignKey: 'id_local' });

Academia.hasMany(Maquina, { foreignKey: 'id_academia', onDelete: 'CASCADE' });
Maquina.belongsTo(Academia, { foreignKey: 'id_academia' });

Maquina.hasMany(Exercicio, { foreignKey: 'id_maquina', onDelete: 'CASCADE' });
Exercicio.belongsTo(Maquina, { foreignKey: 'id_maquina' });

Treino.belongsToMany(Exercicio, { through: TreinoExercicio, foreignKey: 'treino_id' });
Exercicio.belongsToMany(Treino, { through: TreinoExercicio, foreignKey: 'exercicio_id' });

Aluno.hasMany(AvaliacaoFisica, { foreignKey: 'id_aluno' });
AvaliacaoFisica.belongsTo(Aluno, { foreignKey: 'id_aluno' });

Aluno.hasMany(Pagamento, { foreignKey: 'id_aluno', onDelete: 'CASCADE' });
Plano.hasMany(Pagamento, { foreignKey: 'id_plano' });
Pagamento.belongsTo(Aluno, { foreignKey: 'id_aluno' });
Pagamento.belongsTo(Plano, { foreignKey: 'id_plano' });

PostTimeline.hasMany(CurtidaPost, { foreignKey: 'id_post', onDelete: 'CASCADE' });
Aluno.hasMany(CurtidaPost, { foreignKey: 'id_aluno', onDelete: 'CASCADE' });
CurtidaPost.belongsTo(PostTimeline, { foreignKey: 'id_post' });
CurtidaPost.belongsTo(Aluno, { foreignKey: 'id_aluno' });

// Teste de conexão e sincronização
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao PostgreSQL com Sequelize');
    await sequelize.sync(); // cria a tabela se não existir
  } catch (error) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', error);
  }
})();

module.exports = {
  sequelize,
  Aluno, Instrutor, Treino, Plano, Matricula,
  Local, Academia, Maquina, Exercicio, TreinoExercicio,
  AvaliacaoFisica, Pagamento, PostTimeline, CurtidaPost
};

