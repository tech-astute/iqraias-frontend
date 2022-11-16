import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'No.', alignRight: false },
  { id: 'email', label: 'Comment', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'subject', label: 'Subject', alignRight: false },
  { id: 'file', label: 'Uploaded File', alignRight: false },
  { id: 'result', label: 'Result', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 10,
  p: 4,
  borderRadius: '8px',
};

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

export default function User() {
  const student = JSON.parse(localStorage.getItem('profile')).data;
  console.log(student);
  const [teacher, setTeacher] = useState([]);
  // const [selectedTeacher, setSelectedTeacher] = useState('');
  const [answerFile, setAnswerFile] = useState();
  const [answerEvaluation, setAnswerEvaluation] = useState({
    teacher: '',
    subject:'',
  });
  const [results, setResults] = useState([]);

  const handleAnswerFile = (e) => {
    setAnswerFile(e.target.files[0], '$$$$');
    console.log(answerFile);
  };

  // const handleSelectedTeacher = (e) => {};

  useEffect(() => {
    const getCustomerInfoData = async () => {
      const { data } = await axios.get('http://localhost:8000/teacher/getTeachers');
      setTeacher(data.data);
      console.log(data.data);
    };

    const getResults = async () => {
      const { data } = await axios.get(`http://localhost:8000/student/getResults/${student.id}`);
      setResults(data.data);
      console.log(data.data);
    };

    getCustomerInfoData();
    getResults();
  }, []);

  console.log(teacher);
  console.log(results);

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  // ----------------------------------------------------------------------------------------------
  const handleSelectedTeacher = (event) => {
    setAnswerEvaluation({
      ...answerEvaluation,
      teacher: event.target.value,
    });
    console.log(answerEvaluation);
  };

  const handleChange = ({ currentTarget: input }) => {
    setAnswerEvaluation({
      ...answerEvaluation,
      [input.name]: input.value,
    });
    console.log(answerEvaluation);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log('checking');
      const formData = new FormData();
      formData.append('answerFile', answerFile);
      formData.append('teacherId', answerEvaluation.teacher);
      formData.append('studentId', student.id);
      formData.append('studentName', student.name);
      formData.append('studentSubject', student.subject);

      console.log(formData);
      await axios
        .post(`http://localhost:8000/student/addAnswerEvaluation/${answerEvaluation.teacher}`, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      setAnswerEvaluation({
        teacher: '',
        subject:'',
      });
      alert('Information submitted successfully');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Page title="User">
      <Container>
        <form onSubmit={handleSubmit}>
          <Card>
            <Box p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mr: { md: 1 } }}>
                    <InputLabel id="demo-simple-select-label">Select Teacher</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={answerEvaluation.teacher}
                      label="Select Teacher"
                      onChange={handleSelectedTeacher}
                    >
                      {teacher
                        ? teacher.map((t, idx) => {
                            return <MenuItem value={t.id}>{t.name}</MenuItem>;
                          })
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    className="file-input"
                    value={answerFile}
                    onChange={(e) => handleAnswerFile(e)}
                    variant="outlined"
                    component="label"
                    sx={{ width: '100%', ml: { md: 1 }, mt: { xs: 2, md: 0 }, height: '50px' }}
                  >
                    Upload File
                    <input
                      hidden
                      // accept="image/*"
                      type="file"
                    />
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                // sx={{ mr: { md: 1 } }}
                type="text"
                name="subject"
                value={answerEvaluation.subject}
                onChange={handleChange}
              />
                </Grid>
              </Grid>
              <Box mt={3}>
                <Button type="submit" variant="contained">
                  Send
                </Button>
              </Box>
            </Box>
          </Card>
        </form>

        <Box mt={3}>
          <Card>
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
                    {results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, name, createdAt, comment, resultFile, answerFile,subject} = row;
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
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{comment}</TableCell>
                          <TableCell align="left">{createdAt.slice(0, 10)}</TableCell>
                          <TableCell align="left">{subject}</TableCell>
                          <TableCell align="left">
                            <a href={answerFile} target="_blank" rel="noreferrer" style={{textDecoration:'none'}}>
                            <Button variant="contained">
                              View
                            </Button>
                            </a>
                            <Modal
                              open={open1}
                              onClose={handleClose1}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <Typography variant="h6">Uploaded Copy:</Typography>
                                    <div>{answerFile}</div>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Modal>
                          </TableCell>
                          <TableCell align="left">
                            <a href={resultFile} target="_blank" rel="noreferrer" style={{textDecoration:'none'}}>
                            <Button variant="contained">
                              View
                            </Button>
                            </a>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <Typography variant="h6">Evaluated Copy: </Typography>
                                    <Typography variant="body1">{resultFile}</Typography>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Typography variant="h6">Comment: </Typography>
                                    <Typography variant="body1">{comment}</Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Modal>
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
          </Card>
        </Box>
      </Container>
    </Page>
  );
}
