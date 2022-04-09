const port = process.env.PORT || 3000;

// Express.Js
const express = require("express");
const app = express();

// Body parsing
const body_parser = require("body-parser");

// Definindo a pasta com os arquivos estaticos do projeto
const path = require("path");
var htmlPath = path.join(__dirname + "/Paginas");

// dotenv
require("dotenv").config();
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const COLLECTION = process.env.COLLECTION;
const DB_NAME = process.env.DB_NAME;
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.dff1c.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

//    Importar o MongoDB
const { MongoClient, ObjectId } = require("mongodb");

async function main() {
  // conexão com o banco de dados
  const client = await MongoClient.connect(DB_URL);
  const db = client.db(DB_NAME);

  //    Procurar pelas collection que criamos
  const collection = db.collection(COLLECTION);

  // Formatando o corpo do requerimento com body-parser
  app.use(body_parser.urlencoded({ extended: true }));

  app.use(express.static(htmlPath));

  // Servindo a pagina principal
  app.get("/", (req, res) => {
    express.static(htmlPath);
  });
}
main();

console.log("Listening port: " + port);
app.listen(port);
