"use client"
import React from 'react';
import { Button, Typography } from '@mui/material';
import Link from "next/link";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BusPassLogo from '../BusPassLogo/BusPassLogo';

const theme = createTheme();

const Header = () => (
    <ThemeProvider theme={theme}>
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <BusPassLogo />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        Bus Pass
                    </Typography>
                </div>
                <div>
                    <Link href="/login" >
                        <Button variant="contained" color="secondary" sx={{ mr: 2 }}>
                            Login
                        </Button>
                    </Link>

                    <Link href="/register" >
                        <Button variant="contained" color="primary">
                            Signup
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    </ThemeProvider>
);

export default Header;
