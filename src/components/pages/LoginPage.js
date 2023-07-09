import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export let userInfo = {
    data: null,
    subscribers: [],
    set(newValue) {
        this.data = newValue;
        this.subscribers.forEach((fn) => fn(newValue));
    },
    subscribe(fn) {
        this.subscribers.push(fn);
    },
};

const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [userlinkpage, setUserlinkpage] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const doLogin = async (user) => {
        const url = '/login';
        const data = {
            user: user.username,
            pass: user.password,
        };

        axios
            .post(url, data, { withCredentials: true },)
            .then((res) => {
                userInfo.set(res.data);
                console.log(res);
                console.log(userInfo.data);
                props.setIsLoggingIn(true);
                navigate('/');
            })
            .catch((err) => {
                setErrorMessage('Incorrect password. Please try again.');
            });
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            doLogin({ username, password });
        } catch (err) {
            console.error(err); // Handle the error
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            component="form" // Make this a form so we can use form submission
            onSubmit={handleLogin} // Run handleLogin when the form is submitted
        >
            <Typography variant="h4" marginBottom={3}>
                Login
            </Typography>
            {errorMessage && (
                <Typography variant="body1" color="error" marginBottom={2}>
                    {errorMessage}
                </Typography>
            )}
            <Box marginBottom={2}>
                <TextField
                    label="Username"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Box>
            <Box marginBottom={2}>
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Box marginBottom={2}>
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={props.isLoggingIn}>
                    {props.isLoggingIn ? 'Logging In...' : 'Login'}
                </Button>
            </Box>
            <Link href="src/components/pages/LoginPage#" variant="body2">
                Forgot password?
            </Link>
            <Box marginTop={2}>
                <Typography variant="body2">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginPage;
