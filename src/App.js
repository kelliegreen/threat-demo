/*
* App.js
* @description Application bootstrap
*/

import React from 'react';
import Router from 'react-router';
import routes from './config/Routes';

/*
* Router.run
* @description Boots our app and initializes state based on current path
*/
Router.run(routes, (Root, state) => {
  React.render(<Root {...state} />, document.body);
});