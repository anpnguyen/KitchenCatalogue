import React from 'react';
import LoginContainer from './components/Login/loginContainer'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import './App.css';
import IndexContainer from './components/Home/indexContainer';
// import Index from './components/Home/index';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Switch >
          <Route 
              exact
              path='/'
              render={IndexContainer}
          />
            <Route 
              exact
              path='/login'
              render={LoginContainer}
            />

          

        </Switch>
      </BrowserRouter> 

        
      
    </div>
  );
}

export default App;
