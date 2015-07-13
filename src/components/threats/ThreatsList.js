import React from 'react';
import Rebase from 're-base';

import ThreatsListRow from './ThreatsListRow';

var base = Rebase.createClass('https://tmp-threat-db.firebaseio.com/');

class ThreatsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threats: []
    }
  }

  init() {
    this.ref = base.bindToState('threats', {
      context: this,
      asArray: true,
      state: 'threats'
    });
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

  getThreatAtIndex(index) {
    return this.state.threats[index];
  }

  handleNewThreat() {
    var newThreatName = this.refs.newThreat.getDOMNode().value;
    this.refs.newThreat.getDOMNode().value = '';

    if(newThreatName !== null && newThreatName !== undefined && newThreatName !== '') {
      var now = new Date().toISOString();
      base.post('threats', {
        data: this.state.threats.concat([{
          name: newThreatName,
          createdAt: now,
          updatedAt: now,
          isClosed: false
        }])
      });
    }
  }

  handleDeleteThreat(idx) {
    var threat = this.getThreatAtIndex(idx);
    threat.isClosed = true;
    base.post('threats/' + idx, {
      data: threat
    });
  }

  handleUpdateThreat(idx, newName) {
    var threat = this.getThreatAtIndex(idx);
    threat.name = newName;
    base.post('threats/' + idx, {
      data: threat
    });
  }

  render() {
    var threats = this.state.threats.map((threat, index) => {
      if(!threat.isClosed) {
        return (
          <ThreatsListRow threat={threat} idx={index} key={index}
            onUpdate={this.handleUpdateThreat.bind(this)} onDelete={this.handleDeleteThreat.bind(this)} />
        );
      }
    });

    return (
      <div className="ui text container">
        <table className="ui orange small table">
          <thead>
            <tr>
              <th>Threat Name</th>
              <th>Last Updated</th>
              <th width="50">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {threats}
          </tbody>
          <tfoot className="full-width">
            <tr>
              <th colSpan="3">
                <form onSubmit={this.handleNewThreat.bind(this)}>
                  <div className="ui action input float-right">
                    <input type="text" ref="newThreat" placeholder="Threat Name" />
                    <button type="submit" className="ui orange right labeled icon button">
                      <i className="spy icon"></i>
                      Add Threat
                    </button>
                  </div>
                </form>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
};

export default ThreatsList;