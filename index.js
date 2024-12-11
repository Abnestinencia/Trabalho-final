import express from "express";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();

app.use(session({
    secret: 'S3cr3t',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 30
    }
}));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true}))

app.use(express.static(path.join(process.cwd(), 'paginas/public')));

const porta = 7000;
const host = "localhost";

var listaUsuarios = [];

/*-- MENU --*/
function menu(req, res){
    const dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if(!dataHoraUltimoLogin){
        dataHoraUltimoLogin='';
    }
    res.send(`<html>
                <head>
                    <title>Login</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                <!-- Navbar -->
                <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
                <!-- Container wrapper -->
                <div class="container-fluid">
                    <!-- Toggle button -->
                    <button
                    data-mdb-collapse-init
                    class="navbar-toggler"
                    type="button"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <i class="fas fa-bars"></i>
                    </button>

                    <!-- Collapsible wrapper -->
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Navbar brand -->
                    <h1>Trabalho Final</h1>
                    <!-- Left links -->
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link" href="/cadastrar">Cadastrar Usuarios</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Bate-Papo</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" class="btn btn-danger" href="/logout">Sair</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">Seu ultimo acesso foi realizado em ${dataHoraUltimoLogin}</a>
                        </li>
                    </ul>
                    <!-- Left links -->
                    </div>
                    <!-- Collapsible wrapper -->

                <!-- Container wrapper -->
                </nav>
                <!-- Navbar -->
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
              </html>
      `)
}

/*-- BATE-PAPO --*/

/*-- CADASTRO --*/

function cadastrar(req, res){
    res.send(`<html>
        <head>
            <title>Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
            <form method="POST" action="/cadastrar">
            <div class="form-group">
                <label for="exampleInputName1">Nome</label>
                <input type="text" class="form-control" id="exampleInputName1" placeholder="Paulo Ribeira" name="nome">
            </div>
            <div class="form-group">
                <label for="exampleInputName2">Data de Nascimento</label>
                <input type="date" class="form-control" id="exampleInputDate1" placeholder="28/06/2004" name="data">
            </div>
            <div class="form-group">
                <label for="exampleInputName3">Nickname/Apelido</label>
                <input type="text" class="form-control" id="exampleInputName3" placeholder="Zé" name="apelido">
            </div>

            <button type="submit" class="btn btn-primary">Cadastrar</button>
            </form>
        </body>
        <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
      </html>`);
}

/*-- CADASTRAR USUARIO --*/
function cadastrarUsuario(req, resp){
    const nome = req.body.nome;
    const data = req.body.data;
    const apelido = req.body.apelido;

    if(nome && data && apelido){
        const usuario = {nome, data, apelido}

        listaUsuarios.push(usuario);

        resp.write(`<html>
                        <head>
                            <title>Cadastrado com Sucesso</title>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <meta charset="utf-8">
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                        </head>
                        <body>
                            <h1>Usuario Cadastrado!</h1>
                            <a class="btn btn-primary" href="/cadastrar">Continuar Cadastrando</a>
                            <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                    </html>
                    `)
        
    }
    else{
        resp.write(`<html>
        <head>
            <title>Login</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta charset="utf-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
            <form method="POST" action="/cadastrar">
            <div class="form-group">
                <label for="exampleInputName1">Nome</label>
                <input type="text" class="form-control" id="exampleInputName1" placeholder="Paulo Ribeira" name="nome" value="${nome}">
            </div>
        `);
        if(!nome){
            resp.write(`
                <div>
                    <span><p class="bg-danger">Por favor, você deve informar o nome do Usuario</p></span>
                </div>
                `);
        }
        resp.write(`
            <div class="form-group">
                <label for="exampleInputName2">Data de Nascimento</label>
                <input type="date" class="form-control" id="exampleInputDate1" placeholder="28/06/2004" name="data">
            </div>
            `);
        if(!data){
            resp.write(`
                <div>
                    <span><p class="bg-danger">Por favor, você deve informar a data do Usuario</p></span>
                </div>
                    `);
            }
        resp.write(`
            <div class="form-group">
                <label for="exampleInputName3">Nickname/Apelido</label>
                <input type="text" class="form-control" id="exampleInputName3" placeholder="Zé" name="apelido">
            </div>
            `);
        if(!data){
            resp.write(`
                <div>
                    <span><p class="bg-danger">Por favor, você deve informar o apelido do Usuario</p></span>
                </div>
                    `);
                }
        resp.write(`
            <button type="submit" class="btn btn-primary">Cadastrar</button>
            </form>
            </body>
            <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>
            `)

    }


}

/*-- AUTENTICAR --*/

function autenticarUsuario(req, resp){
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if(usuario === 'usuario' && senha === '10'){
        req.session.usuarioLogado = true;
        resp.cookie('dataHoraUltimoLogin', new Date().toLocaleString(), {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});
        resp.redirect('/')
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

app.get('/logout', (req, resp) => {
    req.session.destroy();
    resp.redirect('/login.html');
})
app.post('/login', autenticarUsuario);
app.get('/', verificarAutent, menu);
app.get('/cadastrar', verificarAutent, cadastrar);
app.post('/cadastrar', cadastrarUsuario);

app.listen(porta, host, () => {
    console.log(`Está no ar, Endereço: http://${host}:${porta}`);
})