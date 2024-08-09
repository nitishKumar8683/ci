"use client"
import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Header = () => (
    <ThemeProvider theme={theme}>
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Typography variant="h6">Bus Pass System</Typography>
                <div>
                    <Button variant="contained" color="secondary" sx={{ mr: 2 }}>
                        Login
                    </Button>
                    <Button variant="contained" color="primary">
                        Signup
                    </Button>
                </div>
            </div>
        </header>
    </ThemeProvider>
);

export default Header;
