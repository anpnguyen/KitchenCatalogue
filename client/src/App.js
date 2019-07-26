import React, { useEffect } from "react";
import Login from "./components/Login/login";
import PrivateRoute from "./components/routing/PrivateRoute";
import IndividualRecipe from "./components/Recipes/individualRecipe";
import EditIndividualRecipe from "./components/Recipes/EditIndividualRecipe";
import NotFound from "./components/Layout/notFound";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import MyRecipes from "./components/Layout/MyRecipes";
import MyCookbooks from "./components/Layout/MyCookbooks";
import MyCookbookRecipes from "./components/Layout/MyCookbookRecipes";
import MySearchRecipes from "./components/Layout/MySearchRecipes";
import CreateRecipe from "./components/Recipes/createRecipe";
import "./App.css";
import PasswordReset from "./components/Login/PasswordReset";

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
            <Route exact path="/" render={(routeProps)=><Login {...routeProps}/>} />
            <Route exact path="/login" render={(routeProps)=><Login {...routeProps}/>} />
            <Route exact path="/confirm/:register_token" render={(routeProps)=><Login {...routeProps}/>} />

            <Route exact path="/forgot/:password_token" render={(routeProps)=>
              <PasswordReset {...routeProps}/>  
              
              } />

            <PrivateRoute exact path="/recipe" component={MyRecipes} />
            <PrivateRoute
              exact
              path="/recipe/page/:page_number"
              component={MyRecipes}
              // nav="recipeNavigation"
            />

            <PrivateRoute
              exact
              path="/recipe/search"
              component={MySearchRecipes}
              option="search"
            />
            <PrivateRoute
              exact
              path="/recipe/search/page/:page_number"
              component={MySearchRecipes}
              option="search"
              // nav="searchNavigation"
            />

            <PrivateRoute
              exact
              path="/recipe/new"
              component={CreateRecipe}
              option="newRecipe"
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
              option="edit"
            />

            <PrivateRoute exact path="/cookbook" component={MyCookbooks} />
            <PrivateRoute
              exact
              path="/cookbook/page/:page_number"
              component={MyCookbooks}
              // nav="cookbookNavigation"
            />
            <PrivateRoute
              exact
              path="/cookbook/:cookbook_id"
              component={MyCookbookRecipes}
            />
            <PrivateRoute
              exact
              path="/cookbook/:cookbook_id/page/:page_number"
              component={MyCookbookRecipes}
              // nav="cookbookRecipeNavigation"
            />

            <PrivateRoute path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
