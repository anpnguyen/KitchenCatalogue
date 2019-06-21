import React, { useEffect } from "react";
import LoginContainer from "./components/Login/loginContainer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";

import IndexContainer from "./components/Layout/indexContainer";
import IndividualRecipe from "./components/Recipes/individualRecipe";
import NewRecipeContainer from "./components/Recipes/newRecipeContainer";
import EditIndividualRecipe from "./components/Recipes/EditIndividualRecipe";
import SearchContainer from "./components/Layout/searchContainer";
import NotFound from './components/Layout/notFound'
import "./App.css";

// redux
import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

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
          <Switch>
            <Route exact path="/" render={LoginContainer} />
            <Route exact path="/login" render={LoginContainer} />

            <PrivateRoute exact path="/recipe" component={IndexContainer} />

            <PrivateRoute
              exact
              path="/recipe/search"
              component={SearchContainer}
            />

            <PrivateRoute
              exact
              path="/recipe/new"
              component={NewRecipeContainer}
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
            />

            <PrivateRoute
              
              path='*'
              component={NotFound}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
