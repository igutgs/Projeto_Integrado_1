CREATE DATABASE strongFitAcademia;
USE strongFitAcademia;


-- Tabela aluno 
CREATE TABLE Aluno (
    idAluno NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(150),
    dataNas DATE,
    cpf VARCHAR(14),
    rg VARCHAR(20),
    telefone VARCHAR(20),
    email VARCHAR(100),
    cep VARCHAR(10),
    logradouro VARCHAR(100),
    numero VARCHAR(10),
    complemento VARCHAR(50),
    nivelTreino VARCHAR(50),
    qtdTreino NUMBER
);

-- Tabela Treinador
CREATE TABLE Treinador (
    idTreinador NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(150),
    cpf VARCHAR(14),
    telefone VARCHAR(20),
    email VARCHAR(100),
    cref VARCHAR(20),
    cep VARCHAR(10),
    rua VARCHAR(100),
    numero VARCHAR(10)
);

-- Tabela de exercicios
CREATE TABLE exercicio(
    idExc NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(150),
    grupoMusc VARCHAR(50)
);
-- Tabela treino 
CREATE TABLE treino(
    idTreino NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100)

);
-- tabela qtd de series, rep e descanso
CREATE TABLE protTreino(
    idTreino NUMBER,
    idExc NUMBER,
    series NUMBER,
    rep NUMBER,
    descanso VARCHAR(20),

    PRIMARY KEY (idTreino, idExc),
    FOREIGN KEY (idTreino) REFERENCES treino(idTreino),
    FOREIGN KEY (idExc) REFERENCES exercicio(idExc)
);
-- tabela de ficha do aluno
CREATE TABLE ficha (
    idFicha NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    idAluno NUMBER, 
    idTreino NUMBER,

    FOREIGN KEY (idAluno) REFERENCES Aluno(idAluno),
    FOREIGN KEY (idTreino) REFERENCES Treino(idTreino)
);
-- inserts 
-- aluno
INSERT INTO Aluno
(nome, dataNas, cpf, rg, telefone, email, cep, logradouro, numero, complemento, nivelTreino, qtdTreino)
values('Fulana', to_date('2004-06-15', 'YYYY-MM-DD'), '123.456.789-00', '1234567', '11999999999', 'funala@gmmail.com', '00000-000', 'Rua Floral', '123', 'Casa','N2', 5);

-- treinador 
INSERT INTO Treinador
(nome, cpf, telefone, email, cref, cep, rua, numero)
values
('Ciclano', '987.654.321-00', '1188888888', 'ciclano@gamil.com','CREF12345','00000-000', 'Rua da cerejeira', '234');

-- peito 
INSERT INTO exercicio (nome, grupoMusc) values ('Supino Reto (Barra)','Peito');
INSERT INTO exercicio (nome, grupoMusc) values ('Supino Reto (Halteres)','Peito');
INSERT INTO exercicio (nome, grupoMusc) values ('Supino Inclinado (Barra)','Peito');
INSERT INTO exercicio (nome, grupoMusc) values ('Supino Inclinado (Halteres)','Peito');
INSERT INTO exercicio (nome, grupoMusc) values ('Supino Declinado (Barra/Halteres)','Peito');
INSERT INTO exercicio (nome, grupoMusc) values ('Crucifixo Reto (Halteres)','Peito');
INSERT INTO exercicio (nome, grupoMusc) values ('Crucifixo Inclinado (Halteres)','Peito');
INSERT INTO exercicio (nome, grupoMusc) values ('Crossover (Polia Alta)','Peito');
INSERT INTO exercicio (nome, grupoMusc) values ('Crossover (Polia Baixa)','Peito');
INSERT INTO exercicio (nome, grupoMusc) values ('Peck Deck (Voador)','Peito');
INSERT INTO exercicio (nome, grupoMusc) values ('Flexao de Bracos (Solo)','Peito');
INSERT INTO exercicio (nome, grupoMusc) values ('Supino Maquina (Vertical)','Peito');
-- costa
INSERT INTO exercicio (nome, grupoMusc) VALUES ('Puxada Frente (Polia Alta)','Costas');
INSERT INTO exercicio (nome, grupoMusc) VALUES ('Puxada Triângulo (Polia Alta)','Costas');
INSERT INTO exercicio (nome, grupoMusc) VALUES ('Puxada Supinada (Polia Alta)','Costas');
INSERT INTO exercicio (nome, grupoMusc) VALUES ('Remada Curvada (Barra)','Costas');
INSERT INTO exercicio (nome, grupoMusc) VALUES ('Remada Curvada (Halteres)','Costas');
INSERT INTO exercicio (nome, grupoMusc) VALUES ('Remada Cavalinho (Barra T)','Costas');
INSERT INTO exercicio (nome, grupoMusc) VALUES ('Remada Baixa (Triangulo)','Costas');
INSERT INTO exercicio (nome, grupoMusc) VALUES ('Remada Unilateral (Serrote)','Costas');
INSERT INTO exercicio (nome, grupoMusc) VALUES ('Barra Fixa (Pronada)','Costas');
INSERT INTO exercicio (nome, grupoMusc) VALUES ('Barra Fixa (Supinada)','Costas');
INSERT INTO exercicio (nome, grupoMusc) VALUES ('PullDown (Corda/Na bolia)','Costas');
INSERT INTO exercicio (nome, grupoMusc) VALUES ('Levantamento Terra (Convencional)','Costas');
INSERT INTO exercicio (nome, grupoMusc) VALUES ('Hiperextensao(Banco Romano)','Costas');

-- pernas 
INSERT INTO  exercicio (nome, grupoMusc) values ('Agachamento Livre Barra','Perna');
INSERT INTO  exercicio (nome, grupoMusc) values('Agachamento Smith Guia','Perna');
INSERT INTO  exercicio (nome, grupoMusc) values('Agachamento Sumô Halter','Perna');
INSERT INTO  exercicio (nome, grupoMusc) values ('Leg Press 45º','Perna');
INSERT INTO  exercicio (nome, grupoMusc) values ('Leg Press Horizontal','Perna');
INSERT INTO  exercicio (nome, grupoMusc) values ('Hack Squat (Máquina)','Perna');
INSERT INTO  exercicio (nome, grupoMusc) values ('Cadeira Extensora','Perna');
INSERT INTO  exercicio (nome, grupoMusc) values ('Mesa Flexora Deitado', 'Perna');
INSERT INTO  exercicio (nome, grupoMusc) values ('Cadeira Flexora Sentado', 'Perna');
INSERT INTO  exercicio (nome, grupoMusc) values ('Stiff (Barra ou Halteres)','Perna');
INSERT INTO  exercicio (nome, grupoMusc) values('Afundo (Halteres)','Perna');
INSERT INTO  exercicio (nome, grupoMusc) values('Avanço/Passada (Caminhando)','Perna');
INSERT INTO  exercicio (nome, grupoMusc) values ('Agachamento Búlgaro (Unilaterl)','Perna');

-- obros
INSERT INTO exercicio(nome, grupoMusc) values ('Desenvolvimento Militar (Barra)','Ombro');
INSERT INTO exercicio (nome, grupoMusc) values ('Desenvolvimento Arnold (Halteres)','Ombro');
INSERT INTO exercicio (nome, grupoMusc) values ('Desenvolvimento (Halteres Sentado)','Ombro');
INSERT INTO exercicio(nome, grupoMusc) values ('Elevação Lateral (Halteres)','Ombro');
INSERT INTO exercicio (nome, grupoMusc) values ('Elevação Lateral (Cabo/Polia)','Ombro');
INSERT INTO exercicio (nome, grupoMusc) values ('Elevação Frontal (Barra/Halter/Anilha)','Ombro');
INSERT INTO exercicio (nome, grupoMusc) values ('Crucifixo Inverso (Halteres Curvado)','Ombro');
INSERT INTO exercicio (nome, grupoMusc) values ('Crucifixo Inverso (Máquina/Pec Deck)', 'Ombro');
INSERT INTO exercicio (nome, grupoMusc) values ('Face Pull (Corda na Polia)', 'Ombro');
INSERT INTO exercicio (nome, grupoMusc) values ('Remada Alta (Barra ou Cabo)','Ombro');
-- bicep
INSERT INTO exercicio (nome, grupoMusc) values ('Rosca Direta (Barra Reta/W)','Bicepis');
INSERT INTO exercicio (nome, grupoMusc) values ('Rosca Alternada (Halteres)','Bicepis');
INSERT INTO exercicio (nome, grupoMusc) values ('Rosca Martelo (Halteres)','Bicepis');
INSERT INTO exercicio (nome, grupoMusc) values ('Rosca Scott (Barra W ou Maquia)','Bicepis');
INSERT INTO exercicio (nome, grupoMusc) values ('Rosca Concentrada (Halter)','Bicepis');
INSERT INTO exercicio (nome, grupoMusc) values ('Rosca Inclinada 45 (Halteres)','Bicepis');
-- glute
INSERT INTO exercicio (nome, grupoMusc) values ('Elevação Pélvica(Barra ou máquina)','Glúteo');
INSERT INTO exercicio (nome, grupoMusc) values ('Extensão de quadril','Glúteo');
INSERT INTO exercicio (nome, grupoMusc) values ('Cadeira abdutora','Glúteo');
-- triceps
INSERT INTO exercicio (nome, grupoMusc) values ('Tricepes Pulley(Barra reta/w)','Tricepes');
INSERT INTO exercicio (nome, grupoMusc) values ('Tricepes Corda(Polia)','Tricepes');
INSERT INTO exercicio (nome, grupoMusc) values ('Tricepes Testa(Barra w ou halteres)','Tricepes');
INSERT INTO exercicio (nome, grupoMusc) values ('Tricepes Francês(Halter ou cabo)','Tricepes');
INSERT INTO exercicio (nome, grupoMusc) values ('Tricepes Coice(Halter ou cabo)','Tricepes');
INSERT INTO exercicio (nome, grupoMusc) values ('Mergulho(Paralela ou banco)','Tricepes');
-- selects ex select * from ex WHWERE grupoMusc = "peito
-- criar treino ex insert into treino values(1, 'treino a'
INSERT INTO treino (nome) VALUES ('Treino A');
INSERT INTO treino (nome) VALUES ('Treino B');
INSERT INTO treino (nome) VALUES ('Treino C');
INSERT INTO treino (nome) VALUES ('Treino D');
INSERT INTO treino (nome) VALUES ('Treino E');

-- ligar ex ao treino insert into te values (1, 1, 3, 12, '60s'
-- A
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso) VALUES ( 1,1,4,12, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso) VALUES (1, 2, 4, 10, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso) VALUES (1, 3, 3, 10, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (1, 6, 3, 12, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (1, 7, 3, 12, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (1, 8, 3, 12, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (1, 9, 3, 12, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (1, 10, 3, 10, '60s');
-- B
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (2, 13, 4, 12, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (2, 14, 4, 10, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (2, 15, 3, 10, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (2, 16, 3, 12, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (2, 17, 3, 12, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (2, 18, 3, 12, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (2, 40, 3, 12, '60s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (2, 41, 3, 10, '60s');
-- C
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (3, 25, 4, 12, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (3, 26, 4, 10, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (3, 27, 3, 10, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (3, 28, 3, 12, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (3, 29, 3, 12, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (3, 30, 3, 12, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (3, 31, 3, 10, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (3, 32, 3, 12, '90s');
-- D
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (4, 31, 4, 12, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (4, 32, 4, 10, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (4, 33, 3, 10, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (4, 34, 3, 12, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (4, 35, 3, 12, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (4, 36, 3, 12, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (4, 37, 3, 10, '90s');
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (4, 38, 3, 12, '90s');
-- E
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (5, 1, 3, 12, '60s');   
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (5, 13, 3, 12, '60s');  
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (5, 25, 3, 12, '90s');  
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (5, 33, 3, 12, '90s');  
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (5, 34, 3, 12, '90s');  
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (5, 39, 3, 12, '60s');  
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (5, 40, 3, 12, '60s');  
INSERT INTO protTreino (idTreino, idExc, series, rep, descanso)VALUES (5, 45, 3, 12, '60s');  

INSERT INTO ficha (idAluno, idTreino) VALUES (1, 1);
INSERT INTO ficha (idAluno, idTreino) VALUES (1, 2);
INSERT INTO ficha (idAluno, idTreino) VALUES (1, 3);
INSERT INTO ficha (idAluno, idTreino) VALUES (1, 4);
INSERT INTO ficha (idAluno, idTreino) VALUES (1, 5);
