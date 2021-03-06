import '../style/style.css';
import { domPaths } from './base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as likesView from './views/likesView';
import * as listView from './views/listView';
import Likes from './model/Likes';
import List from './model/List';
import Search from './model/Search';
import Recipe from './model/Recipe';

const store = [];

const searchController = async () => {
    const inputValue = document.querySelector(domPaths.searchInput).value;
    if (inputValue) {
        store.search = new Search(inputValue);
        searchView.clearInputField();
        searchView.clearResultsList();
        searchView.clearResultsButton();
        searchView.displayLoader(domPaths.resultsList);
        try {
            await store.search.getSearchResults();
            searchView.clearLoader();
            searchView.displayRecipes(store.search.result.data.recipes);
        } catch (error) {
            console.log(error);
        };
    }
}
document.querySelector(domPaths.searchBtn).addEventListener('click', (e) => {
    e.preventDefault();
    searchController();

});
document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 || e.which === '13') {
        e.preventDefault();
        searchController();
    }
});

document.querySelector(domPaths.resultsButtonPages).addEventListener('click', (e) => {
    const nextPage = parseInt(e.target.closest('button').dataset.page);
    searchView.clearResultsList();
    searchView.displayRecipes(store.search.result.data.recipes, undefined, nextPage);

})

const recipeController = async () => {
    const hashId = window.location.hash;
    const id = hashId.replace('#', '');
    recipeView.clearMainRecipe();
    if (id) {
        store.recipe = new Recipe(id);
        searchView.displayLoader(domPaths.mainRecipe);
        if (store.search) {
            searchView.highlightSelectedRecipe(id);
        }
        try {
            await store.recipe.getSelectedRecipe();
            searchView.clearLoader();
            store.recipe.convertedIngredients(store.recipe.ingredients);
            store.recipe.calculateServings();
            store.recipe.calculateCookTime();
            recipeView.recipeMainMarkup(
                store.recipe, 
                store.likes.isLiked(id)
            );
        } catch (error) {
            console.log(error)
        }
    }
}

window.addEventListener('hashchange', (e) => {
    recipeController();
});

window.addEventListener('load', () => {
    recipeController();
});

const listController = () => {
    store.list = new List();
    store.recipe.ingredients.forEach((cur) => {
        store.list.addElement(
            cur.amount,
            cur.unit,
            cur.description);
    })
    store.list.elements.forEach((cur) => {
        listView.displayListsElement(cur)
    })
};

window.addEventListener('load', () => {
    store.likes = new Likes();
    const retrievedData = store.likes.retrieveStorageData();
    likesView.likedMenu(retrievedData)
    retrievedData.forEach((cur) => {
        likesView.displayLikedRecipe(cur);
    })
});

const likeController = () => {
    if (!store.likes) {
        store.likes = new Likes();
    }
    const likedRecipeId = store.recipe.id;
    if (!store.likes.isLiked(likedRecipeId)) {
        const likedRecipe = store.likes.addLikedRecipe(
            likedRecipeId,
            store.recipe.image,
            store.recipe.title,
            store.recipe.publisher)
        likesView.likeButtonToggle(true);
        likesView.displayLikedRecipe(likedRecipe);
    } else {
        store.likes.deleteLikedRecipe(likedRecipeId);
        likesView.likeButtonToggle(false);
        likesView.deleteLikedRecipe(likedRecipeId)
    }
};

document.querySelector(domPaths.mainRecipe).addEventListener('click', (e) => {
    if (e.target.matches('.btn-plus, .btn-plus *')) {
        store.recipe.updateIngredientsAmount('plus');
        recipeView.displayUpdatedServings(store.recipe);
        recipeView.displayUpdatedIngredients(store.recipe);
    } else if (e.target.matches('.btn-minus, .btn-minus *')) {
        if (store.recipe.servings > 1) {
            store.recipe.updateIngredientsAmount('minus');
            recipeView.displayUpdatedServings(store.recipe);
            recipeView.displayUpdatedIngredients(store.recipe);
        }
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        likeController();

    } else if (e.target.matches('.recipe__btn, .recipe__btn *')) {
        listController();
    }
});



document.querySelector(domPaths.shoppingList).addEventListener('click', (e) => {
    const elementId = e.target.closest('.shopping__item').dataset.id;
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        store.list.deleteElement(elementId);
        listView.deleteListsElement(elementId);
    }
});
