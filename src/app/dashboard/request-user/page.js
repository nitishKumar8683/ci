"use client";
import React, { useState, useEffect } from 'react';
import { Button, MenuItem, FormControl, InputLabel, Select, FormHelperText, Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DefaultPage from "../../../components/Admin/Home/Home";
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiUsers, logout } from '../../../app/redux/slice';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// List of major cities in India
const locations = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Kolkata', 'Chennai',
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Vadodara', 'Meerut', 'Rajkot'
];

// Dummy data for the table
const busPasses = [
    { id: 1, from: 'Mumbai', to: 'Delhi', days: '30', busType: 'Standard' },
    { id: 2, from: 'Bengaluru', to: 'Chennai', days: '60', busType: 'Premium' },
    { id: 3, from: 'Kolkata', to: 'Hyderabad', days: '90', busType: 'Basic' },
    // Add more entries as needed
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
    const router = useRouter();
    const dispatch = useDispatch();
    const { userAPIData, isLoading } = useSelector((state) => state.user || {});

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

    const userId = userAPIData?._id ;
    console.log("check" , userId)

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
                 toast.success(result.message)
                setFormData({
                    from: '',
                    where: '',
                    busType: 'Standard',
                    days: '30',
                });
                setOpenModal(false); 
            } else {
                const errorData = await response.json();
                toast.error(errorData.message)
                setError(errorData.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('An error occurred while submitting the form');
        }
    };



    return (
        <DefaultPage>
            <ToastContainer />
            <div className="flex flex-col min-h-screen bg-gray-100 p-6">
                <div className="flex justify-end mb-4">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenModal(true)}
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {busPasses.map((pass) => (
                                <TableRow key={pass.id}>
                                    <TableCell>{pass.from}</TableCell>
                                    <TableCell>{pass.to}</TableCell>
                                    <TableCell>{pass.days}</TableCell>
                                    <TableCell>{pass.busType}</TableCell>
                                </TableRow>
                            ))}
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
                            Bus Pass Request Form
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
                                Request Pass
                            </Button>
                        </form>
                    </Box>
                </Modal>
            </div>
        </DefaultPage>
    );
};

export default BusPassForm;
