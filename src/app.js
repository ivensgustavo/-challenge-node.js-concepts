const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

function validateId(request, response, next){
  const {id} = request.params;

  repositorieIndex = repositories.findIndex((repositorie) => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: "The id is invalid."});
  }

  return next();

}

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const id = uuid();
  const {title, url, techs} = request.body;
  
  repositorie = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", validateId, (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const repositorieIndex = repositories.findIndex((repositorie) => repositorie.id === id);
  const likes = repositories[repositorieIndex].likes;

  repositorie = {
    id,
    title,
    url,
    techs,
    likes,
  }

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", validateId, (request, response) => {
  const {id} = request.params;

  repositorieIndex = repositories.findIndex((repositorie) => repositorie.id === id);

  repositories.splice(repositorieIndex, 1);

  return response.sendStatus(204);

});

app.post("/repositories/:id/like", validateId, (request, response) => {
  const {id} = request.params;

  repositorieIndex = repositories.findIndex((repositorie) => repositorie.id === id);
  
  repositories[repositorieIndex].likes = repositories[repositorieIndex].likes + 1;

  return response.json(repositories[repositorieIndex]);

});

module.exports = app;
