import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, FormControl, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            console.log('Not all fields have been entered.')
            alert('All fields must be entered.')
            return;
        } else {
            // TODO: Send the Username and Password to whatever call we have on the Node side. 
            try {
                console.log("Sending request to db.")
                const response = await axios.get('http://localhost:3308/login', {
                    params: {
                        username,
                        password
                    }
                });
                console.log("Response recieved from db.")
                if (response.status === 200) {
                    const { isLoggedIn } = response.data; 
                    if (isLoggedIn) {
                        console.log('Login successful:', username);
                        // Redirect or perform any other action upon successful login
                        //
                        //
                        //
                        console.log("WE DID IT!!!!!!!!!")
                    } else {
                        console.log('Login failed:', username);
                        alert('Invalid username or password.');
                    }
                } else {
                    console.log('Unexpected response status:', response.status);
                    alert('An unexpected error occurred.');
                }
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 200 range
                    console.error('Error response:', error.response.data);
                    console.error('Error status:', error.response.status);
                    console.error('Error headers:', error.response.headers);
                } else if (error.request) {
                    // Request was made but no response received
                    console.error('Error request:', error.request);
                } else {
                    // Something happened in setting up the request
                    console.error('Error message:', error.message);
                }
                alert('An error occurred during login. Please try again.');
            }
        }
    }
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
            }}
        >
            <Card
                sx={{
                    margin: 2,
                    width: 500,
                    padding: 3,
                }}
            >
                <CardContent>
                    <Typography
                        gutterBottom variant='h2'
                        component='div'
                        align='center'
                    >
                        Log In
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleLogin}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <FormControl fullWidth>
                            <TextField
                                id="username"
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary">
                            Log In
                        </Button>
                        <Button component={Link} to='/register' variant='contained' color='primary'>
                                Register
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}