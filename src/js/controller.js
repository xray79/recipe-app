// polyfilling
import 'core-js/stable';
// polyfilling async-await
import 'regenerator-runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
// API-KEY: cba63bc7-2acf-4e82-b6ad-e7c77982a354
// hash for recipe 2, 5ed6604591c37cdc054bcd09

///////////////////////////////////////

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
    alert(err);
  }
};

controlRecipes();

['hashchange', 'load'].forEach(ev => {
  window.addEventListener(ev, controlRecipes);
});
