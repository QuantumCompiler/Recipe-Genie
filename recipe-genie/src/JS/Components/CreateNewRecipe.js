import { Box, Button, Card, CardMedia, CardContent, CardActions, Grid, Typography, FormControl, TextField, IconButton } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircle from '@mui/icons-material/AddCircle';

/*  Ingredient - A class to store ingredient information
    Inputs:
        ingredient: An object containing the ingredient information
    Properties:
        ID: The ID of the ingredient
        Amount: The amount of the ingredient
        Unit: The unit of the ingredient
        UnitLong: The long unit of the ingredient
        UnitShort: The short unit of the ingredient
        Aisle: The aisle of the ingredient
        Name: The name of the ingredient
        Original: The original ingredient string
        OriginalName: The original name of the ingredient
        Meta: The meta information of the ingredient
        Image: The URL of the ingredient image
    Methods:
        None
*/
class Ingredient {
    constructor(ingredient) {
        this.ID = ingredient.id;
        this.Amount = ingredient.amount;
        this.Unit = ingredient.unit;
        this.UnitLong = ingredient.unitLong;
        this.UnitShort = ingredient.unitShort;
        this.Aisle = ingredient.aisle;
        this.Name = ingredient.name;
        this.Original = ingredient.original;
        this.OriginalName = ingredient.originalName;
        this.Meta = ingredient.meta;
        this.Image = ingredient.image;
    }
}

/*  Recipe - A class to store recipe information
    Inputs:
        recipeInfo: An object containing the recipe information
    Properties:
        ID: The ID of the recipe
        Title: The title of the recipe
        Image: The URL of the recipe image
        ImageType: The type of image
        UsedIngredientCount: The number of used ingredients
        MissedIngredientCount: The number of missing ingredients
        MissedIngredients: An array of missing ingredients
        UsedIngredients: An array of used ingredients
        UnusedIngredients: An array of unused ingredients
        Likes: The number of likes for the recipe
    Methods:
        ShowUsedIngredientsNames: A function to display the names of the used ingredients
        ShowMissingIngredientsNames: A function to display the names of the missing ingredients
*/
class Recipe {
    constructor(recipeInfo) {
        this.ID = recipeInfo.id;
        this.Title = recipeInfo.title;
        this.Image = recipeInfo.image;
        this.ImageType = recipeInfo.imageType;
        this.UsedIngredientCount = recipeInfo.usedIngredientCount;
        this.MissedIngredientCount = recipeInfo.missedIngredientCount;
        this.MissedIngredients = [];
        for (let i = 0; i < this.MissedIngredientCount; i++) {
            this.MissedIngredients.push(new Ingredient(recipeInfo.missedIngredients[i]));
        }
        this.UsedIngredients = [];
        for (let i = 0; i < this.UsedIngredientCount; i++) {
            this.UsedIngredients.push(new Ingredient(recipeInfo.usedIngredients[i]));
        }
        this.UnusedIngredients = [];
        for (let i = 0; i < this.UnusedIngredients.length; i++) {
            this.UnusedIngredients.push(new Ingredient(recipeInfo.unusedIngredients[i]));
        }
        this.Likes = recipeInfo.likes;
    }

    /*  ShowUsedIngredientsNames - A function to display the names of the used ingredients
        Inputs:
            None
        Algorithm:
            * Create a string to store the names of the used ingredients
            * Loop over the used ingredients and append the names to the string
            * Return the string
        Return:
            A string containing the names of the used ingredients
    */
    ShowUsedIngredientsNames() {
        var used = '';
        for (let i = 0; i < this.UsedIngredientCount; i++) {
            if (i < this.UsedIngredientCount - 1) {
                used += this.UsedIngredients[i].Name + ", ";
            }
            else {
                used += this.UsedIngredients[i].Name + ".";
            }
        }
        return used;
    }

    /*  ShowMissingIngredientsNames - A function to display the names of the missing ingredients
        Inputs:
            None
        Algorithm:
            * Create a string to store the names of the missing ingredients
            * Loop over the missed ingredients and append the names to the string
            * Return the string
        Return:
            A string containing the names of the missing ingredients
    */
    ShowMissingIngredientsNames() {
        var missing = '';
        for (let i = 0; i < this.MissedIngredientCount; i++) {
            if (i < this.MissedIngredientCount - 1) {
                missing += this.MissedIngredients[i].Name + ", ";
            }
            else {
                missing += this.MissedIngredients[i].Name + ".";
            }
        }
        return missing;
    }
}

/*  RecipeCards - A class component to display recipe cards
    Inputs:
        None
    Algorithm:
        * Retrieve the most recent recipe data from local storage
        * Call the convertAPIResults function to convert the data to Recipe objects
        * Render a card for each Recipe object
    Return:
        A list of cards containing the recipe information
*/
class RecipeCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
    }
    /*  convertAPIResults - A function to convert the results from the spoonacular API to Recipe objects
        Inputs:
            None
        Algorithm:
            * Retrieve the recipe data from local storage
            * Convert the data to JSON
            * Create an array of Recipe objects from the JSON data
        Return:
            An array of Recipe objects
    */
    convertAPIResults() {
        // Retrieve Recipe
        const stored = localStorage.getItem('NewRecipe');
        // Convert To JSON
        const storedJSON = JSON.parse(stored);
        // Create Recipes Array And Append
        const recipes = [];
        for (let i = 0; i < storedJSON.length; i++) {
            recipes.push(new Recipe(storedJSON[i]));
        }
        return recipes;
    }

    /*  componentDidMount - A lifecycle method that runs after the component has mounted
        Inputs:
            None
        Algorithm:
            * Set the state of the component to contain the converted API results
        Return:
            Updates the state of the component with the converted API results
    */
    componentDidMount() {
        this.setState({
            recipes: this.convertAPIResults()
        });
    }

    /*  render - A function to render the component
        Inputs:
            None
        Algorithm:
            * Map over the recipes array and render a card for each Recipe object
        Return:
            A list of cards containing the recipe information
    */
    render() {
        return (
            <div>
                {this.state.recipes.map((recipe, index) => (
                    <Card key={index} 
                        sx={{ 
                            margin: 2,
                            width: `${window.innerWidth / 2}px`,
                        }}
                    >
                        {/* Title Of Recipe */}
                        <CardContent>
                            <Typography
                                gutterBottom variant="h5" 
                                component="div"
                                align='center'
                            >
                                {recipe.Title} - {recipe.Likes} Likes
                            </Typography>
                        </CardContent>
                        {/* Image Of Recipe */}
                        <div
                            style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        >
                            <CardMedia
                                component="img"
                                style={{height: '200px', width: '500px', objectFit: 'contain'}}
                                image={recipe.Image}
                                alt={recipe.Title}
                            />
                        </div>
                        {/* Content Of Recipe */}
                        <CardContent>
                            {/* Used Ingredients (Ingredients You Already Have) */}
                            <Typography
                                gutterBottom variant='p'
                                component="div"
                            >
                                Ingredients You Already Have: {recipe.UsedIngredientCount} - {' '}
                                <span style={{ color: 'blue'}}>
                                    {recipe.ShowUsedIngredientsNames()}
                                </span>
                            </Typography>
                            {/* Missing Ingredients (Ingredients You Are Missing) */}
                            <Typography
                                gutterBottom variant='p'
                                component='div'
                            >
                                Ingredients You Are Missing: {recipe.MissedIngredientCount} - {' '}
                                <span style={{ color: 'red'}}>
                                    {recipe.ShowMissingIngredientsNames()}
                                </span>
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }
}

/*  CreateRecipe - A functional component to create a new recipe
    Inputs:
        None
    Algorithm:
        * Create a form with a list of input fields
        * Add a new input field when the user clicks the "Add" button
        * Delete an input field when the user clicks the delete icon
        * Submit the form to log the current state of the inputs array
    Return:
        A form to create a new recipe with input fields for ingredients
*/
export default function CreateRecipe() {
    /*  useState hooks: 
            inputs: An array of objects, each containing a value property
            setInputs: A function to update the inputs state
            focusedIndex: The index of the input that is currently focused
            setFocusedIndex: A function to update the focusedIndex state
            deleteIndex: The index of the input that should be deleted
            setDeleteIndex: A function to update the deleteIndex
    */
    const [inputs, setInputs] = useState([{ value: '' }]);
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [showCards, setShowCards] = useState(false);

    /*  addInput - A function to add a new input to the inputs array
        Inputs:
            None
        Algorithm:
            * Add a new object to the inputs array with an empty value
        Return:
            Adds a new input to the inputs array
    */
    function addInput() {
        setInputs([...inputs, { value: '' }]);
    };

    function toggleCards() {
        setShowCards(!showCards);
    }

    /*  deleteInput - A function to delete an input from the inputs array
        Inputs:
            index: The index of the input to be deleted
        Algorithm:
            * Filter the inputs array to remove the input at the specified index
        Dependencies:
            inputs: The current state of the inputs array
        Return:
            Updates the inputs array to remove the specified
    */
    function deleteInput(index) {
        if (inputs.length > 1) {
            setInputs(currentInputs => currentInputs.filter((_, i) => i !== index));
        }
        else if (inputs.length == 1) {
            setInputs([{value: ''}]);
        }
    }

    /*  deleteAllInputs - A function to delete all inputs from the inputs array
        Inputs:
            None
        Algorithm:
            * Set the inputs array to an array with a single object containing an empty value
        Return:
            Updates the inputs array to contain a single input with an empty value
    */
    function deleteAllInputs() {
        setInputs([{ value: ''}]);
        setShowCards(false);
    }

    /*  inputChange - A function to update the value of an input in the inputs array
        Inputs:
            index: The index of the input to be updated
            event: The event object containing the new value of the input
        Algorithm:
            * Map over the inputs array and update the value of the input at the specified index
        Return:
            Updates the value of the input at the specified index
    */
    function inputsChange(index, event) {
        var newInputs = inputs.map(function(input, i) {
            if (i === index) {
                return { value: event.target.value };
            }
            return input;
        });
        setInputs(newInputs);
    }

    /*  getRecipesByIngredients - A function to get recipes by ingredients with spoonacular API
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
    async function getRecipesByIngredients(ingredients, number = 10, ranking = 1, ignorePantry = false) {
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

    /*  submit - A function to handle the form submission
        Inputs:
            event: The event object containing the form data
        Algorithm:
            * Prevent the default form submission behavior
            * Log the current state of the inputs array
        Return:
            Logs the current state of the inputs array
    */
    async function submit(event) {
        localStorage.clear();
        event.preventDefault();
        var ingredients = '';
        for (let i = 0; i < inputs.length; i++) {
            if (i < inputs.length - 1) {
                ingredients += inputs[i].value + ',';
            }
            else {
                ingredients += inputs[i].value;
            }
        }
        await getRecipesByIngredients(ingredients, 10, 1, true);
        toggleCards();
    }

    /*  useEffect hook:
            * This hook is used to delete an input when the deleteIndex state is updated
    */
    useEffect(() => {
        if (deleteIndex !== null) {
            deleteInput(deleteIndex);
            setDeleteIndex(null);
        }
    }, [deleteIndex, deleteInput]);

    /*  JSX:
    */
    return (
        // Container for current screen
        <Grid
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#f0f0f0',
                alignItems: 'center',
                pt: 5,
                pb: 5,
            }}
        >
            {/* The Box component is used to create a container for the form */}
            <Box
                component="form"
                onSubmit={submit}
                sx={{
                    width: `${window.innerWidth / 2}px`,
                    bgcolor: 'white',
                    p: 3,
                    borderRadius: 1,
                    boxShadow: 3,
                }}
            >
                {/* The Typography component is used to display the title of the form */}
                <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                    Create New Recipe
                </Typography>
                {/* The map function is used to render a list of input fields */}
                {inputs.map((input, index) => (
                    // Box for input fields
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                        {/* Form control with text fields */}
                        <FormControl fullWidth>
                            {/* Text field for ingredient input */}
                            <TextField
                                label={`Ingredient ${index + 1}`}
                                value={input.value}
                                onChange={(event) => inputsChange(index, event)}
                                variant="outlined"
                                fullWidth
                                onFocus={() => setFocusedIndex(index)}
                                onBlur={() => setFocusedIndex(null)}
                            />
                        </FormControl>
                        {/* Delete button that shows up to the right of the input field*/}
                        {focusedIndex === index && (
                            // IconButton for delete button added to the right of the input field
                            <IconButton
                                color="secondary"
                                aria-label="delete"
                                onMouseDown={() => setDeleteIndex(index)}
                                sx={{ marginLeft: 2 }}
                            >
                                {/* Delete icon */}
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}
                {/* Box for add button */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2,
                    }}
                >
                    {/* IconButton for add button */}
                    <IconButton 
                        color="secondary" 
                        aria-label='add'
                        onClick={addInput}
                    >
                        {/* Add circle icon */}
                        <AddCircle/>
                    </IconButton>
                </Box>
                {/* Box for submit and clear buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        mt: 2,
                    }}
                >
                    {/* Button for submit */}
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={submit}
                    >
                        Create Recipe
                    </Button>
                    {/* Button for clear */}
                    <Button
                        color='secondary'
                        variant='contained'
                        onClick={deleteAllInputs}
                    >
                        Clear
                    </Button>
                </Box>
            </Box>
            {/* Recipe Cards */}
            {showCards && <RecipeCards />}
        </Grid>
    );
}