import React from 'react';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="ui text container">
        <div className="ui raised segment">
          <p>Welcome to my Simple Threat Manager Demo. This is a small application utilizing React, WebPack, and Firebase.</p>
          <p>For source and setup instructions please see the <i className="github icon"></i>repo here.</p>
        </div>
      </div>
    );
  }
};

export default Dashboard;