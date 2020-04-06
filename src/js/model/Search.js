const axios = require('axios');

class Search {
    constructor(query) {
        this.query = query;
    }

    async getSearchResults() {
        try {
            const results = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            // console.log(results);
        } catch(error) {
            console.log(error);
        }

    }
}

export default Search ;