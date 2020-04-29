const express = require("express");

const server = express();

server.use(express.json());

// CRUD - CREATE, READ, UPDATE, DELETE
const users = ["Joao", "Diego", "Victor"];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`O método utilizado: ${req.method}; URL atual: ${req.url}`);

  return next();
  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "Username is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

server.get("/users/", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  //Encontro a posição(index) na rota
  const { index } = req.params;
  //Corpo da requisição(nome desejado)
  const { name } = req.body;

  //Sobreponho o usuário com o que está no corpo da requisição
  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
});

//localhost:3000
server.listen(3000);
