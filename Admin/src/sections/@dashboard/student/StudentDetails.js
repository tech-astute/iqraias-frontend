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

const TABLE_HEAD = [
  { id: 'SNo', label: 'S No', alignRight: false },
  { id: 'company', label: 'Name', alignRight: false },
  { id: 'role', label: 'Address', alignRight: false },
  { id: 'isVerified', label: 'Contact Details', alignRight: false },
  { id: 'role', label: 'Target Year', alignRight: false },
  { id: 'status', label: 'Optional Subject', alignRight: false },
  { id: 'status', label: 'Batch', alignRight: false },
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
        

        <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
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
                  const { id, name, role, status, company, avatarUrl, isVerified } = row;
                  const isItemSelected = selected.indexOf(name) !== -1;

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {/* <Avatar alt={name} src={avatarUrl} /> */}
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{company}</TableCell>
                      <TableCell align="left">{role}</TableCell>
                      <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
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
