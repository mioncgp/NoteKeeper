import React from "react";
import Posts from "../Posts/Posts";
import Info from "../Info/Info";
import "./addpost-style.css";

class AddPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      entries: this.props.entries,
      posts: [],
      input: "",
      inputText: "",
      update: 0,
    };
  }

  updateUI = (id) => {
    const updated = this.state.posts.filter((post) => {
      return post.id !== id;
    });
    this.setState({
      posts: [...updated],
    });
    this.setState({ entries: this.state.entries - 1 });
  };

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onInputChangeText = (e) => {
    this.setState({ inputText: e.target.value });
  };

  onButtonSubmit = (e) => {
    const { input, inputText } = this.state;
    if (input.length > 1 && inputText.length > 1) {
      fetch("http://localhost:3001/post", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.id,
          input: this.state.input,
          inputText: this.state.inputText,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) =>
          this.setState({
            posts: [...this.state.posts, data.post[0]],
            entries: data.data[0],
            input: "",
            inputText: "",
          })
        )
        .catch((err) => {
          throw "something went wrong";
        });
    }
  };

  componentDidMount() {
    fetch("http://localhost:3001/getposts", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.props.id,
      }),
    })
      .then((response) =>
        response.json().then((posts) => this.setState({ posts: posts }))
      )
      .catch((err) => {
        throw "something went wrong";
      });
  }

  render() {
    return (
      <div>
        <div className="container-addpost">
          <div className="flex-addpost">
            <div className="flex-item-addpost">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                className="title-input"
                type="text"
                onChange={this.onInputChange}
                value={this.state.input}
              />
            </div>
            <div className="flex-item-addpost">
              <label htmlFor="ta">Text</label>
              <textarea
                id="ta"
                className="ta-input"
                type="text"
                onChange={this.onInputChangeText}
                value={this.state.inputText}
                rows="5"
                cols="35"
              ></textarea>
            </div>
            <div className="flex-item-addpost">
              <button className="add-note-btn" onClick={this.onButtonSubmit}>
                Add Note
              </button>
            </div>
            <div className="flex-item-addpost">
              <Info name={this.props.name} entries={this.state.entries} />
            </div>
          </div>
        </div>
        {this.state.posts.length !== 0 ? (
          <Posts posts={this.state.posts} update={this.updateUI} />
        ) : null}
      </div>
    );
  }
}

export default AddPost;
