import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, there are other pages
    if (this._curPage === 1 && numPages > 1)
      return this._generateMarkupButtonNext();

    // Last page
    if (this._curPage === numPages && numPages > 1)
      return this._generateMarkupButtonPrev();

    // Middle page
    if (this._curPage < numPages) {
      return (
        this._generateMarkupButtonPrev() + this._generateMarkupButtonNext()
      );
    }

    // Page 1, no other pages
    return '';
  }

  _generateMarkupButtonPrev() {
    return `
        <button data-goto="${
          this._curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._curPage - 1}</span>
        </button>
        `;
  }

  _generateMarkupButtonNext() {
    return `
        <button data-goto="${
          this._curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }
}

export default new PaginationView();
