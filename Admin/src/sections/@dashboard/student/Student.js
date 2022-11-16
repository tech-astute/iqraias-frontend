import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
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
} from '@mui/material';
import TextField from '@mui/material/TextField';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user';
// mock
import USERLIST from '../../../_mock/user';

// ----------------------------------------------------------------------



export default function StudentDetails() {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    address: '',
    emailId: '',
    contactNo: '',
    batch: '',
    oSub: '',
    year: '',
  });

  const handleChange = ({ currentTarget: input }) => {
    setStudentDetails({
      ...studentDetails,
      [input.name]: input.value,
    });
    console.log(studentDetails);
  };


  
  return (
    <Page title="User">
      <Container>
       
<form 
// onSubmit={handleSubmit}
>
<Box mb={3}>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="text"
                  name="name"
                  value={studentDetails.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Target Year"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="number"
                  name="year"
                  value={studentDetails.year}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="text"
                  name="address"
                  value={studentDetails.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email Id"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="email"
                  name="emailId"
                  value={studentDetails.emailId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Contact Number"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="number"
                  name="contactNo"
                  value={studentDetails.contactNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Optional Subject"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="text"
                  name="oSub"
                  value={studentDetails.oSub}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Batch"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="text"
                  name="batch"
                  value={studentDetails.batch}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button variant="contained" mt={3}>
                Add
              </Button>
            </Box>
          </Box>
        </Box>
</form>
        

       
      </Container>
    </Page>
  );
}
