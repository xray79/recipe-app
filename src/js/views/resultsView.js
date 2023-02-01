import icons from 'url:../../img/icons.svg';
import View from './View';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(results) {
    /* 
RESULTS SHAPE:
id: "5ed6604591c37cdc054bcd09"
image: "http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg"
publisher: "Closet Cooking"
title: "Cauliflower Pizza Crust (with BBQ Chicken Pizza)"
*/

    return `
        <li class="preview">
        <a class="preview__link" href="#${results.id}">
            <figure class="preview__fig">
            <img src="${results.image}" alt="Test" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__title">${results.title}</h4>
            <p class="preview__publisher">${results.publisher}</p>
            
            </div>
        </a>
        </li>
    `;
  }
}

export default new ResultsView();
