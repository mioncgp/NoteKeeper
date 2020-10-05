import React from "react";

class Posts extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          {this.props.posts &&
            this.props.posts.map((post) => {
              return (
                <div key={post.id}>
                  <p>{`Number: ${post.id}`}</p>
                  <h5>{`Title: ${post.title}`}</h5>
                  <p>{`Text: ${post.text}`}</p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Posts;
