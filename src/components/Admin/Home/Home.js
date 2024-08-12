"use client"
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Avatar, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { CssBaseline, Toolbar, AppBar } from '@mui/material';

const Home = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const sidebarContent = (
        <div role="presentation" className="flex flex-col h-full p-4 bg-gray-800 text-white">
            <div className="flex justify-end mb-4">
                <IconButton onClick={toggleDrawer}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className="flex items-center mb-4">
                <Avatar src="/profile.jpg" alt="Profile" className="mr-4" />
                <div>
                    <h2 className="text-lg font-bold">Admin Dashboard</h2>
                    <p className="text-sm">Welcome, Nitish</p>
                </div>
            </div>
            <Divider />
            <List className="mt-4">
                <ListItem button>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Users" />
                </ListItem>
                {/* <ListItem button>
                    <ListItemText primary="Contact" />
                </ListItem> */}
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
                    <span className="text-white ml-4 text-lg flex-1">Bus Pass</span>
                    <div className="flex items-center space-x-2">
                        <Avatar src="/profile.jpg" alt="Profile" />
                        <span className="text-white">Welcome, Nitish</span>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer}
                classes={{ paper: 'w-64' }}
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
