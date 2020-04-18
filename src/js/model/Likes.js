class Likes {
    constructor() {
        this.likes = []
    }

    addLikedRecipe(id, img, title, author) {
        const liked = { id, img, title, author }
        this.likes.push(liked);
        this.addStorageData();

        return liked;
    }

    deleteLikedRecipe(id) {
        const index = this.likes.findIndex((el) => {
            el.id === id;
        })
        this.likes.splice(index, 1);
        this.addStorageData();
    }

    isLiked(id) {
        const index = this.likes.findIndex((el) => {
            return el.id === id
        })
        return index !== -1
    }

    addStorageData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    retrieveStorageData() {
        const retrievedData = JSON.parse(localStorage.getItem('likes'));
        if (retrievedData) {
            this.likes = retrievedData;
        }
        return retrievedData;
    }
    
    
}

export default Likes;