import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled component for the image container
const ImageContainer = styled(Box)(({ theme }) => ({
    backgroundImage: 'url(/shutterstock_288363524.jpg)', // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        display: 'none', // Hide image on small screens
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
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }} // Stack vertically on small screens
                alignItems="center"
                justifyContent="center"
                sx={{ height: '80vh' }} // Adjust the height as needed
            >
                <ImageContainer flex={1} />
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
            </Box>
        </Container>
    );
};

export default About;
