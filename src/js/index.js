import '../style/style.css';
import { domPaths } from './base';
import * as searchView from './views/searchView';
import Search from './model/Search';

const store = [];
// const test = new Search('pizza');
// console.log(test.getSearchResults());
const recipeSearch = async () => {
    const inputValue = document.querySelector(domPaths.searchInput).value;
    // const inputValue = 'pizza';
    if (inputValue) {
        store.search = new Search(inputValue);
        searchView.clearInputField();
        searchView.clearResultsList();
        searchView.displayLoader();
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
    recipeSearch();

});
document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 || e.which === '13') {
        e.preventDefault();
        recipeSearch();
    }
});
