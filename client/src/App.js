import React, {useEffect} from 'react';
import LoginContainer from './components/Login/loginContainer'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import PrivateRoute from './components/routing/PrivateRoute'

import './App.css';
import IndexContainer from './components/Home/indexContainer';
import IndividualRecipe from './components/Home/Recipes/individualRecipe'
import NewRecipeContainer from './components/Home/Recipes/newRecipeContainer'
import EditIndividualRecipe from './components/Home/Recipes/EditIndividualRecipe'
import Recipes from './components/Home/Recipes/recipes'



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
                path='/recipe'
                component={Recipes}/>
             
              


                <PrivateRoute
                exact
                path='/recipe/new'
                component={NewRecipeContainer}/>
                
                <PrivateRoute
                exact
                path='/recipe/:recipe_id'
                component={IndividualRecipe}/>
                
                <PrivateRoute
                exact
                path='/recipe/:recipe_id/edit'
                component={EditIndividualRecipe}/>
                
               

            

            
            

          </Switch>
        </BrowserRouter> 
      </Provider>

        
      
    </div>
  );
}



export default App;
