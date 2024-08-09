import React from 'react';
import { Container, Grid, Card, CardContent, Typography, List, ListItem, Button } from '@mui/material';

const cardData = [
    {
        title: 'Basic Pass',
        price: '$30',
        benefits: [
            'Unlimited local rides',
            'Valid for 30 days',
            'Access to all standard routes'
        ],
        textColor: '#0d47a1',
        benefitColor: '#1565c0',
        fontFamily: 'Arial, sans-serif',
        bgColor: '#e3f2fd' 
    },
    {
        title: 'Standard Pass',
        price: '$60',
        benefits: [
            'Unlimited local and regional rides',
            'Valid for 60 days',
            'Access to premium routes',
            'Priority seating'
        ],
        textColor: '#388e3c',
        benefitColor: '#2e7d32',
        fontFamily: 'Verdana, sans-serif',
        bgColor: '#f1f8e9' 
    },
    {
        title: 'Premium Pass',
        price: '$100',
        benefits: [
            'Unlimited local, regional, and express rides',
            'Valid for 90 days',
            'Access to all routes',
            'Free Wi-Fi on buses',
            'Complimentary drinks'
        ],
        textColor: '#d81b60',
        benefitColor: '#c2185b',
        fontFamily: 'Tahoma, sans-serif',
        bgColor: '#fce4ec' 
    }
];

const CardPrice = () => {
    const buyPrice = (e) => {
        e.preventDefault();
        alert("Working on it...")
    }
    return (
        <Container >
            <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                    textAlign: 'center',
                    mb: 4,
                    mt: 4,
                    color: 'primary.main',
                    fontWeight: 'bold',
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Responsive font size
                    position: 'relative',
                    whiteSpace: 'nowrap', // Prevent text from wrapping
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: -10,
                        height: 2,
                        backgroundColor: '#6c757d',
                        borderRadius: 1,
                    }
                }}
            >
                Choose Your Bus Pass
            </Typography>

            <Grid container  spacing={3}>
                {cardData.map((card, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Card
                            variant="outlined"
                            sx={{
                                height: '400px', 
                                backgroundColor: card.bgColor,
                                color: card.textColor,
                                boxShadow: 3,
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: 6,
                                    opacity: 0.9
                                }
                            }}
                        >
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary" gutterBottom>
                                        {card.price}
                                    </Typography>
                                    <List sx={{ flexGrow: 1, paddingTop: 2 }}>
                                        {card.benefits.map((benefit, i) => (
                                            <ListItem key={i} sx={{ padding: 0, marginBottom: 1 }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: card.benefitColor,
                                                        fontFamily: card.fontFamily,
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {benefit}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                                <Button
                                    onClick={buyPrice}
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        mt: 'auto',
                                        width: '100%',
                                        transition: 'all 0.3s ease-in-out', 
                                        '&:hover': {
                                            transform: 'scale(1.05)', 
                                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
                                            backgroundColor: 'secondary.main', 
                                            color: 'primary.contrastText' 
                                        }
                                    }}
                                >
                                    Buy Now
                                </Button>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CardPrice;
