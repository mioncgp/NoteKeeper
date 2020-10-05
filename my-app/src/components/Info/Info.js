import React, { Component } from "react";

class Info extends Component {
  render() {
    const { name, entries } = this.props;
    return (
      <div>
        <div>
          <div className="">{`${name}, your current entry count is...`}</div>
          <div className="">{entries}</div>
        </div>
      </div>
    );
  }
}

export default Info;
