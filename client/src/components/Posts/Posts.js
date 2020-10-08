import React from "react";
import DeleteNote from "../DeleteNote/DeleteNote";
import "./posts-style.css";

class Posts extends React.Component {
  delete = (id) => {
    fetch("http://localhost:3001/delete", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "deleted") {
          this.props.update(id);
        }
      })
      .catch((err) => err.json("something went wrong"));
  };

  render() {
    return (
      <div className="container-posts">
        <div className="posts">
          {this.props.posts &&
            this.props.posts.map((post, index) => {
              return (
                <div key={post.id} className="post">
                  <p>{`Number: ${index + 1}`}</p>
                  <h5>{`Title: ${post.title}`}</h5>
                  <p>{`Text: ${post.text}`}</p>
                  <DeleteNote id={post.id} delete={this.delete} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Posts;
