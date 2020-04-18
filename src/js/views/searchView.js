import { domPaths } from '../base';

const clearInputField = () => {
    document.querySelector(domPaths.searchInput).value = '';
    document.querySelector(domPaths.searchInput).focus;
};

const clearResultsList = () => {
    document.querySelector(domPaths.resultsList).innerHTML = '';
};

const displayLoader = (parentElement) => {
    const loader = `<div class="loader"><svg><use href="img/icons.svg#icon-cw"></use></svg></div>`;
    document.querySelector(parentElement).insertAdjacentHTML('afterbegin', loader);
};

const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
};

const clearResultsButton = () => {
    document.querySelector(domPaths.resultsButtonPages).innerHTML = '';
};

const shortenTitle = (title, letterLimit = 17) => {
    const arr = [];
    const splitPhrase = title.split('');
    splitPhrase.reduce((acc, cur) => {
        if (acc + cur.length < letterLimit) {
        arr.push(cur);
        }
        return acc + cur.length;
    }, 0);
    return `${arr.join('')}...`;
};

const recipeListMarkup = (recipe) => {
    const resultsList = document.querySelector(domPaths.resultsList);
    const markup =
    `<li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${shortenTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    resultsList.insertAdjacentHTML('beforeend', markup);
};

const displayButton = (curPage, type) => {
    const btnMarkup =
    `<button class="btn-inline results__btn--${type}" data-page=${type === 'prev' ? curPage - 1 : curPage + 1}>
        <span>Page ${type === 'prev' ? curPage - 1 : curPage + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `;
    return btnMarkup;
};
const resultsListButtons = (resultsNumber, resultsPerPage, curPage) => {
    const pagesNumber = Math.ceil(resultsNumber / resultsPerPage);
    let pageBtn;
    if (pagesNumber > 1 && curPage === 1) {
        pageBtn = displayButton(curPage, 'next');
    } else if (curPage < pagesNumber) {
        pageBtn =
        `
            ${displayButton(curPage, 'prev')}
            ${displayButton(curPage, 'next')}
        `;
    } else if (pagesNumber > 1 && curPage === pagesNumber) {
        pageBtn = displayButton(curPage, 'prev');
    }
    document.querySelector(domPaths.resultsButtonPages).insertAdjacentHTML('afterbegin', pageBtn);
};


const displayRecipes = (recipes, resultsPerPage = 10, curPage = 1) => {
    const start = (curPage - 1) * resultsPerPage;
    const end = curPage * resultsPerPage;
    recipes.slice(start, end).forEach((e) => {
        recipeListMarkup(e);
    });
    clearResultsButton();
    resultsListButtons(recipes.length, resultsPerPage, curPage);
};

export { clearResultsButton, clearInputField, clearResultsList, displayRecipes, displayLoader, clearLoader, shortenTitle };
