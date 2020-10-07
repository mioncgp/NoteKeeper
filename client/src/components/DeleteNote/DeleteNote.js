import React from "react";

class DeleteNote extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.delete(this.props.id)}>Delete</button>
      </div>
    );
  }
}

export default DeleteNote;
