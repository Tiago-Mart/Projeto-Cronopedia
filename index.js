const port = process.env.PORT || 3000;

// Express.Js
const express = require("express");
const app = express();

// Body parsing
const bodyParser = require("body-parser");

// Definindo a pasta com os arquivos estaticos do projeto
const path = require("path");
let htmlPath = path.join(__dirname + "/Paginas");

// dotenv
require("dotenv").config();
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.dff1c.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const USERSCOLLECTION = process.env.USERCOLLECTION;
const ARTICLESCOLLECTION = process.env.ARTICLESCOLLECTION;

//    Importar o MongoDB
const { MongoClient, ObjectId } = require("mongodb");

async function main() {
  // conexão com o banco de dados
  const client = await MongoClient.connect(DB_URL);
  const db = client.db(DB_NAME);

  //    Procurar pelas collection que criamos
  // const UserCollection = db.collection(USERSCOLLECTION);
  const articlesCollection = db.collection(ARTICLESCOLLECTION);

  // Formatando o corpo do requerimento com body-parser
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(htmlPath));

  // Servindo a pagina principal
  app.get("/", (req, res) => {
    express.static(htmlPath);
  });

  // Servindo a solicitação de pesquisa
  app.get("/search", async (req, res) => {
    const termo = req.query.q;

    const item = await articlesCollection.find({ resume: { $regex: termo } }).limit(5).toArray();


    if (item) {
      res.send(item);
    } else {
      res.send({ error: "Nenhum resultado encontrado" });
    }
  });

  // Servindo a pagina de teste
  app.get("/teste", (req, res) => {
    res.status(200).sendFile(path.join(htmlPath + "/teste.html"));
  });

  // Servindo a pagina de acesso restrito
  app.post("/acesso-restrito", (req, res) => {
    const { nome, email } = req.body;

    if (email == process.env.EMAIL && nome === process.env.NOME) {
      // se for igual a 1
      res.send("<h1>Acesso Autorizado</h1>");
    } else {
      // se não for igual a 1, retornar a pagina principal
      res.sendFile(path.join(htmlPath + "/errors/403.html"));
    }
  });

  // Servindo a pagina de erro 403 (acesso negado)
  app.get("/403.html", (req, res) => {
    res.status(403);
    res.sendFile(path.join(htmlPath + "/errors/403.html"));
  });

  // Servindo a pagina de erro 404 (pagina não encontrada)
  app.get("*", (req, res) => {
    res.status(404);
    res.sendFile(path.join(htmlPath + "/errors/404.html"));
  });
}

main();

console.log("Listening port: " + port);
app.listen(port);
