import React, {useEffect} from 'react';
import LoginContainer from './components/Login/loginContainer'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import PrivateRoute from './components/routing/PrivateRoute'

import './App.css';
import IndexContainer from './components/Home/indexContainer';
import IndividualRecipe from './components/Home/Recipes/individualRecipe'
// import Test from './components/Home/Recipes/Test'
// import TestContainer from './components/TestContainer'
// import NavBar from './components/Home/navBar'
// import SearchBar from './components/Home/searchBar'
// import NewRecipe from './components/Home/Recipes/newRecipe'
import NewRecipeContainer from './components/Home/Recipes/newRecipeContainer'


// redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}



function App() {

  // if there is a token in the local storage, it will automaticall log the user in
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
       <Provider store={store}>
        
        <BrowserRouter>
          <Switch >

            
            <Route 
                exact
                path='/'
                render={LoginContainer}
            />
              <Route 
                exact
                path='/login'
                render={LoginContainer}
              />

              <PrivateRoute 
                exact 
                path='/home' 
                component={IndexContainer} />


                <PrivateRoute
                exact
                path='/recipe/new'
                component={NewRecipeContainer}/>
                
                <PrivateRoute
                exact
                path='/recipe/:recipe_id'
                component={IndividualRecipe}/>
                
               

            

            
            

          </Switch>
        </BrowserRouter> 
      </Provider>

        
      
    </div>
  );
}



export default App;
