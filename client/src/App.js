import React, { useEffect } from "react";
import LoginContainer from "./components/Login/loginContainer";

import PrivateRoute from "./components/routing/PrivateRoute";
import IndexContainer from "./components/Layout/indexContainer";
import IndividualRecipe from "./components/Recipes/individualRecipe";
import NewRecipeContainer from "./components/Recipes/newRecipeContainer";
import EditIndividualRecipe from "./components/Recipes/EditIndividualRecipe";
import SearchContainer from "./components/Layout/searchContainer";
import NotFound from "./components/Layout/notFound";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

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

            <PrivateRoute path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
