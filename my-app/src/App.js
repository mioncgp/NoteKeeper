import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      post: [],
      input: "",
      inputText: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
    this.setState({ inputText: e.target.value });
  };

  onButtonSubmit = (e) => {
    const { input, inputText } = this.state;
    if (input.length > 1 && inputText.length > 1) {
      fetch("http://localhost:3001/post", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.user.id,
          input: this.state.input,
          inputText: this.state.inputText,
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => this.setState({ post: data.post }));
    }
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.date,
      },
    });
  };

  render() {
    const { isSignedIn, route, user, post } = this.state;
    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={user.name}
              entries={user.entries}
              post={post}
              id={user.id}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
