CREATE DATABASE strongFitAcademia;
USE strongFitAcademia;


-- Tabela aluno 
CREATE TABLE Aluno (
    idAluno NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR2(150),
    dataNas DATE,
    cpf VARCHAR2(14),
    rg VARCHAR2(20),
    telefone VARCHAR2(20),
    email VARCHAR2(100),
    cep VARCHAR2(10),
    logradouro VARCHAR2(100),
    numero VARCHAR2(10),
    complemento VARCHAR2(50),
    nivelTreino VARCHAR2(50),
    qtdTreino NUMBER

    -- Senha para Login
    senha VARCHAR2(100)
);

-- Tabela Treinador
CREATE TABLE Treinador (
    idTreinador NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(150),
    cpf VARCHAR(14),
    telefone VARCHAR2(20),
    email VARCHAR2(100),
    cref VARCHAR2(20),
    cep VARCHAR2(10),
    rua VARCHAR2(100),
    numero VARCHAR2(10)

    -- Senha para Login
    senha VARCHAR2(100)
);

-- Tabela de exercicios
CREATE TABLE exercicio(
    idExc NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY
    nome VARCHAR2(150),
    grupoMusc VARCHAR(50)
);
-- Tabela treino 
CREATE TABLE treino(
    idTreino NUMBER PRIMARY KEY,
    nome VARCHAR2(100)

);
-- tabela qtd de series, rep e descanso
-- tabela de ficha do aluno
-- inserts 
-- peito 
-- costas
-- pernas 
-- ombros
-- biceps
-- gluteo
-- triceps
-- selects ex select * from ex WHWERE gripoMusc = "peito"
-- criar treino ex insert into treino values(1, 'treino a')

-- ligar ex ao treino insert into te values (1, 1, 3, 12, '60s')
