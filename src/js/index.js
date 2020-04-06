import '../style/style.css';
import { domPaths } from './base';
import { clearInputField } from './views/searchView';
import Search from './model/Search';



const recipeSearch = () => {
    const inputValue = document.querySelector(domPaths.searchInput).value;
    if (inputValue) {
        const newSearch = new Search(inputValue);
        const searchResult = newSearch.getSearchResults();
        console.log(searchResult);
    }
}
document.querySelector(domPaths.searchBtn).addEventListener('click', (e) => {
    e.preventDefault();
    recipeSearch();
    clearInputField();

});
document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13 || e.which === '13') {
        e.preventDefault();
        recipeSearch();
        clearInputField();
    }
});
