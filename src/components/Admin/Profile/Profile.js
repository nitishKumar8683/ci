"use client";
import React, { useState } from 'react';
import {
    Avatar,
    Typography,
    Divider,
    Box,
    Button,
    Paper,
    Grid,
    IconButton,
    Tooltip,
    TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DefaultPage from "@/components/Admin/Home/Home";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: 'Nitish Kumar',
        email: 'nitish@example.com',
        phone: '+1234567890',
        address: '123 Main Street, City, Country',
        profileImage: '/profile.jpg', 
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (upload) => {
                setUser((prev) => ({ ...prev, profileImage: upload.target.result }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <DefaultPage>
            <Box sx={{ padding: 5, maxWidth: 600, margin: 'auto', backgroundColor: '#f0f4f8'  }}>
                <Paper elevation={5} sx={{ padding: 4, borderRadius: 2, backgroundColor: '#ffffff' }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box position="relative">
                            <Avatar
                                src={user.profileImage}
                                alt={user.name}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mb: 2,
                                    border: '2px solid #1976d2',
                                    transition: '0.3s',
                                    '&:hover': { transform: 'scale(1.05)' },
                                }}
                            />
                            {isEditing && (
                                <IconButton
                                    component="label"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        bgcolor: '#1976d2',
                                        color: '#fff',
                                        '&:hover': {
                                            bgcolor: '#1565c0',
                                        },
                                    }}
                                >
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <CameraAltIcon />
                                </IconButton>
                            )}
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {user.name}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, color: 'gray', textAlign: 'center' }}>
                            {user.bio}
                        </Typography>

                        {/* Conditional rendering of fields */}
                        {isEditing ? (
                            <>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Phone"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Address"
                                    name="address"
                                    value={user.address}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                            </>
                        ) : (
                            <>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Email:</strong> {user.email}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Phone:</strong> {user.phone}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Address:</strong> {user.address}
                                </Typography>
                            </>
                        )}
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Tooltip title={isEditing ? "Cancel editing" : "Edit your profile"} arrow>
                                <IconButton
                                    onClick={handleEditToggle}
                                    sx={{
                                        width: '100%',
                                        backgroundColor: isEditing ? '#e57373' : '#1976d2',
                                        '&:hover': {
                                            backgroundColor: isEditing ? '#c62828' : '#0d47a1',
                                            transform: 'scale(1.05)',
                                        },
                                        borderRadius: '20px',
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={6}>
                            {isEditing && (
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => {
                                        setIsEditing(false);
                                    }}
                                    sx={{
                                        '&:hover': { backgroundColor: '#1565c0', transform: 'scale(1.05)' },
                                        borderRadius: '20px',
                                    }}
                                >
                                    Save Changes
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </DefaultPage>
    );
};

export default Profile;
