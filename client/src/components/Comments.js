import { useEffect, useState } from "react";
import Comment from "./Comment";

const Comments = ({ selectedUserId }) => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  async function sendComment() {
    const result = await fetch("http://localhost:4000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: input, authorId: selectedUserId }),
    });
    const comment = await result.json();
    setComments((comments) => [...comments, comment]);
  }

  async function fetchComments() {
    const result = await fetch("http://localhost:4000/comments");
    const comments = await result.json();
    setComments(comments);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="Comments">
      <h3 className="Comments-title">
        {comments.length === 1 ? `1 comment` : `${comments.length} comments`}
      </h3>

      <div className="Comments-list">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            isYou={selectedUserId === comment.authorId}
          />
        ))}
      </div>
      <div className="Comments-box">
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            sendComment(input);
            setInput("");
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="body"
            className="Comments-box__input"
          />
          <button
            type="submit"
            disabled={selectedUserId === ""}
            className="Comments-box__btn"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
