import { domPaths } from '../base';

const ingredientMainMarkup = (ingredient) => {
    const markup = `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${ingredient.amount}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
            </div>
        </li>
    `;
    return markup;
};

const recipeMainMarkup = (data, isLiked) => {
    const mainRecipe = document.querySelector(domPaths.mainRecipe);
    const markup = `
    <figure class="recipe__fig">
    <img src="${data.image}" alt="${data.title}" class="recipe__img">
    <h1 class="recipe__title">
        <span>${data.title}</span>
    </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${data.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${data.servings}</span>
            <span class="recipe__info-text"> servings</span>
            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-minus" data-type="minus">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-plus" data-type="plus">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>
        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
            </svg>
        </button>
    </div>
    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${data.ingredients.map((cur) => {
                return ingredientMainMarkup(cur);
            }).join('')}
        </ul>
        <button class="btn-small recipe__btn">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>
    <div class="recipe__directions">
        <h2 class="heading-2_1">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${data.publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${data.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    `;
    mainRecipe.insertAdjacentHTML('afterbegin', markup);
};

const displayUpdatedServings = (data) => {
        document.querySelector('.recipe__info-data--people').textContent = data.servings;
};

const displayUpdatedIngredients = (updated) => {
    const oldIng = Array.from(document.querySelectorAll(domPaths.ingredientAmount));
    oldIng.forEach((cur, index) => {
        cur.textContent = updated.ingredients[index].amount;
    });
};

const clearMainRecipe = () => {
    document.querySelector(domPaths.mainRecipe).innerHTML = '';
};


export { clearMainRecipe, recipeMainMarkup, displayUpdatedServings, displayUpdatedIngredients };
