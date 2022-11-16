import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import axios from 'axios';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

const TABLE_HEAD = [
  { id: 'name', label: 'S No', alignRight: false },
  { id: 'company', label: 'Name', alignRight: false },
  { id: 'role', label: 'Subject', alignRight: false },
  { id: 'status', label: 'Role', alignRight: false },
  { id: 'status', label: 'Contact Details', alignRight: false },
  { id: 'isVerified', label: 'Date', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TeacherDetails() {
  const [role, setRole] = useState([]);
  const [teacherDetails, setTeacherDetails] = useState({
    name: '',
    subject: '',
    emailId: '',
    contactNo: '',
    loginId: '',
    password: '',
    role: '',
  });
  const handleRoleChange = (event) => {
    setTeacherDetails({
      ...teacherDetails,
      role: event.target.value,
    });
    console.log(teacherDetails);
  };

  const handleChange = ({ currentTarget: input }) => {
    setTeacherDetails({
      ...teacherDetails,
      [input.name]: input.value,
    });
    console.log(teacherDetails);
  };
  // useEffect(() => {
  //   // const getTeacherData = async () => {
  //   //   const { data } = await axios.get('');
  //   //   setTeacherDetails(data.data);
  //   //   console.log(data.data);
  //   // };

  //   // const getResults = async () => {
  //   //   const { data } = await axios.get(``);
  //   //   setResults(data.data);
  //   //   console.log(data.data);
  //   // };

  //   // getCustomerInfoData();
  //   // getResults();
  // }, []);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // console.log('checking');
  //     const formData = new FormData();
  //     // formData.append('name', name);
  //     // formData.append('', answerEvaluation.teacher);
  //     // formData.append('studentId', student.id);
  //     // formData.append('studentName', student.name);
  //     // formData.append('studentSubject', student.subject);

  //     console.log(formData);
  //     await axios
  //       .post(``, formData)
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     setTeacherDetails({
  //       name: '',
  //       subject: '',
  //       emailId: '',
  //       contactNo: '',
  //       loginId: '',
  //       password: '',
  //       role: '',
  //     });
  //     alert('Information submitted successfully');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack> */}
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
                  value={teacherDetails.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="text"
                  name="subject"
                  value={teacherDetails.subject}
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
                  value={teacherDetails.emailId}
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
                  value={teacherDetails.contactNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mr: { md: 1 } }}>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={teacherDetails.role}
                    label="Role"
                    onChange={handleRoleChange}
                  >
                    {role
                      ? role.map((t, idx) => {
                          return <MenuItem value={t.id}>{t.name}</MenuItem>;
                        })
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="LoginId"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="text"
                  name="loginId"
                  value={teacherDetails.loginId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="password"
                  name="password"
                  value={teacherDetails.password}
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

        <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer fullWidth>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={USERLIST.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id, name, role,subject,emailId,cNo,date  } = row;
                  const isItemSelected = selected.indexOf(name) !== -1;

                  return (
                    <TableRow
                    // hover
                    // key={id}
                    // tabIndex={-1}
                    // role="checkbox"
                    // selected={isItemSelected}
                    // aria-checked={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell> */}
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">{subject}</TableCell>
                      <TableCell align="left">{role}</TableCell>
                      <TableCell align="left">{role}</TableCell>
                      <TableCell align="left">{emailId} {cNo}</TableCell>
                      <TableCell align="left">{date}</TableCell>
                      <TableCell align="left">{role}</TableCell>
                      {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}

                      <TableCell align="right">
                        <UserMoreMenu />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={USERLIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Page>
  );
}
