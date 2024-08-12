"use client";
import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Avatar,
    Divider,
    Menu,
    MenuItem,
    CssBaseline,
    Toolbar,
    AppBar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from "next/link";

const Home = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = () => {
        // Handle logout action
        handleMenuClose();
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
                {/* <ListItem button>
                    <Link href="/profile">
                        <ListItemText primary="Profile" />
                    </Link>
                </ListItem> */}
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
            <AppBar position="fixed" className="bg-blue-500 z-10">
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
                    <div className="flex items-center space-x-2 relative">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={handleProfileMenuOpen}
                        >
                            <Avatar src="/profile.jpg" alt="Profile" />
                            <span className="text-white ml-2">Welcome, Nitish</span>
                            <ArrowDropDownIcon className="text-white ml-1" /> {/* Dropdown Icon */}
                        </div>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                sx: {
                                    maxHeight: 200,
                                    width: '200px',
                                    mt: 1, // Add some top margin to separate from the trigger
                                },
                            }}
                        >
                            <Link href="/profile" passHref>
                                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                            </Link>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
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
            <div className={`flex-1 transition-all duration-300 ${open ? 'ml-64' : 'ml-0'}`}>
                <main className="p-4 mt-16">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Home;
