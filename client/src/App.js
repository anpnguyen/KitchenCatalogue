import React from 'react';
import LoginContainer from './components/Login/loginContainer'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import './App.css';
import IndexContainer from './components/Home/indexContainer';
// import Index from './components/Home/index';


// redux
// import { Provider } from 'react-redux';
// import store from './store';

function App() {
  return (
    <div className="App">
       {/* <Provider store={store}> */}
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
      {/* </Provider> */}

        
      
    </div>
  );
}

export default App;
