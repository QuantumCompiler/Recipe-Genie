import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, FormControl, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function Register() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (username === "" || password === "" || confirmPassword === "") {
            console.log('Not all fields have been entered.');
            alert('All fields must be entered.');
            return;
        }
        if (password !== confirmPassword) {
            console.log('Passwords do not match.');
            alert('Passwords do not match.');
            return;
        }
        else if (password === confirmPassword) {
            console.log('Passwords match');
            //TODO: Send information to Database to add new username/password
            try {
                const response = await axios.post('http://localhost:3308/users', {
                    username,
                    password
                });
                
                if (response.status === 201) {
                    console.log('User registered successfully:', response.data);
                    alert('User registered successfully.');
                    // Redirect or perform any other action upon successful registration
                } else {
                    console.log('Unexpected response status:', response.status);
                    alert('An unexpected error occurred.');
                }
            } catch (error) {
                console.error('There was an error!', error);
                alert('An error occurred during registration. Please try again.');
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
                        Register
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleRegister}
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
                        <FormControl fullWidth>
                            <TextField
                                id="confirm-password"
                                label="Enter Password Again"
                                type="password"
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button type='submit' variant='contained' color='primary'>
                            Register
                        </Button>
                        <Button component={Link} to='/' variant='contained' color='primary'>
                            Return To Login
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}