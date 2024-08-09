import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Styled component for the image container
const ImageContainer = styled(Box)(({ theme }) => ({
    backgroundImage: 'url(/shutterstock_2407889395.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '60vh',
    [theme.breakpoints.down('md')]: {
        height: '30vh',
    },
}));

const TextContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left',
}));

const About = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box
                display="flex"
                flexDirection={isMobile ? 'column' : 'row'}
                alignItems="center"
                justifyContent="center"
                sx={{ height: 'auto' }}
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
                {!isMobile && <ImageContainer flex={1} />}
                {isMobile && <ImageContainer sx={{ height: '40vh', marginTop: '2rem' }} />}
            </Box>
        </Container>
    );
};

export default About;
