import '../style/style.css';
import { domPaths } from './base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as likesView from './views/likesView'
import Likes from './model/Likes'
import Search from './model/Search';
import Recipe from './model/Recipe';

const store = [];
// const test = new Search('pizza');
// console.log(test.getSearchResults());
const searchController = async () => {
    const inputValue = document.querySelector(domPaths.searchInput).value;
    // const inputValue = 'pizza';
    if (inputValue) {
        store.search = new Search(inputValue);
        searchView.clearInputField();
        searchView.clearResultsList();
        searchView.clearResultsButton();
        searchView.displayLoader(domPaths.resultsList);
        try {
            await store.search.getSearchResults();
            // console.log('res', results);
            searchView.clearLoader();
            console.log('res1', store.search.result);
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
    console.log(nextPage);
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
        try {
            await store.recipe.getSelectedRecipe();
            searchView.clearLoader();
            console.log(store.recipe)
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

window.addEventListener('hashchange', () => {
    recipeController();
});

window.addEventListener('load', () => {
    recipeController();
})
store.likes = new Likes();

const likeController = () => {
    // const likedRecipeId = store.recipe.id;
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
        console.log(store.likes)
    } else {
        
        store.likes.deleteLikedRecipe(likedRecipeId);
        likesView.likeButtonToggle(false);
        likesView.deleteLikedRecipe(likedRecipeId)
        console.log(store.likes);
    }
}



document.querySelector(domPaths.mainRecipe).addEventListener('click', (e) => {
    // console.log(e.target.matches('.btn-plus, .btn-plus *'));
    // const btnType = e.target.closest('.btn-tiny').dataset.type;
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
        // console.log(e.returnValue);
likeController();

    }
})