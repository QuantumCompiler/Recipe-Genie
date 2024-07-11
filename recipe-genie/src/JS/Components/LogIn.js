import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, FormControl, TextField, Button } from '@mui/material';

export default function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            console.log('Not all fields have been entered.')
            alert('All fields must be entered.')
            return;
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
                                to='/register'
                            >Register</Link>
                        </Box>
                        <Button type="submit" variant="contained" color="primary">
                            Log In
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}