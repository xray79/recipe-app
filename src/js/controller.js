// polyfilling
import 'core-js/stable';
// polyfilling async-await
import 'regenerator-runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import { async } from 'regenerator-runtime';
import resultsView from './views/resultsView.js';

// parcel hot module reloading, keeps state of app during dev
if (module.hot) module.hot.accept();

const controlRecipes = async function () {
  try {
    // Get hash id of recipe from url
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Load recipe
    // model contains api call function to load recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // show spinner when function running

    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render search results
    resultsView._clear();
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();

// DOCS: https://forkify-api.herokuapp.com/v2
