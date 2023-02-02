import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    // check is there is data, or if the data array is empty
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    // saves data so it can be called by the generate markup method
    this._data = data;
    // generate merkup returns html with correct values from data
    const markup = this._generateMarkup();
    // clear any html left
    this._clear();
    // render the new view
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // update allows us to change parts of the DOM without a full rerender
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // if the new element is different to the current element AND
      // if the new element has a text value that is not an empty string
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // update REAL DOM (screen) with new element text
        curEl.textContent = newEl.textContent;
      }

      // change element attributes
      // if elements are different
      if (!newEl.isEqualNode(curEl))
        // cast to array and itereate over each attr of the different element
        Array.from(newEl.attributes).forEach(attr =>
          // add/update each attr to the current element on screen
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    // helper function to clear HTML in parent element
    this._parentElement.innerHTML = '';
  }
}
