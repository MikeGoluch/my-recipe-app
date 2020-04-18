import { domPaths } from '../base';


const displayListsElement = (element) => {
    const markup = `
        <li class="shopping__item" data-id="${element.id}">
            <div class="shopping__count">
                <input type="number" value=${element.amount} step="${element.amount}">
                <p>${element.unit}</p>
            </div>
            <p class="shopping__description">${element.description}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>`
    const markup2 = `
        <li class="shopping__item" data-id="${element.id}">
            <p class="shopping__description">${element.description}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>`
    if (typeof(element.amount) === 'number') {
        document.querySelector(domPaths.shoppingList).insertAdjacentHTML('beforeend', markup);
    } else {
        document.querySelector(domPaths.shoppingList).insertAdjacentHTML('beforeend', markup2);
    }
};

const deleteListsElement = (id) => {
    const element = document.querySelector(`[data-id*="${id}"]`);
    element.parentElement.removeChild(element);
}

export { displayListsElement, deleteListsElement }