import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/forgot-password', { email });
            alert('Password reset link sent to your email');
            setEmail('');
        } catch (error) {
            console.error(error);
            alert('Failed to send password reset link');
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            component="form"
            onSubmit={handleResetPassword}
        >
            <Typography variant="h4" marginBottom={3}>
                Forgot Password
            </Typography>
            <Box marginBottom={2}>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Box>
            <Box marginBottom={2}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Reset Password
                </Button>
            </Box>
        </Box>
    );
};

export default ForgotPasswordPage;
