"use client";
import React, { useState, useEffect } from 'react';
import { Button, MenuItem, FormControl, InputLabel, Select, FormHelperText, Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DefaultPage from "../../../components/Admin/Home/Home";
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiUsers, logout } from '../../../app/redux/slice';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BeatLoader from 'react-spinners/BeatLoader';

// List of major cities in India
const locations = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Kolkata', 'Chennai',
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Vadodara', 'Meerut', 'Rajkot'
];

const BusPassForm = () => {
    const [formData, setFormData] = useState({
        from: '',
        where: '',
        busType: 'Standard',
        days: '30',
    });
    const [error, setError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false); // State for confirmation modal
    const [busPasses, setBusPasses] = useState([]);
    const [editPass, setEditPass] = useState(null); // State to handle edit
    const [passToDelete, setPassToDelete] = useState(null); // ID of the pass to delete
    const [loading, setLoading] = useState(true); // Loading state

    const router = useRouter();
    const dispatch = useDispatch();
    const { userAPIData, isLoading } = useSelector((state) => state.user || {});

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchApiUsers()).unwrap();
                const response = await fetch('/api/Pass/getPass');
                if (!response.ok) {
                    throw new Error('Failed to fetch bus passes');
                }
                const data = await response.json();
                setBusPasses(data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                if (err.message === "Unauthorized. Redirecting to login.") {
                    router.push('/login');
                } else {
                    console.error(err);
                }
                setLoading(false); // Set loading to false even if an error occurs
            }
        };

        fetchData();
    }, [dispatch, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (formData.from && formData.where) {
            setError('');
        }
    };

    const userId = userAPIData?._id;
    console.log("User ID:", userId);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.from || !formData.where || !userId) {
            setError('Please fill in all fields');
            return;
        }
        setError('');

        try {
            const response = await fetch('/api/Pass/createPass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    from: formData.from,
                    where: formData.where,
                    days: formData.days,
                    busType: formData.busType,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Form submitted successfully:', result);
                toast.success(result.message);
                setFormData({
                    from: '',
                    where: '',
                    busType: 'Standard',
                    days: '30',
                });
                setOpenModal(false);
                // Fetch bus passes again to reflect the newly added pass
                const updatedResponse = await fetch('/api/Pass/getPass');
                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setBusPasses(updatedData);
                }
            } else {
                const errorData = await response.json();
                toast.error(errorData.message);
                setError(errorData.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('An error occurred while submitting the form');
        }
    };

    const handleEdit = (pass) => {
        setEditPass(pass);
        setFormData({
            from: pass.from,
            where: pass.where,
            busType: pass.busType,
            days: pass.days,
        });
        setOpenModal(true);
    };

    const handleDelete = (id) => {
        setPassToDelete(id);
        setOpenConfirmModal(true); // Open confirmation modal
    };

    const confirmDelete = async () => {
        if (passToDelete) {
            try {
                const response = await fetch(`/api/Pass/deletePass/${passToDelete}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success('Pass deleted successfully');
                    // Fetch bus passes again to reflect the deletion
                    const updatedResponse = await fetch('/api/Pass/getPass');
                    if (updatedResponse.ok) {
                        const updatedData = await updatedResponse.json();
                        setBusPasses(updatedData);
                    }
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message);
                }
            } catch (error) {
                console.error('Error deleting pass:', error);
                toast.error('An error occurred while deleting the pass');
            }
            setOpenConfirmModal(false); 
        }
    };

    const cancelDelete = () => {
        setOpenConfirmModal(false); // Close confirmation modal without deleting
    };

    return (
        <DefaultPage>
            <ToastContainer />
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
                <div className="flex justify-end mb-4">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setEditPass(null);
                            setFormData({
                                from: '',
                                where: '',
                                busType: 'Standard',
                                days: '30',
                            });
                            setOpenModal(true);
                        }}
                    >
                        Request Pass
                    </Button>
                </div>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Days</TableCell>
                                <TableCell>Bus Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <BeatLoader
                                                color="#1976d2"
                                                loading={loading}
                                            />
                                        </div>
                                    </TableCell>

                                </TableRow>
                            ) : busPasses.length > 0 ? (
                                busPasses.map((pass) => (
                                    <TableRow key={pass._id}>
                                        <TableCell>{pass.from}</TableCell>
                                        <TableCell>{pass.where}</TableCell>
                                        <TableCell>{pass.days}</TableCell>
                                        <TableCell>{pass.busType}</TableCell>
                                        <TableCell>{pass.status || 'Pendingss'}</TableCell> {/* Status field */}
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(pass)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(pass._id)} color="secondary">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No Pass available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Modal for the form */}
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4
                    }}>
                        <Typography id="modal-title" variant="h6" component="h2">
                            {editPass ? 'Edit Bus Pass' : 'Bus Pass Request Form'}
                        </Typography>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                            <div>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>From</InputLabel>
                                    <Select
                                        name="from"
                                        value={formData.from}
                                        onChange={handleChange}
                                        label="From"
                                    >
                                        {locations.map((location) => (
                                            <MenuItem key={location} value={location}>
                                                {location}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Select your departure location</FormHelperText>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>To</InputLabel>
                                    <Select
                                        name="where"
                                        value={formData.where}
                                        onChange={handleChange}
                                        label="Where"
                                    >
                                        {locations.map((location) => (
                                            <MenuItem key={location} value={location}>
                                                {location}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>Select your destination</FormHelperText>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Days</InputLabel>
                                    <Select
                                        name="days"
                                        value={formData.days}
                                        onChange={handleChange}
                                        label="Days"
                                    >
                                        <MenuItem value="30">30 Days</MenuItem>
                                        <MenuItem value="60">60 Days</MenuItem>
                                        <MenuItem value="90">90 Days</MenuItem>
                                    </Select>
                                    <FormHelperText>Select the number of days</FormHelperText>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Bus Type</InputLabel>
                                    <Select
                                        name="busType"
                                        value={formData.busType}
                                        onChange={handleChange}
                                        label="Bus Type"
                                    >
                                        <MenuItem value="Basic">Basic</MenuItem>
                                        <MenuItem value="Standard">Standard</MenuItem>
                                        <MenuItem value="Premium">Premium</MenuItem>
                                    </Select>
                                    <FormHelperText>Select the type of bus pass</FormHelperText>
                                </FormControl>
                            </div>
                            {error && (
                                <div className="text-red-500 text-center">
                                    {error}
                                </div>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                {editPass ? 'Update Pass' : 'Request Pass'}
                            </Button>
                        </form>
                    </Box>
                </Modal>

                {/* Confirmation Modal */}
                <Modal
                    open={openConfirmModal}
                    onClose={() => setOpenConfirmModal(false)}
                    aria-labelledby="confirm-modal-title"
                    aria-describedby="confirm-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center'
                    }}>
                        <Typography id="confirm-modal-title" variant="h6" component="h2">
                            Are you sure you want to delete this pass?
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                onClick={confirmDelete}
                                variant="contained"
                                color="primary"
                                sx={{ mr: 1 }}
                            >
                                Yes
                            </Button>
                            <Button
                                onClick={cancelDelete}
                                variant="outlined"
                                color="secondary"
                            >
                                No
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </DefaultPage>
    );
};

export default BusPassForm;
