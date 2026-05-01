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
    qtdTreino NUMBER,

    altura NUMBER(5,2),
    peso NUMBER(5,2),
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

INSERT INTO Aluno
(nome, dataNas, cpf, rg, telefone, email, cep, logradouro, numero, complemento, nivelTreino, qtdTreino, altura, peso, senha)
values('Fulana', to_date('2004-06-15', 'YYYY-MM-DD'), '123.456.789-00', '1234567', '11999999999', 'funala@gmmail.com', '00000-000', 'Rua Floral', '123', 'Casa','N2', 5, 1.65, 55, 'senha123');
