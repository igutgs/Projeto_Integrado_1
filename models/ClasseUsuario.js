const db = require('../config/db')
const Usuario = require('../config/Usuario')

class ClasseUsuario {

    #senha
    #confirmarSenha

    constructor(nome, email, telefone, rua, numero, complemento, bairro, cidade, uf, data_nascimento, senha, confirmarsenha) {
        this.nome = nome
        this.email = email
        this.telefone = telefone
        this.rua = rua
        this.numero = numero
        this.complemento = complemento
        this.bairro = bairro
        this.cidade = cidade
        this.uf = uf
        this.data_nascimento = data_nascimento

        this.setSenha(senha, confirmarsenha)
    }

    setSenha(senha, confirmarSenha) {
        this.#senha = senha
        this.#confirmarSenha = confirmarSenha
    }

    getSenha() {
        return this.#senha
    }
    
    validarNome() {
        if (!this.nome || this.nome.trim().length === 0) {
            return false
        }

        const caracteresInvalidos = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/',':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']

        for (let i = 0; i < this.nome.length; i++) {
            if (caracteresInvalidos.includes(this.nome[i])) {
                return false
            }
        }

        return true
    }

    async validarEmail() {
        if (!this.email || this.email.trim().length === 0) {
            return false
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(this.email)) {
            return false
        }

        if (this.email.length > 254) {
            return false
        }

        const emailExistente = await Usuario.findOne({ where: { email: this.email } })

        if (emailExistente) {
            return false
        }

        return true
    }

    async validarTelefone() {
        this.telefone = this.telefone.replace(/\D/g, "")

        if (!this.telefone || this.telefone.trim().length === 0) {
            return false
        }

        if (this.telefone.length < 10 || this.telefone.length > 11) {
            return false
        }

        const numerosValidos = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        for (let i = 0; i < this.telefone.length; i++) {
            if (!numerosValidos.includes(this.telefone[i])) {
                return false
            }
        }

        const telefoneExistente = await Usuario.findOne({ where: { telefone: this.telefone } })

        if (telefoneExistente) {
            return false
        }

        return true

    // FUTURAMENTE: fazer uma validação que verifique se o DDD é válido. Fazer isso a partir de um array
    }

    validarSenha() {
        const letraMaiuscula = /[A-Z]/
        const letraMinuscula = /[a-z]/
        const numero = /\d/
        const caractereEspecial = /[!@#$%^&*(),.?":{}|<>[\]\\._+-=;:'" ]/

        if (!this.#senha || this.#senha.trim().length === 0) {
            console.log('ERRO: SENHA EM BRANCO')
            return false
        }

        if (!letraMaiuscula.test(this.#senha)) {
            console.log('ERRO: SENHA SEM LETRA MAIUSCULA')
            return false
        }

        if (!letraMinuscula.test(this.#senha)) {
            console.log('ERRO: SENHA SEM LETRA MINUSCULA')
            return false
        }
            if (!numero.test(this.#senha)) {
            console.log('ERRO: SENHA SEM NÚMERO')
            return false
        }

        if (!caractereEspecial.test(this.#senha)) {
            console.log('ERRO: SENHA SEM CARACTERE ESPECIAL')
            return false
        }

        if (this.#senha.length < 8 || this.#senha.length > 64) {
            console.log('ERRO: SENHA DE TAMANHO ERRADO')
            return false
        }

        if (this.#senha !== this.#confirmarSenha) {
            console.log('ERRO: SENHA E CONFIRMAR SENHA DIFERENTES')
            return false
        }

        return true
    }

    validarDataNascimento(){

        function calcularIdade() {
            let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
            const mesAtual = dataAtual.getMonth();
            const mesNasc = dataNascimento.getMonth();
            const diaAtual = dataAtual.getDate();
            const diaNasc = dataNascimento.getDate();

            if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
                idade--;
            }

            return idade
        }

        let dataAtual = new Date()
        let dataNascimento = new Date(this.data_nascimento)

        let idade = calcularIdade()

        if (!this.data_nascimento || this.data_nascimento.trim().length === 0) {
            return false
        }

        if (dataNascimento > dataAtual) {
            return false
        }

        if (idade < 18) {
            return false
        } else if (idade > 100) {
            return false
        }

        return true
    }

    validarRua(){
        const caracteresInvalidos = ['"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']

        for (let i = 0; i < this.rua.length; i++) {
            if (caracteresInvalidos.includes(this.rua[i])) {
                return false
            }
        }

        if (!this.rua || this.rua.trim().length === 0) {
            return false
        }

        return true
    }

    validarNumero(){
        const caracteresInvalidos = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']

        for (let i = 0; i < this.numero.length; i++) {
            if (caracteresInvalidos.includes(this.numero[i])) {
                return false
            }
        }

        if (!this.numero || this.numero.trim().length === 0) {
            return false
        }

        return true
    }

    validarBairro(){
        const caracteresInvalidos = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']

        for (let i = 0; i < this.bairro.length; i++) {
            if (caracteresInvalidos.includes(this.bairro[i])) {
                return false
            }
        }
        if (!this.bairro || this.bairro.trim().length === 0) {
        return false
        }

        return true
    }

    validarCidade(){
        const caracteresInvalidos = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']

        for (let i = 0; i < this.cidade.length; i++) {
            if (caracteresInvalidos.includes(this.cidade[i])) {
                return false
            }
        }

        if (!this.cidade || this.cidade.trim().length === 0) {
            return false
        }

        return true
    }

    validarUF(){
        const caracteresInvalidos = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']

        for (let i = 0; i < this.uf.length; i++) {
            if (caracteresInvalidos.includes(this.uf[i])) {
                return false
            }
        }

        if (!this.uf || this.uf.trim().length === 0) {
            return false
        }

        return true
    }

}

class ClasseUsuarioLogin extends ClasseUsuario {

    #senha

    constructor(email,senha){
        super("", email, "", "", "", "", "", "", "", "", senha, "")
        this.#senha = senha
    }

    async validarEmail(){
        if (!this.email || this.email.trim().length === 0) {
            return false
        }

        const emailExistente = await Usuario.findOne({ where: { email: this.email } })

        if (!emailExistente) {
            return false
        }

        return true
    }

    async validarSenha(){

        const usuario = await Usuario.findOne({ where: { email: this.email } })

        if (!this.#senha || this.#senha.trim().length === 0) {
            return false
        }

        if (usuario.senha !== this.#senha) {
            return false
        }

        return true
    }
}

module.exports = { ClasseUsuario, ClasseUsuarioLogin }
