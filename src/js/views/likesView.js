import { domPaths } from '../base';

const displayLikedRecipe = (liked) => {
    const likedRecipeList = document.querySelector(domPaths.likedRecipeList);
    const markup = `
        <li>
            <a class="likes__link" href="#${liked.id}">
                <figure class="likes__fig">
                    <img src="${liked.img}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${liked.title}</h4>
                    <p class="likes__author">${liked.author}</p>
                </div>
            </a>
        </li>
    `;
    likedRecipeList.insertAdjacentHTML('beforeend', markup);
};

const deleteLikedRecipe = (id) => {
    const element = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    element.parentElement.removeChild(element);
};

const likeButtonToggle = (isLiked) => {
    const changeIcon = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${changeIcon}`);
};

const likedMenu = (likesList) => {
    const likeIcon = document.querySelector(domPaths.likedMenu);
    likesList.length > 0 ? likeIcon.style.visibility = 'visible' : likeIcon.style.visibility = 'hidden';
};

export { displayLikedRecipe, deleteLikedRecipe, likeButtonToggle, likedMenu };
