"use client"
import React from 'react';
import { Container, Typography } from '@mui/material';
import Banner from '../Banner/Banner';
import CardPrice from '../CardPrice/CardPrice';

const Home = () => (
    <>
        <Banner />
        <CardPrice />
        <main className="py-10">

            <Container>
                <Typography variant="h4" gutterBottom>
                    Bus Pass Details
                </Typography>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <Typography variant="body1" paragraph>
                        Your bus pass details will appear here. You can manage your pass, check the status, and more.
                    </Typography>
                    {/* Add more details or components related to bus pass here */}
                </div>
            </Container>
        </main>
    </>

);

export default Home;
