import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Styled component for the image container
const ImageContainer = styled(Box)(({ theme }) => ({
    backgroundImage: 'url(/shutterstock_288363524.jpg)', // Ensure this path is correct
    backgroundSize: 'cover',  // Cover ensures the image covers the container area
    backgroundPosition: 'center', // Center the image within the container
    backgroundRepeat: 'no-repeat', // Prevent repeating the image
    width: '100%', // Full width of the container
    height: '60vh', // Set a reasonable height for larger screens
    [theme.breakpoints.down('md')]: {
        height: '50vh', // Adjust the height for smaller screens
    },
}));

// Styled component for the text container
const TextContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left',
}));

const About = () => {
    const theme = useTheme(); // Access the theme
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if screen size matches

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box
                display="flex"
                flexDirection={isMobile ? 'column' : 'row'} // Switch layout based on screen size
                alignItems="center"
                justifyContent="center"
                sx={{ height: 'auto' }} // Auto height to fit content
            >
                <TextContainer flex={1}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Welcome to our bus pass service! We are dedicated to providing you with the best transportation solutions. Our goal is to make your travel experience as smooth and convenient as possible. With our user-friendly bus passes, you can easily navigate the city without the hassle of cash transactions. Whether you’re a daily commuter or a tourist, our passes are designed to fit your needs. Join us in making your journeys easier and more enjoyable!
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Our team is committed to customer satisfaction and we continually strive to improve our services based on your feedback. If you have any questions or suggestions, please do not hesitate to contact us. Thank you for choosing us for your transportation needs!
                    </Typography>
                </TextContainer>
                {!isMobile && <ImageContainer flex={1} />} {/* Show image only on larger screens */}
                {isMobile && <ImageContainer sx={{ height: '40vh', marginTop: '2rem' }} />} {/* Adjust height and margin for mobile */}
            </Box>
        </Container>
    );
};

export default About;
