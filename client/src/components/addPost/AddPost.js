import React from "react";
// import "./ImageLinkForm.css";
import Posts from "../Posts/Posts";
import Info from "../Info/Info";

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
        );
    }
  };

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
    return (
      <div>
        <div className="center">
          <div className="form center pa4 br3 shadow-5">
            <input
              className="f4 pa2 w-70 center"
              type="text"
              onChange={this.onInputChange}
              value={this.state.input}
            />
            <textarea
              className="f4 pa2 w-70 center"
              type="text"
              onChange={this.onInputChangeText}
              value={this.state.inputText}
            ></textarea>

            <button
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
              onClick={this.onButtonSubmit}
            >
              Detect
            </button>
          </div>
          <Info name={this.props.name} entries={this.state.entries} />
          {this.state.posts.length !== 0 ? (
            <div>
              <Posts posts={this.state.posts} update={this.updateUI} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AddPost;
