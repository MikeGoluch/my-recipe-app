import { domPaths } from '../base';

const clearInputField = () => {
    document.querySelector(domPaths.searchInput).value = '';
    document.querySelector(domPaths.searchInput).focus;
};

const clearResultsList = () => {
    document.querySelector(domPaths.resultsList).innerHTML = '';
}

const displayLoader = () => {
    const loader = `<div class="loader"><svg><use href="img/icons.svg#icon-cw"></use></svg></div>`;
    document.querySelector(domPaths.results).insertAdjacentHTML('afterbegin', loader);
}

const clearLoader = () => {
    document.querySelector(domPaths.loader).innerHTML = '';
}

const recipeMarkup = (recipe) => {
    const resultsList = document.querySelector(domPaths.resultsList);
    const markup = 
    `<li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`
    resultsList.insertAdjacentHTML('beforeend', markup);
}

const displayRecipes = (recipes) => {
    recipes.forEach((e) => {
        recipeMarkup(e);
    })
}


export { clearInputField, clearResultsList, displayRecipes, displayLoader, clearLoader }