import React, { Component } from "react";

class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/getposts", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.props.id,
      }),
    }).then((response) =>
      response.json().then((posts) => this.setState({ posts: posts }))
    );
  }

  render() {
    console.log("ren");
    const { name, entries } = this.props;
    return (
      <div>
        <div>
          <div className="">{`${name}, your current entry count is...`}</div>
          <div className="">{entries}</div>
        </div>
        <div className="container">
          {this.state.posts &&
            this.state.posts.map((post) => {
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

export default Rank;
