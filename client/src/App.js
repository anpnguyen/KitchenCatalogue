import React, { useEffect } from "react";
import LoginContainer from "./components/Login/loginContainer";
import PrivateRoute from "./components/routing/PrivateRoute";
// import IndexContainer from "./components/Layout/indexContainer";
import IndividualRecipe from "./components/Recipes/individualRecipe";
import EditIndividualRecipe from "./components/Recipes/EditIndividualRecipe";
// import Home from "./components/Layout/home";
// import SearchContainer from "./components/Layout/searchContainer";
import NotFound from "./components/Layout/notFound";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import MyRecipes from './components/Layout/MyRecipes'
import MyCookbooks from "./components/Layout/MyCookbooks";
import MyCookbookRecipes from "./components/Layout/MyCookbookRecipes";
import MySearchRecipes from "./components/Layout/MySearchRecipes";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={LoginContainer} />
            <Route exact path="/login" render={LoginContainer} />

            <PrivateRoute 
              exact 
              path="/recipe" 
              component={MyRecipes} 
              
            />

            <PrivateRoute
              exact
              path="/recipe/search"
              component={MySearchRecipes}
              option = 'search'
            />

            <PrivateRoute
              exact
              path="/recipe/new"
              component={EditIndividualRecipe}
              option='newRecipe'
            />

            <PrivateRoute
              exact
              path="/recipe/:recipe_id"
              component={IndividualRecipe}
            />

            <PrivateRoute
              exact
              path="/recipe/:recipe_id/edit"
              component={EditIndividualRecipe}
              option='edit'
            />

            <PrivateRoute 
              exact 
              path="/cookbook" 
              component={MyCookbooks} 
              
            />
            <PrivateRoute 
              exact 
              path="/cookbook/:cookbook_id" 
              component={MyCookbookRecipes} 
              
            />
            {/* <PrivateRoute 
              exact 
              path="/a" 
              component={ViewRecipe} 
              
            /> */}




            <PrivateRoute path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
};



export default App;
