import React from "react";
import DeleteNote from "../DeleteNote/DeleteNote";

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
      });
  };

  render() {
    return (
      <div>
        <div className="container">
          {this.props.posts &&
            this.props.posts.map((post, index) => {
              return (
                <div key={post.id}>
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
