"use client";
import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiUsers, logout } from '../../../app/redux/slice';
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners"; 

const Home = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();
    const dispatch = useDispatch();
    const { userAPIData, isLoading, error } = useSelector((state) => state.user || {});

    console.log("User API Data:", userAPIData);
    console.log("Loading:", isLoading);
    console.log("Error:", error);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchApiUsers()).unwrap();
            } catch (err) {
                if (err.message === "Unauthorized. Redirecting to login.") {
                    router.push('/login'); 
                }
            }
        };

        fetchData();
    }, [dispatch, router]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            router.push('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const firstName = userAPIData?.firstName || 'John';
    const lastName = userAPIData?.lastName || 'Doe';
    const role = userAPIData?.role || 'user'; 
    const image = userAPIData?.image_url || 'user'; 

    const sidebarContent = (
        <div role="presentation" className="flex flex-col h-full p-4 bg-gray-800 text-white">
            <div className="flex justify-end mb-4">
                <IconButton onClick={toggleDrawer}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Link href="/dashboard">
                <div className="flex items-center mb-4">
                    <Avatar src={image} alt="Profile" className="mr-4" />
                    <div>
                        <h2 className="text-lg font-bold">{role === 'admin' ? "Admin Dashboard" : "User Dashboard"}</h2>
                        <p className="text-sm">{`${firstName} ${lastName}`}</p>
                    </div>
                </div>
            </Link>
            <Divider />
            <List className="mt-4">
                {role === 'admin' && (
                    <ListItem button>
                        <Link href="/dashboard/user">
                            <ListItemText primary="Users" />
                        </Link>
                    </ListItem>
                )}
                {role === 'user' && (
                    <ListItem button>
                        <Link href="/dashboard/request-user">
                            <ListItemText primary="Request Pass" />
                        </Link>
                    </ListItem>
                )}
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
                        {isLoading ? (
                            <BeatLoader color="#ffffff" loading={isLoading} size={15} />
                        ) : (
                            <div
                                className="flex items-center cursor-pointer"
                                onClick={handleProfileMenuOpen}
                            >
                                <Avatar src={image} alt="Profile" />
                                <span className="text-white ml-2">{`${firstName} ${lastName}`}</span>
                                <ArrowDropDownIcon className="text-white ml-1" /> {/* Dropdown Icon */}
                            </div>
                        )}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                sx: {
                                    maxHeight: 200,
                                    width: '200px',
                                    mt: 1,
                                },
                            }}
                        >
                            <Link href="/dashboard/profile" passHref>
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
