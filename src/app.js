const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  repo = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0,
  };
  repositories.push(repo);

  return response.status(200).json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const repoIndex = repositories.findIndex(
    (repo) => repo.id === request.params.id
  );

  if (repoIndex < 0) {
    return response.status(400).json({ error: "repository not exists" });
  }

  const { title, url, techs } = request.body;

  repositories[repoIndex].title = title;
  repositories[repoIndex].url = url;
  repositories[repoIndex].techs = techs;

  return response.status(200).json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const repoIndex = repositories.findIndex(
    (repo) => repo.id === request.params.id
  );

  if (repoIndex < 0) {
    return response.status(400).json({ error: "repository not exists" });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const repoIndex = repositories.findIndex(
    (repo) => repo.id === request.params.id
  );

  if (repoIndex < 0) {
    return response.status(400).json({ error: "repository not exists" });
  }
  repositories[repoIndex].likes += 1;

  return response.status(200).json(repositories[repoIndex]);
});

module.exports = app;
