import React, { useEffect } from "react";
import LoginContainer from "./components/Login/loginContainer";
import PrivateRoute from "./components/routing/PrivateRoute";
// import IndexContainer from "./components/Layout/indexContainer";
import IndividualRecipe from "./components/Recipes/individualRecipe";
import EditIndividualRecipe from "./components/Recipes/EditIndividualRecipe";
import Home from "./components/Layout/home";
import SearchContainer from "./components/Layout/searchContainer";
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

            {/* <PrivateRoute 
              exact 
              path="/recipe" 
              component={Home} 
              option ='recipe'
            /> */}

            {/* <PrivateRoute
              exact
              path="/recipe/search"
              component={Home}
              option = 'search'
            /> */}

            {/* <PrivateRoute
              exact
              path="/recipe/new"
              component={EditIndividualRecipe}
              option='newRecipe'
            /> */}

            {/* <PrivateRoute
              exact
              path="/recipe/:recipe_id"
              component={IndividualRecipe}
            /> */}

            {/* <PrivateRoute
              exact
              path="/recipe/:recipe_id/edit"
              component={EditIndividualRecipe}
              option='edit'
            /> */}

            {/* <PrivateRoute 
              exact 
              path="/cookbook" 
              component={Home} 
              option = 'cookbook'
            /> */}
            {/* <PrivateRoute 
              exact 
              path="/cookbook/:cookbook_id" 
              component={Home} 
              option = 'cookbookRecipes'
            /> */}


            <PrivateRoute 
              exact 
              path="/a"
              component={MyRecipes} 
              
            />
            <PrivateRoute 
              exact 
              path="/b"
              component={MyCookbooks} 
              
            />
            <PrivateRoute 
              exact 
              path="/c"
              component={MyCookbookRecipes} 
              
            />


            <PrivateRoute path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
};



export default App;
