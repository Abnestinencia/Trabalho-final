import express from "express";

const app = express();

const porta = 6000
const host = "0.0.0.0"

/*-- LOGIN --*/
function login(req, res){
    res.send(`<html>
                <head>
                    <title>Login</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                    <form method="POST" action="">
                    <div class="form-group">
                        <label for="exampleInputPassword1">Nome</label>
                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Vitor" name="nome">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Senha</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="senha123" name="senha">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </body>
              </html>`)
}


app.get('/', login);

app.listen(porta, host, () => {
    console.log(`Está no ar, Endereço: http://${host}:${porta}`);
})