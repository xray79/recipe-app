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
