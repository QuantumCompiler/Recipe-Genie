import { Box, Button, Typography, FormControl, TextField, IconButton } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircle from '@mui/icons-material/AddCircle';

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

    /*  addInput - A function to add a new input to the inputs array
        Inputs:
            None
        Algorithm:
            * Add a new object to the inputs array with an empty value
        Return:
            Adds a new input to the inputs array
    */
    const addInput = () => {
        setInputs([...inputs, { value: '' }]);
    };

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
    const deleteInput = useCallback((index) => {
        if (inputs.length > 1) {
            setInputs(inputs.filter((_, i) => i !== index));
        }
    }, [inputs]);

    /*  deleteAllInputs - A function to delete all inputs from the inputs array
        Inputs:
            None
        Algorithm:
            * Set the inputs array to an array with a single object containing an empty value
        Return:
            Updates the inputs array to contain a single input with an empty value
    */
    const deleteAllInputs = () => {
        setInputs([{ value: '' }]);
    };

    /*  inputChange - A function to update the value of an input in the inputs array
        Inputs:
            index: The index of the input to be updated
            event: The event object containing the new value of the input
        Algorithm:
            * Map over the inputs array and update the value of the input at the specified index
        Return:
            Updates the value of the input at the specified index
    */
    const inputsChange = (index, event) => {
        const newInputs = inputs.map((input, i) => {
            if (i === index) {
                return { value: event.target.value };
            }
            return input;
        });
        setInputs(newInputs);
    };

    /*  submit - A function to handle the form submission
        Inputs:
            event: The event object containing the form data
        Algorithm:
            * Prevent the default form submission behavior
            * Log the current state of the inputs array
        Return:
            Logs the current state of the inputs array
    */
    const submit = (event) => {
        event.preventDefault();
        console.log('Inputs:', inputs);
    };

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
            * This JSX code renders a form with a list of input fields
            * Each input field has a label and a text field
            * The user can add new input fields by clicking the "Add" button
            * The user can delete an input field by clicking the delete icon
            * The user can submit the form to log the current state of the
    */
    return (
        // Container for current screen
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#f0f0f0',
                paddingTop: '20px',
                paddingBottom: '20px',
            }}
        >
            {/* The Box component is used to create a container for the form */}
            <Box
                component="form"
                onSubmit={submit}
                sx={{
                    width: '50%',
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
        </Box>
    );
}