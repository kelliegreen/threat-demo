import React from 'react';
import Rebase from 're-base';
import { Link } from 'react-router';

import ThreatsShowNote from './ThreatsShowNote';

var base = Rebase.createClass('https://tmp-threat-db.firebaseio.com/');

class ThreatsShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threat: {}
    }
  }

  init() {
    this.ref = base.bindToState('threats/' + this.router.getCurrentParams().id, {
      context: this,
      state: 'threat'
    });
  }

  componentWillMount(){
    this.router = this.context.router;
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillReceiveProps() {
    base.removeBinding(this.ref);
    this.init();
  }

  handleAddNote() {
    var newNote = this.refs.newNote.getDOMNode().value;
    this.refs.newNote.getDOMNode().value = '';

    this.state.threat.notes = (this.state.threat.notes) ? this.state.threat.notes : [];
    this.state.threat.notes.push({
      text: newNote,
      createdAt: new Date().toISOString()
    });

    base.post('threats/' + this.router.getCurrentParams().id, {
      data: this.state.threat
    });
  }

  handleDeleteNote(idx) {

  }

  render() {
    var notes = (this.state.threat.notes) ? this.state.threat.notes : [];
    var notesToDisplay = notes.map((note, index) => {
      return (
        <ThreatsShowNote note={note} idx={index} key={index}
          onDelete={this.handleDeleteNote.bind(this)} />
      );
    });

    return (
      <div className="ui text container">
        <div className="ui breadcrumb">
          <Link to="threats-index" className="section">Threat List</Link>
          <div className="divider"> / </div>
          <div className="active section">{this.state.threat.name}</div>
        </div>
        <h2 className="ui header">{this.state.threat.name}</h2>
        <div className="ui divider"></div>
        <div className="ui grid">
          <div className="ten wide column">

            <div className="ui comments">
              {notesToDisplay}
              <form className="ui reply form">
                <div className="field">
                  <textarea ref="newNote"></textarea>
                </div>
                <div className="ui orange submit labeled icon button" onClick={this.handleAddNote.bind(this)}>
                  <i className="icon edit"></i> Add Note
                </div>
              </form>
            </div>

          </div>
          <div className="six wide column">
            <div className="ui raised segments">
              <h5 className="ui top attached header">
                Threat Name
              </h5>
              <div className="ui attached segment">
                <p>{this.state.threat.name}</p>
              </div>
              <h5 className="ui attached header">
                Is Threat Closed?
              </h5>
              <div className="ui attached segment">
                <p>{this.state.threat.isClosed ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

ThreatsShow.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default ThreatsShow;