import React, { Component } from "react";
import "./info-style.css";

class Info extends Component {
  render() {
    const { name, entries } = this.props;
    return (
      <div>
        <div className="container-info">
          <div>
            Hello
            <span className="name">{` ${name[0].toUpperCase()}${name
              .slice(1)
              .toLowerCase()}, `}</span>
            your note count is:
          </div>
          <div className="count name">{entries}</div>
        </div>
      </div>
    );
  }
}

export default Info;
