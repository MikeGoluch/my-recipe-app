class Likes {
    constructor() {
        this.likes = []
    }

    addLikedRecipe(id, img, title, author) {
        const liked = { id, img, title, author }
        this.likes.push(liked);
        return liked;
    }

    deleteLikedRecipe(id) {
        const index = this.likes.findIndex((el) => {
            el.id === id;
        })
        this.likes.splice(index, 1)
    }

    isLiked(id) {
        const index = this.likes.findIndex((el) => {
            return el.id === id
        })
        return index !== -1
    }
    
    
}

export default Likes;