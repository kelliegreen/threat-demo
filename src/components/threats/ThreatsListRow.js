import React from 'react';
import { Link } from 'react-router';

class ThreatsListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editName: props.threat.name
    }
  }

  handleToggleEditing() {
    var isEditing = (this.state.isEditing) ? false : true;
    this.setState({
      isEditing: isEditing
    });
  }

  handleThreatNameChange(evt) {
    this.setState({editName: evt.target.value});
  }

  handleDelete() {
    this.props.onDelete(this.props.idx);
  }

  handleUpdate() {
    var newThreatName = this.refs.threatName.getDOMNode().value;
    this.refs.threatName.getDOMNode().value = '';

    if(newThreatName !== null && newThreatName !== undefined && newThreatName !== '') {
      this.props.onUpdate(this.props.idx, newThreatName);
      this.handleToggleEditing();
    }
  }

  render() {
    var updatedDate = new Date(this.props.threat.updatedAt).toLocaleString('en-US');

    if(!this.state.isEditing && !this.props.threat.isClosed) {
      return (
        <tr>
          <td>
            <Link to="threats-show" params={{id: this.props.idx}}>{this.props.threat.name}</Link>
          </td>
          <td>{updatedDate}</td>
          <td>
            <div className="small ui icon buttons">
              <button className="ui button" onClick={this.handleToggleEditing.bind(this)}>
                <i className="edit icon"></i>
              </button>
              <button className="ui button" onClick={this.handleDelete.bind(this)}>
                <i className="remove icon"></i>
              </button>
            </div>
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>
            <div className="ui input">
              <input type="text" placeholder="Threat Name" value={this.state.editName}
                ref="threatName" onChange={this.handleThreatNameChange.bind(this)} />
            </div>
          </td>
          <td>{updatedDate}</td>
          <td>
            <div className="small ui icon buttons">
              <button type="submit" className="ui button" onClick={this.handleUpdate.bind(this)}>
                <i className="checkmark icon"></i>
              </button>
              <button className="ui button" onClick={this.handleToggleEditing.bind(this)} >
                <i className="ban icon"></i>
              </button>
            </div>
          </td>
        </tr>
      );
    }
  }
};

ThreatsListRow.propTypes = {
  threat: React.PropTypes.object.isRequired,
  idx: React.PropTypes.number.isRequired,
  onUpdate: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired
};

export default ThreatsListRow;