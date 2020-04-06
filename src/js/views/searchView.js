import { domPaths } from '../base';

const clearInputField = () => {
    document.querySelector(domPaths.searchInput).value = '';
    document.querySelector(domPaths.searchInput).focus;
}

export { clearInputField }