# 🏋️ Como Colocar a Aplicação para Funcionar

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:
- **Node.js** (https://nodejs.org/) - versão LTS recomendada
- **Oracle Database** (ou Oracle XE) e **Oracle Instant Client** (para node-oracledb)
- **SQL Developer** ou **SQL*Plus** para executar scripts SQL
- **Git** (já que você está usando GitHub)

---

## 🚀 Passo a Passo

### **Passo 1: Abrir o Terminal**

1. Abra a **PowerShell** ou **CMD** do Windows
2. Navegue até a pasta do projeto:
```bash
cd C:\Users\MASTER\Documents\GitHub\Projeto_Integrado_1
```

---

### **Passo 2: Instalar as Dependências**

Execute este comando **uma única vez**:
```bash
npm install
```

Espere até terminar. Você verá muitas linhas sendo instaladas.

---

### **Passo 3: Criar o Banco de Dados (Oracle)**

> Observação: o projeto agora usa Oracle. O arquivo `database/banco.sql` já está em sintaxe Oracle.

#### 3.1 - Preparar o ambiente Oracle

- Instale o Oracle Database (ou Oracle XE) e o Oracle Instant Client.
- No Windows, baixe o Instant Client e extraia; defina a variável de ambiente `ORACLE_CLIENT_LIB_DIR` apontando para a pasta do Instant Client (ex: C:\instantclient_21_9).

#### 3.2 - Conectar ao Oracle (ex: SQL*Plus)

No terminal (ou no SQL Developer) conecte com um usuário com privilégios para criar objetos, por exemplo:
```bash
sqlplus system@localhost/XEPDB1
```
ou
```bash
sqlplus system
-- depois: CONNECT system@localhost/XEPDB1
```

#### 3.3 - Criar schema/usuário (opcional, recomendado)

Crie um usuário dedicado para a aplicação (exemplo):
```sql
CREATE USER app_user IDENTIFIED BY sua_senha;
GRANT CONNECT, RESOURCE TO app_user;
ALTER USER app_user QUOTA UNLIMITED ON USERS;
```

Anote as credenciais e o connect string (ex: localhost/XEPDB1) — usaremos nas variáveis de ambiente.

#### 3.4 - Executar o script Oracle (banco.sql)

Abra `Projeto_Integrado_1/database/banco.sql` e execute-o no SQL*Plus ou SQL Developer conectado ao usuário desejado (ex: `app_user`). O arquivo já contém DDL Oracle (NUMBER, VARCHAR2, GENERATED AS IDENTITY, etc.).

No SQL*Plus:
```sql
@C:\caminho\para\Projeto_Integrado_1\database\banco.sql
```


---

### **Passo 4: Verificar a Configuração do Banco (Oracle)**

Abra o arquivo: `Projeto_Integrado_1/config/db.js`

O módulo já foi adaptado para usar `node-oracledb`. Configure as credenciais via variáveis de ambiente antes de iniciar o servidor:

- `DB_USER` ou `ORACLE_USER` — usuário do Oracle (ex: `app_user` ou `system`)
- `DB_PASS` ou `ORACLE_PASS` — senha do usuário
- `DB_CONNECT` ou `ORACLE_CONNECT` — connect string (ex: `localhost/XEPDB1`)
- `ORACLE_CLIENT_LIB_DIR` — (Windows) pasta do Oracle Instant Client (ex: `C:\instantclient_21_9`)

Exemplo (PowerShell):
```powershell
$env:DB_USER = "app_user"
$env:DB_PASS = "sua_senha"
$env:DB_CONNECT = "localhost/XEPDB1"
$env:ORACLE_CLIENT_LIB_DIR = "C:\\instantclient_21_9"
node index.js
```

O arquivo `config/db.js` tentará inicializar o Oracle Client se `ORACLE_CLIENT_LIB_DIR` estiver definido e testará a conexão ao carregar.

---

### **Passo 5: Iniciar o Servidor**

No terminal (na pasta Projeto_Integrado_1), execute:
```bash
node index.js
```

Você deve ver estas mensnovamente

### ❌ Erro: "Erro ao conectar ao banco de dados"
**Solução**: 
1. Verifique se MySQL está rodando
2. Verifique as credenciais em `config/db.js`
3. Verifique se o banco `strongFitAcademia` foi criado

### ❌ Erro: "EADDRINUSE: address already in use :::3000"
**Solução**: A porta 3000 jagens:
```
Servidor rodando na porta 3000
Acesse: http://localhost:3000
Conexão com banco de dados realizada com sucesso!
```

**Se vir essas mensagens = SUCESSO! ✅**

---

### **Passo 6: Acessar a Aplicação**

Abra o seu navegador e acesse:

- **Home**: http://localhost:3000
- **Cadastro**: http://localhost:3000/cadastro
- **Login**: http://localhost:3000/login

---

## 🔧 Troubleshooting (Solução de Problemas)

### ❌ Erro: "Erro ao conectar ao banco de dados" (oracledb)
**Solução**:
1. Verifique se o Oracle Database está rodando
2. Confirme `DB_USER`/`DB_PASS`/`DB_CONNECT` (variáveis de ambiente)
3. No Windows, confirme `ORACLE_CLIENT_LIB_DIR` apontando para o Instant Client

⚠️ **Observação**: O driver `oracledb` depende do Oracle Instant Client instalado localmente — sem ele a conexão falhará.

### ❌ Erro: "Cannot find module 'express'"
**Solução**: Execute `npm install` na pasta do projeto

### ❌ Erro: "npm install oracledb falha"
**Solução**:
- Instale o Oracle Instant Client (compatível com sua versão do Node/OS).
- Defina `ORACLE_CLIENT_LIB_DIR` apontando para a pasta do Instant Client antes de instalar se necessário.
- Consulte: https://oracle.github.io/node-oracledb/INSTALL.html

### ❌ A página não carrega
**Solução**: Verifique se o servidor está rodando no terminal (`node index.js`) e se as variáveis de ambiente estão definidas

---

## 📁 Estrutura de Arquivos

```
Projeto_Integrado_1/
├── index.js                    # ⭐ Servidor Principal
├── package.json               # Dependências
├── config/
│   ├── db.js                  # Conexão com banco
│   └── Usuario.js             # Modelo do banco
├── models/
│   └── ClasseUsuario.js       # Validações
├── pages/
│   ├── CADASTRO.html          # Formulário de cadastro
│   ├── LOGIN.html             # Formulário de login
│   └── ...
├── assets/
│   ├── js/
│   │   ├── cadastro.js        # Lógica do formulário
│   │   └── ...
│   ├── css/
│   └── images/
├── database/
│   └── banco.sql              # Script do banco
└── index.html                 # Página inicial
```

---

## ✅ Checklist Final

Antes de começar, verifique:

- [ ] Node.js instalado? `node --version`
- [ ] npm instalado? `npm --version`
- [ ] MySQL instalado e rodando?
 - [ ] Oracle Database e Instant Client instalados e configurados?
- [ ] Pasta `Projeto_Integrado_1` aberta no terminal?
- [ ] `npm install` foi executado com sucesso?
- [ ] Banco de dados `strongFitAcademia` criado?
- [ ] Arquivo `banco.sql` foi executado?
- [ ] `node index.js` roda sem erros?

---

## 💡 Dicas Úteis

### Para desligar o servidor
Pressione **Ctrl + C** no terminal

### Para manter o servidor ligado
Deixe o terminal aberto enquanto testa

### Para recarregar (hot reload)
Instale nodemon:
```bash
npm install -g nodemon
nodemon index.js
```

### Para ver o banco de dados (Oracle)
Use o SQL*Plus ou SQL Developer conectado ao usuário/schema que contém as tabelas. Exemplos (SQL*Plus):
```sql
-- conectar
sqlplus app_user@sua_conexao

-- verificar tabelas
SELECT table_name FROM user_tables;
SELECT * FROM Aluno;
```

---

## 🎯 Fluxo de Funcionamento

```
1. Usuário acessa http://localhost:3000/cadastro
   ↓
2. Preenche o formulário CADASTRO.html
   ↓
3. Clica em "FINALIZAR CADASTRO"
   ↓
4. JavaScript (cadastro.js) busca CEP e valida
   ↓
5. Envia POST para /cadastro-form
   ↓
6. index.js recebe e cria ClasseUsuario
   ↓
7. ClasseUsuario valida todos os campos
   ↓
8. Se OK → insere no banco de dados
   ↓
9. Se Erro → mostra mensagem de erro
   ↓
10. Se Sucesso → redireciona para /login
```

---

## 📞 Resumo Rápido

```bash
# 1. Ir para a pasta
cd C:\Users\MASTER\Documents\GitHub\Projeto_Integrado_1

# 2. Instalar dependências
npm install

# 3. Criar banco (no MySQL):
# CREATE DATABASE strongFitAcademia;
# USE strongFitAcademia;
# [colar conteúdo de database/banco.sql]

# 4. Iniciar servidor
node index.js

# 5. Acessar
# http://localhost:3000
```

---

## ✨ Pronto!

Se tudo deu certo, sua aplicação está funcionando! 🎉

**Bom desenvolvimento!** 🚀
