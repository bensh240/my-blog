import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { doSignUp } from "../apiData";
import {Link, useNavigate} from 'react-router-dom';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birth_date, setBirthDate] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const result = await doSignUp({ username, email, password, birth_date });
            console.log(result); // Handle the result
            // Set the user in the global context
            // Redirect to the HomePage
            navigate('/LoginPage')
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
            onSubmit={handleSignUp} // Run handleSignUp when the form is submitted
        >
            <Typography variant="h4" marginBottom={3}>
                Sign Up
            </Typography>
            <Box marginBottom={2}>
                <TextField
                    label="Username"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Box>
            <Box marginBottom={2}>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Box>
            <Box marginBottom={2}>
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Box>
            <Box marginBottom={2}>
                <TextField
                    label="Birth Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={birth_date}
                    onChange={e => setBirthDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
            <Box marginBottom={2}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up
                </Button>
            </Box>
            <Box marginTop={2}>
                <Typography variant="body2">
                    Already have an account?
                    <Link to="/LoginPage">
                        Login
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default SignUpPage;
