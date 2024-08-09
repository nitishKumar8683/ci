import React from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';

const ContactUs = () => {
    const formContactUs = (e) => {
        e.preventDefault();
        alert("Working on it...")
    }
    return (
        <Container maxWidth="sm" sx={{ marginTop: 5 }}>
            <Typography variant="h4" gutterBottom>
                Contact Us
            </Typography>
            <form noValidate autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Message"
                            variant="outlined"
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={formContactUs}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default ContactUs;
