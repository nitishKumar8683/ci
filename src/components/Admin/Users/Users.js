import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Sample data
const rows = [
    { id: 1, name: 'John Doe', age: 28, email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
    { id: 3, name: 'Alice Johnson', age: 29, email: 'alice.johnson@example.com' },
    { id: 4, name: 'Bob Brown', age: 40, email: 'bob.brown@example.com' },
];

const Users = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-md">
            <TableContainer component={Paper} className="shadow-lg border border-gray-200 rounded-lg overflow-hidden">
                <Table>
                    <TableHead>
                        <TableRow className="bg-gray-100 border-b border-gray-200">
                            <TableCell className="font-bold text-gray-700 px-6 py-3">ID</TableCell>
                            <TableCell className="font-bold text-gray-700 px-6 py-3">Name</TableCell>
                            <TableCell className="font-bold text-gray-700 px-6 py-3">Age</TableCell>
                            <TableCell className="font-bold text-gray-700 px-6 py-3">Email</TableCell>
                            <TableCell className="font-bold text-gray-700 px-6 py-3">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id} className="hover:bg-gray-50 transition-colors duration-300">
                                <TableCell className="px-6 py-4">{row.id}</TableCell>
                                <TableCell className="px-6 py-4">{row.name}</TableCell>
                                <TableCell className="px-6 py-4">{row.age}</TableCell>
                                <TableCell className="px-6 py-4">{row.email}</TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex justify-start items-center space-x-2">
                                        <IconButton aria-label="edit" color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Users;
