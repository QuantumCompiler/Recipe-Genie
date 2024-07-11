import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, FormControl, TextField, Button } from '@mui/material';

export default function Register() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (e) => {
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
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                gap: 2,
                            }}
                        >
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: 'blue',
                                }}
                                to='/'
                            >Return To Login</Link>
                        </Box>
                        <Button type="submit" variant="contained" color="primary">
                            Register
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}