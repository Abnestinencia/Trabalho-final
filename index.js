import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true}))

const porta = 7000;
const host = "0.0.0.0";

/*-- LOGIN --*/
function login(req, res){
    res.send(`<html>
                <head>
                    <title>Login</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                    <a class="navbar-brand" href="#">Login</a>
                    <form method="POST" action="/">
                    <div class="form-group">
                        <label for="exampleInputName1">Nome</label>
                        <input type="text" class="form-control" id="exampleInputName1" placeholder="Vitor" name="nome">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Senha</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="senha123" name="senha">
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
              </html>`);
}

/*-- CADASTRO --*/

function cadastrar(req, res){
    res.send(`<html>
        <head>
            <title>Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        <body>
            <form method="POST" action="/">
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

app.get('/', login);
app.get('/cadastrar', cadastrar);

app.listen(porta, host, () => {
    console.log(`Está no ar, Endereço: http://${host}:${porta}`);
})