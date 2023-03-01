const { findUserById, users } = require("./users");

let comments = [];
let lastId = 1;

function getCommentWithAuthor(comment) {
  return { ...comment, author: findUserById(comment.authorId) };
}

function createComment(params) {
  const comment = {
    id: lastId++,
    body: params.body,
    authorId: params.authorId,
    insertedAt: new Date().toISOString(),
  };

  comments.push(comment);

  const commentWithAuthor = getCommentWithAuthor(comment);
  return commentWithAuthor;
}

function listComments() {
  return comments.map((comment) => getCommentWithAuthor(comment));
}

module.exports = { createComment, listComments };
