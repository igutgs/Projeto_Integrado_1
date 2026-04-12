const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const port = 3000;
var path = require ('path');
const e = require('express');
const app = express();

var login = "admin";
var password = "123456";

app.use(session({secret:"chavesecreta"}));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.post('/',(req,res) => {
    if(req.body.password == senha && req.body.login == login){
        //logado com sucesso
        req.session.login = login;
        res.render('logado', {login: login});
    }
    else{
        res.render('index');
    }
    
})

app.get('/',(req,res) => {
    if(req.session.login){
        return res.render('logado');
    }
    else{
    res.render('index');
    }
})

app.listen(port, () => {
    console.log('Servidor rodando');
})