import React from 'react';
import {
  Box,
  Grid,
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import TextField from '@mui/material/TextField';

const Prelims = () => {
  return (
    <>
      <Box mt={5} mb={3}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Upload Prelims Paper
          </Typography>
        </Grid>
          <Grid item xs={12} md={6}>
            <Box>
            <Button variant="contained" fullWidth component="label">
              Upload Prelims Paper 1
              <input
                hidden
                // accept="image/*"
                type="file"
              />
            </Button>
            </Box>
            
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" fullWidth component="label">
              Upload CSAT Paper
              <input
                hidden
                // accept="image/*"
                type="file"
              />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Prelims;
