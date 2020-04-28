const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
var qntdReqs = 0;

function checkReqs(req, res, next) {
  qntdReqs++;
  console.log(`Qntd de requisições: ${qntdReqs}`);

  return next();
}

function checkProjectExists(req, res, next) {
  if (!req.body.title) {
    return res.status(400).json({ error: "Name of project is required" });
  }

  return next();
}

server.get("/projects/", checkReqs, (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkReqs, (req, res) => {
  return res.json(req.projects);
});

server.post("/projects/", checkReqs, checkProjectExists, (req, res) => {
  const { title } = req.body;

  projects.push(title);
  console.log(projects);
  return res.json(projects);
});

server.post(
  "/projects/:id/tasks",
  checkReqs,
  checkProjectExists,
  (req, res) => {
    const { id } = req.params;

    const { title } = req.body;

    projects[id].push(title);

    return res.json(projects);
  }
);

server.put("/projects/:id", checkReqs, checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id] = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkReqs, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.json(projects);
});

server.listen(3000);
