import { Box, Button, Grid, Typography, FormControl, TextField, IconButton } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircle from '@mui/icons-material/AddCircle';
import SpoonAPI from '../Utilities/SpoonAPI.js';
import RecipeCards from './RecipeCards.js';
import axios from 'axios';


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

    /*  AddInput - A function to add a new input to the inputs array
        Inputs:
            None
        Algorithm:
            * Add a new object to the inputs array with an empty value
        Return:
            Adds a new input to the inputs array
    */
    const AddInput = () => {
        setInputs([...inputs, { value: '' }]);
    }

    /*  DeleteInput - A function to delete an input from the inputs array
        Inputs:
            None
        Algorithm:
            * Filter the inputs array to remove the input at the specified index
        Dependencies:
            inputs: The current state of the inputs array
        Return:
            Updates the inputs array to remove the specified
    */
    const DeleteInput = useCallback((index) => {
        if (inputs.length > 1) {
            setInputs(currentInputs => currentInputs.filter((_, i) => i !== index));
        } else if (inputs.length === 1) {
            setInputs([{ value: '' }]);
        }
    }, [inputs, setInputs]);

    /*  DeleteAllInputs - A function to delete all inputs from the inputs array
        Inputs:
            None
        Algorithm:
            * Set the inputs array to an array with a single object containing an empty value
        Return:
            Updates the inputs array to contain a single input with an empty value
    */
    const DeleteAllInputs = () => {
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
    const InputsChange = (index, event) => {
        var newInputs = inputs.map(function(input, i) {
            if (i === index) {
                return { value: event.target.value };
            }
            return input;
        });
        setInputs(newInputs);
    }

    /*  Submit - A function to handle the form submission
        Inputs:
            event: The event object containing the form data
        Algorithm:
            * Prevent the default form submission behavior
            * Log the current state of the inputs array
        Return:
            Logs the current state of the inputs array
    */
    const Submit = async (event) => {
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
        await SpoonAPI(ingredients, 10, 1, true);
        ToggleCards();
    }

    /*  ToggleCards - A function to toggle the visibility of the recipe cards
        Inputs:
            None
        Algorithm:
            * Update the showCards state to the opposite of its current value
        Return:
            Toggles the visibility of the recipe cards
    */
    const ToggleCards = () => {
        setShowCards(!showCards);
    }

    const sendPostRequest = async () => {
        try {
            const response = await axios.post('http://localhost:3308/post', {
                data: "Hello from React"
            });
            console.log("The response has been created.")
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    useEffect(() => {
        if (deleteIndex !== null) {
            DeleteInput(deleteIndex);
            setDeleteIndex(null);
        }
    }, [deleteIndex, DeleteInput]);

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
                onSubmit={Submit}
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
                                onChange={(event) => InputsChange(index, event)}
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
                        onClick={AddInput}
                    >
                        {/* Add circle icon */}
                        <AddCircle/>
                    </IconButton>
                </Box>
                {/* Box for Submit and clear buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        mt: 2,
                    }}
                >
                    {/* Button for Submit */}
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={Submit}
                    >
                        Create Recipe
                    </Button>
                    {/* Button for clear */}
                    <Button
                        color='secondary'
                        variant='contained'
                        onClick={DeleteAllInputs}
                    >
                        Clear
                    </Button>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={sendPostRequest}
                    >
                        Send POST Request
                    </Button>
                </Box>
            </Box>
            {/* Recipe Cards */}
            {showCards && <RecipeCards />}
        </Grid>
    );
}