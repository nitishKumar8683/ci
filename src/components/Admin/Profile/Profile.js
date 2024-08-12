import React from 'react';
import { Avatar, Typography, Divider } from '@mui/material';

const Profile = () => {
    // Example user data. Replace with actual data as needed.
    const user = {
        name: 'Nitish Kumar',
        email: 'nitish@example.com',
        phone: '+1234567890',
        address: '123 Main Street, City, Country',
        profileImage: '/profile.jpg', // Path to profile image
    };

    return (
        <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
            <Avatar
                src={user.profileImage}
                alt={user.name}
                sx={{ width: 120, height: 120 }} // Adjust size as needed
                className="mb-4"
            />
            <Typography variant="h4" className="font-bold mb-2">
                {user.name}
            </Typography>
            <Typography variant="body1" className="mb-2">
                <span className="font-semibold">Email:</span> {user.email}
            </Typography>
            <Typography variant="body1" className="mb-2">
                <span className="font-semibold">Phone:</span> {user.phone}
            </Typography>
            <Typography variant="body1" className="mb-4">
                <span className="font-semibold">Address:</span> {user.address}
            </Typography>
            <Divider className="my-4" />
            {/* Additional sections or actions can be added here */}
        </div>
    );
};

export default Profile;
