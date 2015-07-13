import React from 'react';

class ThreatsShowNote extends React.Component {
  render() {
    var createdDate = new Date(this.props.note.createdAt).toLocaleString('en-US');

    return (
      <div className="comment">
        <a className="avatar">
          <img src="images/avatar.png" />
        </a>
        <div className="content">
          <a className="author">A Firebase User</a>
          <div className="metadata">
            <div className="date">{createdDate}</div>
          </div>
          <div className="text">
            <p>{this.props.note.text}</p>
          </div>
          <div className="actions">
            <a className="reply">Delete</a>
          </div>
        </div>
      </div>
    );
  }
};

ThreatsShowNote.propTypes = {
  note: React.PropTypes.object.isRequired,
  idx: React.PropTypes.number.isRequired,
  onDelete: React.PropTypes.func.isRequired
};

export default ThreatsShowNote;