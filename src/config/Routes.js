/*
* Routes.js
* @description List of application routes and handlers
*/

import React from 'react';
import { Router, Route, DefaultRoute } from 'react-router';

import Main from '../components/Main';
import Dashboard from '../components/Dashboard';
import ThreatsShow from '../components/threats/ThreatsShow';
import ThreatsList from '../components/threats/ThreatsList';

export default (
  <Route name="app" path="/" handler={Main}>
    <Route name="threats" path="/threats">
      <Route name="threats-show" path=":id" handler={ThreatsShow} />
      <DefaultRoute name="threats-index" handler={ThreatsList} />
    </Route>
    <DefaultRoute name="app-index" handler={Dashboard} />
  </Route>
);