"use client"
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { CssBaseline, Toolbar, AppBar } from '@mui/material';

const Home = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const sidebarContent = (
        <div role="presentation" className="flex flex-col h-full p-4">
           
            <div className="flex justify-end mb-4">
               
                <IconButton onClick={toggleDrawer}>
                    <CloseIcon />
                </IconButton>
            </div>

            <h1>Admin Dashboard</h1>
        
            <List>
                <ListItem button>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="About" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Contact" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className="flex h-screen">
            <CssBaseline />
            <AppBar position="fixed" className="bg-blue-500">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <span className="text-white ml-4 text-lg">My Application</span>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer}
                classes={{ paper: 'w-64 bg-gray-800 text-white' }} 
            >
                {sidebarContent}
            </Drawer>
            <main className="flex-1 p-4 mt-16">
                <h1 className="text-2xl font-bold">Home</h1>
                <p className="mt-2">Welcome to the Home page!</p>
            </main>
        </div>
    );
};

export default Home;
