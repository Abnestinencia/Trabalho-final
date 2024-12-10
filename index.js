import express from "express";
import session from "express-session";

const app = express();

app.use(session({
    secret: '',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}))

app.use(express.urlencoded({ extended: true}))

app.use(express.static('./paginas/public'))

const porta = 7000;
const host = "0.0.0.0";

/*-- INICIO --*/
function inicio(req, res){
        resp.redirect('/login.html');
}

/*-- MENU --*/

/*-- BATE-PAPO --*/

/*-- CADASTRO --*/

function cadastrar(req, res){
    res.send(`<html>
        <head>
            <title>Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
            <form method="POST" action="/batepapo">
            <div class="form-group">
                <label for="exampleInputName1">Nome</label>
                <input type="text" class="form-control" id="exampleInputName1" placeholder="Paulo Ribeira" name="nome">
            </div>
            <div class="form-group">
                <label for="exampleInputName2">Data de Nascimento</label>
                <input type="text" class="form-control" id="exampleInputDate1" placeholder="28/06/2004" name="data">
            </div>
            <div class="form-group">
                <label for="exampleInputName3">Nickname/Apelido</label>
                <input type="text" class="form-control" id="exampleInputName3" placeholder="Zé" name="apelido">
            </div>

            <button type="submit" class="btn btn-primary">Cadastrar</button>
            </form>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </html>`);
}

/*-- AUTENTICAR --*/

function autenticarUsuario(req, resp){
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if(usuario === '' && senha === ''){
        req.session.usuarioLogado = true;
        resp.redirect('/menu')
    }
    else{
        resp.send(`
                    <head>
                            <title>Tente novamente</title>
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                            <meta charset="utf-8">
                        </head>
                        <body>
                            <div class="container w-25">
                                <div class="alert alert-danger" role="alert">
                                    Usuario ou senha invalidos
                                </div>
                                <div>
                                    <a href="/login.html" class="btn btn-primary">Tentar Novamente</a>
                                </div>
                            </div>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                    </html>
            `);
    }
}

/*-- VALIDAR AUTENTICAÇÃO --*/
function verificarAutent(req, resp, next){
    if(req.session.usuarioLogado){
        next();
    }
    else
    {
        resp.redirect('/login.html')
    }
}

/*-- ROTAS --*/
app.post('/cadastrar', (req, res) => {
    const nome = req.body.nome;
    const data = req.body.data;
    const apelido = req.body.apelido;

    res.send(`<h1>Cadastrado!</h1>`);
});

app.post('/login', autenticarUsuario);
app.get('/', inicio);
app.get('/cadastrar', verificarAutent cadastrar);

app.listen(porta, host, () => {
    console.log(`Está no ar, Endereço: http://${host}:${porta}`);
})