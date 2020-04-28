const express = require("express");

const server = express();

//Query params = ?users=1
//Route params = /users/1
//Request body = { "name": "Joao", "email": "joaoemersonufc@gmail.com" }

const users = ["Joao", "Diego", "Victor"];

//localhost:3000/users
server.get("/users/:index", (req, res) => {
  //Vai consumir dados no get que vierem através do query param
  //const nome = req.query.nome;

  //desestruturação = const { id } = req.params; funciona da mesma forma
  const index = req.params.index;

  //return res.send("Hello World");
  //return res.json({ message: `Buscando usuário ${id}` });
  return res.json(users[index]);
});

//localhost:3000
server.listen(3000);
