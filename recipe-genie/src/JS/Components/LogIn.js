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
                const response = await axios.post('http://localhost:3308/login', {
                    username,
                    password
                });
            
                if (response.status === 200) {
                    const [isLoggedIn, foundUsername] = response.data;
                    if (isLoggedIn) {
                        console.log('Login successful:', foundUsername);
                        // Redirect or perform any other action upon successful login
                    } else {
                        console.log('Login failed:', foundUsername);
                        alert('Invalid username or password.');
                    }
                } else {
                    console.log('Unexpected response status:', response.status);
                    alert('An unexpected error occurred.');
                }
            } catch (error) {
                console.error('There was an error!', error);
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