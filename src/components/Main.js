/*
* Main.js
* @description Application bootstrap
*/

import React from 'react';
import { Link, RouteHandler } from 'react-router';

import Styles from '../styles/Main.scss';

class Main extends React.Component {
  render() {
    return(
      <div>
        <div className="ui borderless main menu">
          <div className="ui text container">
            <div className="header item">
              <img className="logo" src="images/logo.png" alt="AB Demo" />
            </div>
            <Link to="app-index" className="item">
              Welcome
            </Link>
            <Link to="threats-index" className="item">
              Threat List
            </Link>
          </div>
        </div>
        <div className="main-container">
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
};

export default Main;