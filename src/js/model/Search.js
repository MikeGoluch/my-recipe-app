const axios = require('axios');

class Search {
    constructor(query) {
        this.query = query;
    }

    async getSearchResults() {
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = result;
        } catch(error) {
            console.log(error);
        }

    }
}

export default Search ;