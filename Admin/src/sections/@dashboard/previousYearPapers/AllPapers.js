import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal
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
  { id: 'TName', label: 'Year', alignRight: false },
  { id: 'subject', label: 'Prelims', alignRight: false },
  { id: 'subject', label: 'Mains', alignRight: false },
  //   { id: 'view', label: 'Action', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius:'8px',
    justifyContent:'center',
    pt: 2,
    px: 4,
    pb: 3,
  };

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

export default function AllPapers() {
    const [openPre, setOpenPre] = useState(false);
  const handleOpenPre = () => {
    setOpenPre(true);
  };
  const handleClosePre = () => setOpenPre(false);
  const [openMains, setOpenMains] = useState(false);
  const handleOpenMains = () => {
    setOpenMains(true);
  };
  const handleCloseMains = () => setOpenMains(false);

  // const handleSubmitPre = async (e) => {
    //     e.preventDefault();
    //     console.log(mainsPaper.quesFile);
    //     try {
    //       const formData = new FormData();
    //       formData.append('quesFile', quesFile);
    
    //       await axios
    //         .post(`http://localhost:8000/teacher/addResult/${answerEvalData.studentId}`, formData)
    //         .then((res) => {
    //           console.log(res);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //       setQuesFile({
    //         quesFile: '',
    //       });
    
    //       alert('Paper submitted successfully');
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    
    // const handleSubmitMains = async (e) => {
        //     e.preventDefault();
        //     console.log(mainsPaper.quesFile);
        //     try {
        //       const formData = new FormData();
        //       formData.append('quesFile', quesFile);
        
        //       await axios
        //         .post(`http://localhost:8000/teacher/addResult/${answerEvalData.studentId}`, formData)
        //         .then((res) => {
        //           console.log(res);
        //         })
        //         .catch((err) => {
        //           console.log(err);
        //         });
        //       setQuesFile({
        //         quesFile: '',
        //       });
        
        //       alert('Paper submitted successfully');
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   };
          

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
    <>

<Modal
        open={openPre}
        onClose={handleClosePre}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <form 
        // onSubmit={handleSubmitPre}
        >           
        <Box sx={{ ...style }}>
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography variant="h6">
                Paper 1
            </Typography>
            <Box sx={{display:'flex', justifyContent:'space-evenly'}}>
            <Box mr={3}>
            <Button variant="contained">View</Button>
            </Box>
            <UserMoreMenu />
            </Box>
            
          </Box>
          <Box mt={3} sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography variant="h6">
                CSAT Paper
            </Typography>
            <Box sx={{display:'flex', justifyContent:'space-evenly'}}>
              <Box mr={3}>
              <Button variant="contained" >View</Button>
              </Box>
            <UserMoreMenu />
            </Box>
            
          </Box>
          <Box >
          <Button variant="contained" type='submit'sx={{ mt:3 }}>Submit</Button>        
          </Box>
          </Box>        
        </form>        
      </Modal>

      <Modal
        open={openMains}
        onClose={handleCloseMains}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <form 
        // onSubmit={handleSubmitMains}
        >            
        <Box sx={{ ...style }}>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Typography variant="h6">
                Essay Paper
            </Typography>
            <Box sx={{display:'flex', justifyContent:'space-evenly'}}>
            <Box mr={3}>
            <Button variant="contained">View</Button>
            </Box>
            <UserMoreMenu />
            </Box>
            
          </Box>
          <Box mt={3} sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography variant="h6">
                GS Paper 1
            </Typography>
            <Box sx={{display:'flex', justifyContent:'space-evenly'}}>
            <Box mr={3}>
            <Button variant="contained">View</Button>
            </Box>
            <UserMoreMenu />
            </Box>
            
          </Box>
          <Box mt={3} sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography variant="h6">
                GS Paper 2
            </Typography>
            <Box sx={{display:'flex', justifyContent:'space-evenly'}}>
            <Box mr={3}>
            <Button variant="contained">View</Button>
            </Box>
            <UserMoreMenu />
            </Box>
            
          </Box>
          <Box mt={3} sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography variant="h6">
                GS Paper 3
            </Typography>
            <Box sx={{display:'flex', justifyContent:'space-evenly'}}>
            <Box mr={3}>
            <Button variant="contained">View</Button>
            </Box>
            <UserMoreMenu />
            </Box>
            
          </Box>
          <Box mt={3} sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography variant="h6">
                GS Paper 4
            </Typography>
            <Box sx={{display:'flex', justifyContent:'space-evenly'}}>
            <Box mr={3}>
            <Button variant="contained">View</Button>
            </Box>
            <UserMoreMenu />
            </Box>
            
          </Box>
          <Box>
          <Button variant="contained" type='submit'sx={{  mt:3 }}>Submit</Button>        
          </Box>
        </Box>        
        </form>        
      </Modal>

<Page title="User">
      <Container>
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
                  const { id, name, role, status, company, avatarUrl, isVerified } = row;
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
                      <TableCell align="left">{role}</TableCell>
                      <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={handleOpenPre}
                        >
                          View
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={handleOpenMains}
                        >
                          View
                        </Button>
                      </TableCell>
                      {/* <TableCell align="left">{role}</TableCell> */}

                      {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}

                      {/* <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell> */}
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
    </>
    
  );
}
