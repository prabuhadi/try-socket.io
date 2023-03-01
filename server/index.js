const express = require("express");
const app = express();

const http = require("http").Server(app);
const cors = require("cors");

const { users } = require("./lib/users");
const { listComments, createComment } = require("./lib/comments");

const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/comments", (req, res) => {
  const comments = listComments();
  res.json(comments);
});

app.post("/comments", (req, res) => {
  const comment = createComment(req.body);
  res.json(comment);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
