"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    CircularProgress,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchUserData } from '../../../app/redux/user/userSlice';

const Users = () => {
    const dispatch = useDispatch();
    const { userAllAPIData, isLoading, error } = useSelector((state) => state.userAll || {});
    const [openModal, setOpenModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    const handleOpenModal = (userId) => {
        setSelectedUserId(userId);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUserId(null);
    };

    const handleConfirmDelete = () => {
        // Handle delete action here
        alert("Deleted user with id:", selectedUserId);
        handleCloseModal();
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <CircularProgress size={60} color="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Typography color="error" variant="h6">
                    Error: {error}
                </Typography>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-md">
            <TableContainer component={Paper} className="shadow-lg border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-100 border-b border-gray-200">
                            <TableCell className="font-bold text-gray-700 px-6 py-3">First Name</TableCell>
                            <TableCell className="font-bold text-gray-700 px-6 py-3">Last Name</TableCell>
                            <TableCell className="font-bold text-gray-700 px-6 py-3">Phone Number</TableCell>
                            <TableCell className="font-bold text-gray-700 px-6 py-3">Email</TableCell>
                            <TableCell className="font-bold text-gray-700 px-6 py-3">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(userAllAPIData) && userAllAPIData.length > 0 ? (
                            userAllAPIData.map((row) => (
                                <TableRow key={row._id} className="hover:bg-gray-50 transition-colors duration-300">
                                    <TableCell className="px-6 py-4">{row.firstName}</TableCell>
                                    <TableCell className="px-6 py-4">{row.lastName}</TableCell>
                                    <TableCell className="px-6 py-4">{row.phonenumber || 'N/A'}</TableCell>
                                    <TableCell className="px-6 py-4">{row.email}</TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex justify-start items-center space-x-2">
                                            <IconButton aria-label="edit" color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" color="error" onClick={() => handleOpenModal(row._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">No data available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Confirmation Modal */}
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="confirm-delete-dialog-title"
                aria-describedby="confirm-delete-dialog-description"
            >
                <DialogTitle id="confirm-delete-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this user? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Users;
