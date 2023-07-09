import React from 'react';
import { Box, Typography } from '@mui/material';

const Header = () => {
    return (
        <Box
            bgcolor="#f8f8f8"
            py={4}
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
            borderRadius={8}
        >
            <Typography
                variant="h3"
                align="center"
                color="#222222"
                fontWeight="bold"
                letterSpacing={1}
                fontFamily="Arial, sans-serif"
            >
                Welcome to Our Blog
            </Typography>
        </Box>
    );
};

export default Header;