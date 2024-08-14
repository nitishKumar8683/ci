"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
    CircularProgress, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchUserData } from '../../../app/redux/user/userSlice';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { PuffLoader } from "react-spinners";

// Yup schema for validation
const validationSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phonenumber: yup.string()
        .matches(/^\d{10}$/, 'Phone number must be a 10-digit number')
        .required('Phone number is required'),
    email: yup.string().email('Email must be valid').required('Email is required'),
});

const Users = () => {
    const dispatch = useDispatch();
    const { userAllAPIData, isLoading, error } = useSelector((state) => state.userAll || {});
    const [openModal, setOpenModal] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [initialValues, setInitialValues] = useState({
        firstName: '',
        lastName: '',
        phonenumber: '',
        email: '',
    });
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

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

    const handleConfirmDelete = async () => {
        if (selectedUserId) {
            setDeleteLoading(true);
            try {
                const response = await axios.delete(`/api/deleteUser/${selectedUserId}`);
                console.log(response.status);
                if (response.status === 200) {
                    toast.success(response.data.message);
                    setTimeout(() => {
                        dispatch(fetchUserData());
                        handleCloseModal();
                    }, 3000);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("Failed to delete user. Please try again.");
            }
            setDeleteLoading(false);
            handleCloseModal();
        }
    };

    const handleOpenEditModal = (user) => {
        setInitialValues({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            phonenumber: user.phonenumber || '',
            email: user.email || '',
        });
        setSelectedUserId(user._id);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setInitialValues({
            firstName: '',
            lastName: '',
            phonenumber: '',
            email: '',
        });
    };

    const handleEditSubmit = async (values) => {
        setUpdateLoading(true);
        try {
            const response = await axios.put(`/api/updateUser/${selectedUserId}`, values);
            console.log(response);
            if (response.data.status === 201) {
                toast.success(response.data.message);
                setTimeout(() => {
                    dispatch(fetchUserData());
                    handleCloseEditModal();
                }, 3000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to update user. Please try again.");
        }
        setUpdateLoading(false);
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
                <Typography color="error" variant="h6"> Error: {error} </Typography>
            </div>
        );
    }

    return (
        <>
            <ToastContainer />
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
                                                <IconButton
                                                    aria-label="edit"
                                                    color="primary"
                                                    onClick={() => handleOpenEditModal(row)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="delete"
                                                    color="error"
                                                    onClick={() => handleOpenModal(row._id)}
                                                >
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
                        {deleteLoading && (
                            <div className="flex justify-center items-center min-h-[100px]">
                                <PuffLoader color="#007bff" loading={deleteLoading} size={60} />
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">Cancel</Button>
                        <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                    </DialogActions>
                </Dialog>

                {/* Edit User Modal */}
                <Dialog
                    open={editModalOpen}
                    onClose={handleCloseEditModal}
                    aria-labelledby="edit-user-dialog-title"
                    aria-describedby="edit-user-dialog-description"
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle
                        id="edit-user-dialog-title"
                        sx={{ fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'center' }}
                    >
                        Edit User
                    </DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleEditSubmit}
                        >
                            {({ errors, touched, isSubmitting }) => (
                                <Form>
                                    <div className="space-y-4">
                                        <div className="mb-4">
                                            <Field
                                                as={TextField}
                                                label="First Name"
                                                name="firstName"
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                placeholder="Enter first name"
                                                helperText={<ErrorMessage name="firstName" />}
                                                error={Boolean(errors.firstName)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Field
                                                as={TextField}
                                                label="Last Name"
                                                name="lastName"
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                placeholder="Enter last name"
                                                helperText={<ErrorMessage name="lastName" />}
                                                error={Boolean(errors.lastName)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Field
                                                as={TextField}
                                                label="Phone Number"
                                                name="phonenumber"
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                placeholder="Enter phone number"
                                                helperText={<ErrorMessage name="phonenumber" />}
                                                error={Boolean(errors.phonenumber)}
                                                inputProps={{ pattern: "[0-9]{10}", title: "Phone number should be 10 digits" }}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Field
                                                as={TextField}
                                                label="Email"
                                                name="email"
                                                type="email"
                                                fullWidth
                                                margin="normal"
                                                variant="outlined"
                                                placeholder="Enter email"
                                                helperText={<ErrorMessage name="email" />}
                                                error={Boolean(errors.email)}
                                            />
                                        </div>
                                    </div>
                                    <DialogActions
                                        sx={{ justifyContent: 'end', paddingBottom: '16px' }}
                                    >
                                        <Button
                                            type="button"
                                            onClick={handleCloseEditModal}
                                            color="secondary"
                                            variant="outlined"
                                            sx={{ marginRight: '8px' }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            disabled={isSubmitting}
                                        >
                                            {updateLoading ? (
                                                <div className="flex justify-center items-center">
                                                    <PuffLoader color="#ffffff" loading={updateLoading} size={24} />
                                                </div>
                                            ) : (
                                                'Save'
                                            )}
                                        </Button>
                                    </DialogActions>
                                </Form>
                            )}
                        </Formik>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default Users;
