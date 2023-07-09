import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { keyframes } from '@mui/styled-engine';

// Keyframe animation for fading in
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

// Styled components for custom styles
const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const StyledBox = styled(Box)`
    text-align: center;
    animation: ${fadeIn} 1s ease-in;
`;

const StyledTypography = styled(Typography)`
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    font-weight: bold;
    color: #333;
`;

const AboutMePage = () => {
    return (
        <StyledContainer maxWidth="md">
            <StyledBox>
                <StyledTypography variant="h2" component="h1" gutterBottom>
                    About Me
                </StyledTypography>
                <Typography variant="body1" component="p" paragraph>
                    Third year Computer Science student at Reichman University with 4 semesters left until graduation.
                </Typography>
                <Typography variant="body1" component="p" paragraph>
                    An individual with exceptional cognitive abilities, adaptability, and a proclivity for excelling under pressure, who possesses a keen understanding of logic and superior social skills. A highly motivated learner, determined to continually develop and improve.
                </Typography>
            </StyledBox>
        </StyledContainer>
    );
};

export default AboutMePage;
