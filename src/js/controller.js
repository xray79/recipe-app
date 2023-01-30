// polyfilling
import 'core-js/stable';
// polyfilling async-await
import 'regenerator-runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

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
