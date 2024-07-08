/*  SpoonAPI - A function to get recipes by ingredients with spoonacular API
    Inputs:
        ingredients: A string of ingredients separated by commas
        number: The number of recipes to return (default: 10)
        ranking: The ranking of the recipes (default: 1)
        ignorePantry: A boolean to ignore pantry ingredients (default: false)
    Algorithm:
        * Create a query object with the specified parameters
            * ingredients: The list of ingredients
            * number: The number of recipes to return
            * ranking: The ranking of the recipes
            * ignorePantry: A boolean to ignore pantry ingredients
        * Create a URL object with the spoonacular API endpoint
        * Add the query parameters to the URL
        * Create a headers object with the API key and host
            * x-rapidapi-key - 0969f52154mshf5d39e0b2d8cbf0p1af05bjsn7ac99719ef08
            * x-rapidapi-host - spoonacular-recipe-food-nutrition-v1.p.rapidapi.com
        * Fetch the data from the API using the URL and headers
            * Response is converted to JSON
            * Data is stored in local storage
            * Data is logged to the console
            * Error is logged to the console (if applicable)
    Return:
        Logs the data from the spoonacular API to the console
*/
export default async function SpoonAPI(ingredients, number = 10, ranking = 1, ignorePantry = false) {
    const query = {
        ingredients: ingredients,
        number: number,
        ranking: ranking,
        ignorePantry: ignorePantry
    };
    const url = new URL("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients");
    url.search = new URLSearchParams(query).toString();
    const headers = {
        "x-rapidapi-key": "0969f52154mshf5d39e0b2d8cbf0p1af05bjsn7ac99719ef08",
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    };
    try {
        const response = await fetch(url, { headers: headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        localStorage.setItem('NewRecipe', JSON.stringify(data));
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}