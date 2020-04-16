const axios = require('axios');


class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getSelectedRecipe() {
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.publisher = result.data.recipe.publisher;
            this.image = result.data.recipe.image_url;
            this.title = result.data.recipe.title;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
        } catch(error) {
            console.log(error);
        };
    }

    convertUnits(ingredient) {
      const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
      const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound', 'kg', 'g'];
      
      unitsLong.forEach((cur, index) => {
        ingredient = ingredient.replace(cur, unitsShort[index]);
        // console.log('u', ingredient);
      });
      return ingredient
    }

    convertStrings(ingredient) {
      const regexParenthesis = /\(.*?\)/g;
      const regexWhiteSpaces = /\s+/g;
      ingredient = ingredient.toLowerCase();
      // console.log('1', ingredient)
      ingredient = ingredient.replace(regexParenthesis, '');
      // console.log('2', ingredient)
    
      ingredient = ingredient.replace(regexWhiteSpaces, ' ').trim();
      // console.log('3', ingredient)
    
      return ingredient;
    }

    calculateFraction(string) {
      if (string == null || string == 0) {
            return ''
      } else if (string.length === 2) {
        const numerator = string[0];
        const denominator = string[1];
        const outcome = parseInt(numerator) / parseInt(denominator);
        // console.log('2', outcome);
        return outcome;
      } else if (string.length === 1) {
        const integer = string[0];
        return parseInt(integer);
      } else if (string.length === 3) {
        const integer = string[0];
        const numerator = string[1];
        const denominator = string[2];
        const outcome = parseInt(integer) + (parseInt(numerator) / parseInt(denominator));
        // console.log('3', outcome);
        return outcome;
      }
    }

    convertAmount(ingredient) {
      let amount;
      let unit;
      let description;
      const regexNumbers = /\d+/g;
      const regexLetters = /[a-zA-Z]+/g;
      if (ingredient.match(regexNumbers) !== null) {
        amount = this.calculateFraction(ingredient.match(regexNumbers));
        description = ingredient.slice(ingredient.search(regexLetters), ingredient.length);
        unit = description.replace(/ .*/,'');
        // console.log(unit.length)
        description = description.substr(unit.length + 1, description.length)
        return {
          amount,
          unit,
          description
        };
      } else {
        description = ingredient.slice(ingredient.search(regexLetters), ingredient.length);
        return {
          amount: '',
          unit: '',
          description
        };
      }
    }

    convertedIngredients(){
      const convertedIng = this.ingredients.map((el) => {
        const strings = this.convertStrings(el);
        // console.log('strings', strings);
        const units = this.convertUnits(strings);
        // console.log('units', units);
        const amount = this.convertAmount(units);
        // console.log('amount', amount);
        el = amount;
        return el
      });
      this.ingredients = convertedIng;
  }

  calculateCookTime() {
    const time = this.ingredients.length * 5;
    this.time = time;
  }

  calculateServings() {
    this.servings = 3;
  }

  updateIngredientsAmount(type) {
    const servingsCount = type === 'plus' ? this.servings + 1 : this.servings - 1;

    this.ingredients.forEach((cur) => {
      console.log(typeof(cur.amount));
      if (cur.amount !== '') {
        cur.amount = (cur.amount * (servingsCount / this.servings)).toFixed(1);
      } else if ((cur.amount) === '') {
        cur.amount = '';
      }
    })
    this.servings = servingsCount;
  }
}

export default Recipe;

