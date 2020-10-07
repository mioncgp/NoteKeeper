import React, { Component } from "react";

class Info extends Component {
  render() {
    const { name, entries } = this.props;
    return (
      <div>
        <div>
          <div className="">{`Hello ${name[0].toUpperCase()}${name
            .slice(1)
            .toLowerCase()}, your number of notes is`}</div>
          <div className="">{entries}</div>
        </div>
      </div>
    );
  }
}

export default Info;
