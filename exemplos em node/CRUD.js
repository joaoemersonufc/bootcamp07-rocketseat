const express = require("express");

const server = express();

server.use(express.json());

// CRUD - CREATE, READ, UPDATE, DELETE
const users = ["Joao", "Diego", "Victor"];

server.get("/users/", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", (req, res) => {
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
