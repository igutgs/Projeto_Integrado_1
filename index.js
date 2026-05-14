const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const Usuario = require('./config/Usuario')
const { ClasseUsuario, ClasseUsuarioLogin } = require('./models/ClasseUsuario');

        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())

        app.use(express.static('public'))
        app.use(express.static('.'))

        //rotas para cadastro e login
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html')
    })

    app.get('/cadastro', function(req, res) {
        res.sendFile(__dirname + '/pages/CADASTRO.html')
    })

    app.get('/login', function(req, res) {
        res.sendFile(__dirname + '/pages/LOGIN.html')
    })

    app.post('/cadastro-form', async function(req, res) {
        try {
            let objUsuario = new ClasseUsuario(
                req.body.nome,
                req.body.email,
                req.body.tel,
                req.body.logradouro,
                req.body.num,
                req.body.complemento,
                req.body.bairro,
                req.body.cidade,
                req.body.uf,
                req.body.nascimento,
                req.body.senha,
                req.body.confirmarSenha
            )

            //validação
            if (!objUsuario.validarNome()) {
                console.log('Nome inválido')
                return res.status(400).json({mensagem: 'Nome inválido'})
            }

            if (! await objUsuario.validarEmail()) {
                console.log('E-mail inválido ou já cadastrado')
                return res.status(400).json({mensagem: 'E-mail inválido ou já cadastrado'})
            }

            if (! await objUsuario.validarTelefone()) {
                console.log('Telefone inválido ou já cadastrado')
                return res.status(400).json({mensagem: 'Telefone inválido ou já cadastrado'})
            }

            if (! objUsuario.validarSenha()) {
                console.log('Senha inválida')
                return res.status(400).json({mensagem: 'Senha inválida. Mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial'})
            }

            if (! objUsuario.validarDataNascimento()) {
                console.log('Data de Nascimento inválida')
                return res.status(400).json({mensagem: 'Você deve ter pelo menos 18 anos'})
            }

            if (! objUsuario.validarRua()) {
                console.log('Logradouro inválido')
                return res.status(400).json({mensagem: 'Logradouro inválido'})
            }

            if (! objUsuario.validarNumero()) {
                console.log('Número inválido')
                return res.status(400).json({mensagem: 'Número inválido'})
            }

            if (! objUsuario.validarBairro()) {
                console.log('Bairro inválido')
                return res.status(400).json({mensagem: 'Bairro inválido'})
            }

            if (! objUsuario.validarCidade()) {
                console.log('Cidade inválida')
                return res.status(400).json({mensagem: 'Cidade inválida'})
            }

            if (! objUsuario.validarUF()) {
                console.log('UF inválido')
                return res.status(400).json({mensagem: 'UF inválido'})
            }

            //avançar para banco
            const novoUsuarioData = {
                nome: objUsuario.nome,
                email: objUsuario.email,
                telefone: objUsuario.telefone,
                logradouro: objUsuario.rua,
                numero: objUsuario.numero,
                complemento: objUsuario.complemento,
                bairro: objUsuario.bairro,
                cidade: objUsuario.cidade,
                uf: objUsuario.uf,
                data_nascimento: objUsuario.data_nascimento,
                senha: objUsuario.getSenha(),
                cpf: req.body.cpf,
                rg: req.body.rg,
                cep: req.body.cep,
                altura: req.body.altura || null,
                peso: req.body.peso || null,
                tempo: req.body.tempo || null,
                dias: req.body.dias || null
            }

            const novoUsuario = await Usuario.create(novoUsuarioData)
            console.log('Usuário criado com sucesso:', novoUsuario.idAluno)
            res.status(200).json({ mensagem: 'Usuário criado com sucesso!', redirect: '/login' });

        } catch (error) {
            console.error('Erro ao cadastrar:', error)
            res.status(500).json({mensagem: 'Erro ao cadastrar. Tente novamente.'})
        }
    })

    app.post('/login-form', async function(req, res) {
        try {
            let objLoginUsuario = new ClasseUsuarioLogin(
                req.body.email,
                req.body.senha
            )

            if (! await objLoginUsuario.validarEmail()) {
                console.log('Erro no email ao realizar o login')
                return res.status(400).json({mensagem: 'Email não reconhecido'})
            }

            if (! await objLoginUsuario.validarSenha()) {
                console.log('Erro na senha ao realizar o login')
                return res.status(400).json({mensagem: 'Senha inválida'})
            }

            console.log('Login realizado com sucesso')
            res.status(200).json({mensagem: 'Login realizado com sucesso!', redirect: '/'})

        } catch (error) {
            console.error('Erro ao fazer login:', error)
            res.status(500).json({mensagem: 'Erro ao fazer login. Tente novamente.'})
        }
    })

//sevidor (se tudo der certo, na glória de Deus pai)
    const PORT = process.env.PORT || 3000
    app.listen(PORT, function() {
        console.log(`Servidor rodando na porta ${PORT}`)
        console.log(`Acesse: http://localhost:${PORT}`)
    })
