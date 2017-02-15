import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

/*
* check if it is from bill
* */
const fromBill = (nextState, transition) =>{
  if(!nextState.location.state || !nextState.location.state.bill){
    transition('/');
  }
};


export default(
  <Router history={browserHistory}>
    <Route path="/" name="Main" component={require('./src/components/App').default} />
    <Route path="/user" name="User" component={require('./src/components/InfoForm').default} onEnter={fromBill}/>
  </Router>
);
