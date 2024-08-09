"use client"
import React from 'react';
import { Typography, Link } from '@mui/material';

const Footer = () => (
    <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
            <Typography variant="body2">
                {'Copyright © '}
                <Link href="https://cityinnovates.com/" color="inherit">
                    City Innovates
                </Link>
                {' '}{new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    </footer>
);

export default Footer;
