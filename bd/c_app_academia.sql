CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(15),
	senha VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE instrutores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
	telefone VARCHAR(15)UNIQUE NOT NULL,
	senha VARCHAR(15) UNIQUE NOT NULL
);

CREATE TABLE treinos (
    id SERIAL PRIMARY KEY,
    aluno_id INT REFERENCES alunos(id),
    instrutor_id INT REFERENCES instrutores(id),
    data_criacao DATE NOT NULL DEFAULT CURRENT_DATE,
    objetivo TEXT
);


CREATE TABLE planos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    duracao_meses INT NOT NULL
);


CREATE TABLE matriculas (
    id SERIAL PRIMARY KEY,
    aluno_id INT REFERENCES alunos(id),
    plano_id INT REFERENCES planos(id),
    data_inicio DATE NOT NULL,
    data_fim DATE
);

CREATE TABLE locais (
    id SERIAL PRIMARY KEY,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(100),
    pais VARCHAR(100) DEFAULT 'Brasil'
);

CREATE TABLE academias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL,
    endereco TEXT NOT NULL,
    id_local INT REFERENCES locais(id),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE maquinas (
    id SERIAL PRIMARY KEY,
    id_academia INT REFERENCES academias(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    qr_code TEXT UNIQUE NOT NULL 
);



CREATE TABLE exercicios (
    id SERIAL PRIMARY KEY,
    id_maquina INT REFERENCES maquinas(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    tutorial_url TEXT,  
    instrucoes TEXT NOT NULL,
    beneficios TEXT NOT NULL,
    sequencia TEXT 
);



CREATE TABLE treino_exercicio (
    treino_id INT REFERENCES treinos(id),
    exercicio_id INT REFERENCES exercicios(id),
    series INT,
    repeticoes INT,
    carga_kg DECIMAL(5,2),
    PRIMARY KEY (treino_id, exercicio_id)
);




CREATE TABLE avaliacoes_fisicas (
    id SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES alunos(id),
    data_avaliacao DATE DEFAULT CURRENT_DATE,
    peso_kg NUMERIC(5,2),
    altura_m NUMERIC(3,2),
    imc NUMERIC(5,2),
    observacoes TEXT
);


CREATE TABLE pagamentos (
    id SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES alunos(id) ON DELETE CASCADE,
    id_plano INT REFERENCES planos(id),
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo_pagamento VARCHAR(20) NOT NULL CHECK (metodo_pagamento IN ('pix', 'cartao', 'boleto')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('pendente', 'pago', 'cancelado')),
    valor_pago NUMERIC(10,2) NOT NULL,
    codigo_transacao TEXT,
    observacoes TEXT
);



CREATE TABLE posts_timeline (
    id SERIAL PRIMARY KEY,
    autor_tipo VARCHAR(20) NOT NULL CHECK (autor_tipo IN ('sistema', 'instrutor')),
    id_autor INT,
    conteudo TEXT NOT NULL,
    midia_url TEXT,
    data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
);



CREATE TABLE curtidas_post (
    id SERIAL PRIMARY KEY,
    id_post INT REFERENCES posts_timeline(id) ON DELETE CASCADE,
    id_aluno INT REFERENCES alunos(id) ON DELETE CASCADE,
    curtido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(id_post, id_aluno)
);






INSERT INTO alunos (nome, data_nascimento, email, telefone, senha) VALUES (
    'Renan Pinto', 
    '1979-12-14', 
    'joao-guilhermepinto@ig.com.br', 
    '+556111378103', 
    ')adDMwD7r5'
);

INSERT INTO alunos (nome, data_nascimento, email, telefone, senha) VALUES (
    'Ana Pinto', 
    '1972-06-09', 
    'aragaokaique@duarte.com', 
    '0500 991 6696', 
    'J1PD(fdm%s'
);

INSERT INTO alunos (nome, data_nascimento, email, telefone, senha) VALUES (
    'Bryan da Rosa', 
    '2006-11-10', 
    'maria-sophia03@alves.br', 
    '+553100830004', 
    'cy8#Vtgza)'
);

ALTER TABLE alunos
ALTER COLUMN telefone TYPE VARCHAR(50);

ALTER TABLE instrutores
ALTER COLUMN telefone TYPE VARCHAR(50);


INSERT INTO alunos (nome, data_nascimento, email, telefone, senha) VALUES
('Maria Silva', '1990-05-15', 'maria.silva@email.com', '(11) 91234-5678', 'Senha@123'),
('Pedro Oliveira', '1985-08-22', 'pedro.oliveira@email.com', '(21) 99876-5432', 'P@ssw0rd!'),
('Ana Souza', '1995-02-10', 'ana.souza@email.com', '(31) 98765-4321', 'A1b2c3d4!'),
('Carlos Pereira', '1988-11-30', 'carlos.pereira@email.com', '(41) 91234-8765', 'C@rlos2024'),
('Juliana Santos', '1992-07-18', 'juliana.santos@email.com', '(51) 92345-6789', 'Ju!2024senha'),
('Fernando Costa', '1998-04-25', 'fernando.costa@email.com', '(61) 93456-7890', 'F3rn@nd0*'),
('Amanda Rocha', '1987-09-12', 'amanda.rocha@email.com', '(71) 94567-8901', '@mAnda!567'),
('Ricardo Alves', '1993-01-05', 'ricardo.alves@email.com', '(81) 95678-9012', 'R!c4rd0#'),
('Patrícia Lima', '1996-12-08', 'patricia.lima@email.com', '(48) 96789-0123', 'P@tr1c1a'),
('Marcos Ribeiro', '1989-06-19', 'marcos.ribeiro@email.com', '(98) 97890-1234', 'M@rc0s_2024'),
('Tatiane Gomes', '1991-03-14', 'tatiane.gomes@email.com', '(67) 98901-2345', 'T@t1G0m3s'),
('Lucas Martins', '1997-08-07', 'lucas.martins@email.com', '(85) 99012-3456', 'LucasM@2024'),
('Camila Ferreira', '1986-10-23', 'camila.ferreira@email.com', '(62) 99123-4567', 'C@m1l4F3r'),
('Gustavo Dias', '1994-05-30', 'gustavo.dias@email.com', '(27) 99234-5678', 'Gust@v0D!'),
('Isabela Cunha', '1999-02-17', 'isabela.cunha@email.com', '(31) 99345-6789', 'Is@b3l4*'),
('Rafael Cardoso', '1984-07-11', 'rafael.cardoso@email.com', '(11) 99456-7890', 'R@f43lC@rd'),
('Vanessa Melo', '1990-11-28', 'vanessa.melo@email.com', '(21) 99567-8901', 'V@n3ss4M3l'),
('Diego Campos', '1995-04-03', 'diego.campos@email.com', '(41) 99678-9012', 'D!3g0C@mp'),
('Laura Barbosa', '1988-12-15', 'laura.barbosa@email.com', '(51) 99789-0123', 'L@ur4B4rb'),
('Bruno Nunes', '1993-09-20', 'bruno.nunes@email.com', '(61) 99890-1234', 'BrUn0N!2024'),
('Carolina Xavier', '1996-01-25', 'carolina.xavier@email.com', '(71) 99901-2345', 'C@r0lX@v'),
('Thiago Oliveira', '1987-06-08', 'thiago.oliveira@email.com', '(81) 99102-3456', 'Th!@g0L1v'),
('Mariana Costa', '1992-03-31', 'mariana.costa@email.com', '(48) 99203-4567', 'M@r1C0st@'),
('Felipe Rodrigues', '1998-10-12', 'felipe.rodrigues@email.com', '(98) 99304-5678', 'F3l!p3R0d'),
('Beatriz Almeida', '1994-07-05', 'beatriz.almeida@email.com', '(67) 99405-6789', 'B34tr!z@'),
('Rodrigo Souza', '1989-04-18', 'rodrigo.souza@email.com', '(85) 99506-7890', 'R0dr!g0S'),
('Daniela Lima', '1991-11-22', 'daniela.lima@email.com', '(62) 99607-8901', 'D@n1L1m@'),
('Alexandre Santos', '1997-08-15', 'alexandre.santos@email.com', '(27) 99708-9012', '@l3xS@nt'),
('Gabriela Rocha', '1985-02-27', 'gabriela.rocha@email.com', '(31) 99809-0123', 'G@br1R0ch'),
('Eduardo Pereira', '1990-09-10', 'eduardo.pereira@email.com', '(11) 99910-1234', '3dP3r3ir@'),
('Letícia Gomes', '1995-06-23', 'leticia.gomes@email.com', '(21) 99111-2345', 'L3t!c!@G'),
('Vinícius Martins', '1986-01-14', 'vinicius.martins@email.com', '(41) 99222-3456', 'V!n1M@rt'),
('Priscila Dias', '1993-04-07', 'priscila.dias@email.com', '(51) 99333-4567', 'Pr!sc1l@'),
('Roberto Cunha', '1998-12-30', 'roberto.cunha@email.com', '(61) 99444-5678', 'R0b3rt0C#'),
('Tânia Cardoso', '1987-05-19', 'tania.cardoso@email.com', '(71) 99555-6789', 'T@n1@C@rd'),
('Leonardo Melo', '1992-02-01', 'leonardo.melo@email.com', '(81) 99666-7890', 'L30n@rd0'),
('Cristina Campos', '1996-11-24', 'cristina.campos@email.com', '(48) 99777-8901', 'Cr!st1n@'),
('Marcelo Barbosa', '1984-08-17', 'marcelo.barbosa@email.com', '(98) 99888-9012', 'M@rc3l0B'),
('Fernanda Nunes', '1999-03-12', 'fernanda.nunes@email.com', '(67) 99999-0123', 'F3rn@nd4N'),
('Paulo Xavier', '1988-10-05', 'paulo.xavier@email.com', '(85) 99100-1234', 'P@ul0X@v'),
('Larissa Oliveira', '1994-07-28', 'larissa.oliveira@email.com', '(62) 99201-2345', 'L@r1ss0L!'),
('Hugo Costa', '1991-04-21', 'hugo.costa@email.com', '(27) 99302-3456', 'Hug0C0st@'),
('Sandra Rodrigues', '1997-01-13', 'sandra.rodrigues@email.com', '(31) 99403-4567', 'S@ndr@R0d'),
('Maurício Almeida', '1985-12-06', 'mauricio.almeida@email.com', '(11) 99504-5678', 'M@ur1c10'),
('Elaine Souza', '1990-09-29', 'elaine.souza@email.com', '(21) 99605-6789', '3l@!n3S0u'),
('Antônio Lima', '1995-06-22', 'antonio.lima@email.com', '(41) 99706-7890', '@nt0n!0L'),
('Viviane Santos', '1986-03-15', 'viviane.santos@email.com', '(51) 99807-8901', 'V!v1S@nt0'),
('Renato Rocha', '1993-10-08', 'renato.rocha@email.com', '(61) 99908-9012', 'R3n@t0R!'),
('Helena Gomes', '1998-05-01', 'helena.gomes@email.com', '(71) 99109-0123', 'H3l3n@G0m');




INSERT INTO instrutores (nome, email, telefone, senha) VALUES
('Carlos Magno', 'carlos.magno@academia.com', '(11) 91234-5000', 'C@rlosM!'),
('Fernanda Silva', 'fernanda.silva@academia.com', '(21) 99876-5001', 'F3rn@nd4S'),
('Roberto Alves', 'roberto.alves@academia.com', '(31) 98765-5002', 'R0bert0@'),
('Patrícia Oliveira', 'patricia.oliveira@academia.com', '(41) 91234-5003', 'P@tr1c1aO'),
('Ricardo Santos', 'ricardo.santos@academia.com', '(51) 92345-5004', 'R!c4rd0S'),
('Juliana Costa', 'juliana.costa@academia.com', '(61) 93456-5005', 'Juli@n4C'),
('Marcos Ribeiro', 'marcos.ribeiro@academia.com', '(71) 94567-5006', 'M@rc0sR!'),
('Amanda Lima', 'amanda.lima@academia.com', '(81) 95678-5007', '@m@nd@L1'),
('Thiago Pereira', 'thiago.pereira@academia.com', '(48) 96789-5008', 'Th!@g0P3'),
('Larissa Martins', 'larissa.martins@academia.com', '(98) 97890-5009', 'L@r1ss4M');


INSERT INTO treinos (aluno_id, instrutor_id, objetivo)
SELECT 
    (SELECT id FROM alunos ORDER BY random() LIMIT 1),
    (SELECT id FROM instrutores ORDER BY random() LIMIT 1),
    CASE floor(random() * 6)
        WHEN 0 THEN 'Hipertrofia muscular'
        WHEN 1 THEN 'Perda de gordura'
        WHEN 2 THEN 'Condicionamento físico'
        WHEN 3 THEN 'Força máxima'
        WHEN 4 THEN 'Preparação para competição'
        ELSE 'Reabilitação física'
    END
FROM generate_series(1, 20);


INSERT INTO planos (nome, preco, duracao_meses) VALUES
('Mensal - 3 dias/semana', 180.00, 1),
('Mensal - Todos os dias', 200.00, 1),
('Trimestral - 3 dias/semana', 525.00, 3),
('Trimestral - Todos os dias', 585.00, 3),
('Semestral - 3 dias/semana', 1550.00, 6),
('Semestral - Todos os dias', 1700.00, 6),
('Anual - 3 dias/semana', 3000.00, 12),
('Anual - Todos os dias', 3250.00, 12);






INSERT INTO locais (cidade, estado, pais) VALUES
('São Paulo', 'SP', DEFAULT),
('Rio de Janeiro', 'RJ', DEFAULT),
('Belo Horizonte', 'MG', DEFAULT),
('Porto Alegre', 'RS', DEFAULT),
('Brasília', 'DF', DEFAULT);





INSERT INTO academias (nome, email, senha_hash, endereco, id_local) VALUES
('Academia Fit Center', 'fitcenter@email.com', 'hash_senha1', 'Rua das Flores, 123 - Centro', 1),
('Academia Power Gym', 'powergym@email.com', 'hash_senha2', 'Av. Brasil, 456 - Copacabana', 2),
('Academia Strong', 'strong@email.com', 'hash_senha3', 'Rua das Acácias, 789 - Savassi', 3);






INSERT INTO maquinas (id_academia, nome, descricao, qr_code) VALUES
(1, 'Leg Press', 'Máquina para exercícios de pernas', 'QR_LEG_PRESS_1'),
(1, 'Peck Deck', 'Máquina para exercícios de peito', 'QR_PECK_DECK_1'),
(1, 'Esteira', 'Esteira elétrica para corrida', 'QR_ESTEIRA_1'),
(1, 'Bicicleta Ergométrica', 'Bicicleta para exercícios aeróbicos', 'QR_BIKE_1'),
(1, 'Puxada Alta', 'Máquina para exercícios de costas', 'QR_PUXADA_1'),
(2, 'Hack Squat', 'Máquina para agachamento guiado', 'QR_HACK_SQUAT_2'),
(2, 'Desenvolvimento', 'Máquina para ombros', 'QR_DESENVOLVIMENTO_2'),
(2, 'Remada Baixa', 'Máquina para exercícios de costas', 'QR_REMADA_BAIXA_2'),
(3, 'Cadeira Extensora', 'Máquina para quadríceps', 'QR_EXTENSORA_3'),
(3, 'Cadeira Flexora', 'Máquina para posterior de coxa', 'QR_FLEXORA_3');






INSERT INTO exercicios (id_maquina, nome, tutorial_url, instrucoes, beneficios, sequencia) VALUES
(1, 'Leg Press 45°', 'https://exemplo.com/video-legpress', 'Posicione os pés na plataforma e empurre com força', 'Fortalecimento de quadríceps, glúteos e posterior', '4 séries de 10-12 repetições'),
(2, 'Voador Peitoral', 'https://exemplo.com/video-pecdeck', 'Sente-se com as costas retas e empurre os braços', 'Desenvolvimento do peitoral maior', '3 séries de 12-15 repetições'),
(3, 'Corrida Estacionária', 'https://exemplo.com/video-esteira', 'Ajuste a velocidade e incline conforme necessário', 'Melhora do condicionamento cardiovascular', '30 minutos contínuos'),
(4, 'Spinning', 'https://exemplo.com/video-bike', 'Ajuste a resistência e mantenha ritmo constante', 'Queima calórica e resistência muscular', '45 minutos intervalado'),
(5, 'Remada Alta', 'https://exemplo.com/video-puxada', 'Puxe a barra em direção ao peito mantendo as costas retas', 'Desenvolvimento de dorsais e bíceps', '4 séries de 8-10 repetições'),
(6, 'Agachamento Guiado', 'https://exemplo.com/video-hacksquat', 'Posicione os ombros nos apoios e flexione os joelhos', 'Fortalecimento completo de membros inferiores', '5 séries de 6-8 repetições'),
(7, 'Desenvolvimento Militar', 'https://exemplo.com/video-ombros', 'Empurre o peso para cima com controle', 'Desenvolvimento de deltóides e tríceps', '4 séries de 10-12 repetições'),
(8, 'Remada Fechada', 'https://exemplo.com/video-remada', 'Puxe o peso em direção ao abdômen', 'Espessamento das costas', '3 séries de 12 repetições'),
(9, 'Extensão de Pernas', 'https://exemplo.com/video-extensora', 'Estenda as pernas completamente com controle', 'Isolamento do quadríceps', '4 séries de 15 repetições'),
(10, 'Flexão de Pernas', 'https://exemplo.com/video-flexora', 'Flexione os joelhos trazendo o calcanhar em direção ao glúteo', 'Isolamento do posterior de coxa', '4 séries de 12 repetições');






INSERT INTO treino_exercicio (treino_id, exercicio_id, series, repeticoes, carga_kg) VALUES
(1, 1, 4, 12, 80.0),
(1, 2, 3, 15, 40.0),
(1, 5, 4, 10, 50.0),
(2, 3, 1, 30, NULL),
(2, 4, 1, 45, NULL),
(3, 6, 5, 8, 120.0),
(3, 7, 4, 10, 60.0),
(4, 9, 4, 15, 30.0),
(4, 10, 4, 12, 25.0),
(5, 8, 3, 12, 70.0),
(5, 2, 3, 12, 45.0);






INSERT INTO avaliacoes_fisicas (id_aluno, peso_kg, altura_m, imc, observacoes) VALUES
(1, 78.5, 1.75, ROUND(78.5 / (1.75 * 1.75), 2), 'Massa muscular desenvolvida'),
(2, 65.2, 1.68, ROUND(65.2 / (1.68 * 1.68), 2), 'Percentual de gordura reduzido'),
(3, 92.0, 1.82, ROUND(92.0 / (1.82 * 1.82), 2), 'Necessita reduzir gordura visceral'),
(4, 58.7, 1.63, ROUND(58.7 / (1.63 * 1.63), 2), 'Boa definição muscular'),
(5, 81.3, 1.78, ROUND(81.3 / (1.78 * 1.78), 2), 'Avanço significativo na massa magra');





INSERT INTO matriculas (aluno_id, plano_id, data_inicio, data_fim) VALUES
(1, 1, '2025-01-15', '2025-02-15'),
(2, 3, '2025-02-01', '2025-05-01'),
(3, 5, '2025-03-10', '2025-09-10'),
(4, 2, '2025-01-20', '2025-02-20'),
(5, 4, '2025-02-15', '2025-05-15'),
(6, 6, '2025-03-01', '2025-09-01'),
(7, 8, '2025-01-10', '2026-01-10'),
(8, 7, '2025-02-20', '2026-02-20'),
(9, 1, '2025-03-05', '2025-04-05'),
(10, 3, '2025-01-25', '2025-04-25');




INSERT INTO pagamentos (id_aluno, id_plano, metodo_pagamento, status, valor_pago, codigo_transacao) VALUES
(1, 1, 'pix', 'pago', 180.00, 'PIX-7G3H9B2'),
(2, 3, 'cartao', 'pago', 525.00, 'CARD-2023-8765'),
(3, 5, 'boleto', 'pendente', 1550.00, 'BLT-00123456'),
(4, 2, 'pix', 'pago', 200.00, 'PIX-8K4J1D7'),
(5, 4, 'cartao', 'cancelado', 585.00, 'CARD-2023-5432');






INSERT INTO posts_timeline (autor_tipo, conteudo) 
VALUES ('sistema', 'Novo equipamento chegou na academia!');

INSERT INTO posts_timeline (autor_tipo, id_autor, conteudo, midia_url)
VALUES ('instrutor', 1, 'Dica de hoje: alongamento antes do treino', 'https://exemplo.com/video-alongamento');

INSERT INTO curtidas_post (id_post, id_aluno) VALUES (1, 1), (1, 2), (2, 3);




select * from instrutores;

select * from alunos;

select * from treinos;

select * from planos;

select * from matriculas;

select * from locais;

select * from academias;

select * from maquinas;

select * from exercicios;

select * from treino_exercicio;

select * from avaliacoes_fisicas;

select * from pagamentos;






CREATE VIEW vw_alunos AS
SELECT id, nome, data_nascimento, email, telefone
FROM alunos;

CREATE VIEW vw_instrutores AS
SELECT id, nome, email, telefone
FROM instrutores;

CREATE VIEW vw_treinos_completos AS
SELECT
    t.id,
    a.nome AS aluno,
    i.nome AS instrutor,
    t.data_criacao,
    t.objetivo
FROM treinos t
JOIN alunos a ON t.aluno_id = a.id
JOIN instrutores i ON t.instrutor_id = i.id;

CREATE VIEW vw_planos_ativos AS
SELECT * FROM planos WHERE preco > 0;

CREATE VIEW vw_matriculas_detalhadas AS
SELECT
    m.id,
    a.nome AS aluno,
    p.nome AS plano,
    p.preco,
    m.data_inicio,
    m.data_fim
FROM matriculas m
JOIN alunos a ON m.aluno_id = a.id
JOIN planos p ON m.plano_id = p.id;





CREATE VIEW vw_academias_localizacao AS
SELECT
    ac.id,
    ac.nome,
    ac.email,
    ac.endereco,
    l.cidade,
    l.estado,
    l.pais
FROM academias ac
JOIN locais l ON ac.id_local = l.id;

CREATE VIEW vw_maquinas_academia AS
SELECT
    m.id,
    a.nome AS academia,
    m.nome AS maquina,
    m.descricao,
    m.qr_code
FROM maquinas m
JOIN academias a ON m.id_academia = a.id;

CREATE VIEW vw_exercicios_completos AS
SELECT
    e.id,
    m.nome AS maquina,
    a.nome AS academia,
    e.nome AS exercicio,
    e.tutorial_url,
    e.instrucoes,
    e.beneficios,
    e.sequencia
FROM exercicios e
JOIN maquinas m ON e.id_maquina = m.id
JOIN academias a ON m.id_academia = a.id;

CREATE VIEW vw_avaliacoes_completas AS
SELECT
    af.id,
    a.nome AS aluno,
    af.data_avaliacao,
    af.peso_kg,
    af.altura_m,
    af.imc,
    af.observacoes
FROM avaliacoes_fisicas af
JOIN alunos a ON af.id_aluno = a.id;


CREATE VIEW vw_pagamentos_detalhados AS
SELECT
    pg.id,
    a.nome AS aluno,
    p.nome AS plano,
    pg.data_pagamento,
    pg.metodo_pagamento,
    pg.status,
    pg.valor_pago
FROM pagamentos pg
JOIN alunos a ON pg.id_aluno = a.id
JOIN planos p ON pg.id_plano = p.id;




CREATE VIEW vw_timeline_engajamento AS
SELECT
    p.id,
    p.autor_tipo,
    CASE
        WHEN p.autor_tipo = 'Instrutor' THEN i.nome
        ELSE 'Sistema'
    END AS autor,
    p.conteudo,
    p.midia_url,
    p.data_postagem,
    COUNT(c.id) AS curtidas
FROM posts_timeline p
LEFT JOIN instrutores i ON p.id_autor = i.id
LEFT JOIN curtidas_post c ON p.id = c.id_post
GROUP BY p.id, i.nome;