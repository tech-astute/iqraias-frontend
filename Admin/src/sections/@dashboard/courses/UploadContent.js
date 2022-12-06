import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React,{ useState,useEffect } from 'react';
import axios from 'axios';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  OutlinedInput,
  ListItemText,
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
// import { sub } from 'date-fns';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
//   { id: 'SNo', label: 'S No', alignRight: false },
  { id: 'courseName', label: 'Subject', alignRight: false },
  { id: 'overView', label: 'Video Title', alignRight: false },
  { id: 'subjects', label: 'Video Link', alignRight: false },
  { id: 'price', label: 'Notes', alignRight: false },
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const subjectsArray = [
  'History',
  'Political Science',
  'Geography',
  'Economics',
  'Mathematics',
  'Public Administration',
  'Ethics',
  'Chemistry',
  'Sociology',
];


export default function UploadContent() {
  const [uploadContent, setUploadContent] = useState({
    subject:'',
    title:'',
    link:'',
  });

  const handleChange = ({ currentTarget: input }) => {
    setUploadContent({
      ...uploadContent,
      [input.name]: input.value,
    });
    console.log(uploadContent);
  };

  const handleSubjectChange1 = (event) => {
    setUploadContent({
      ...uploadContent,
      subject: event.target.value,
    });
    console.log(uploadContent);
  };

  const [subjectName, setSubjectName] = React.useState([]);

  const handleSubjectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSubjectName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(uploadContent);
      await axios
        .post("http://localhost:5000/api/ias/addUploadContent", uploadContent) 
        .then((res) => {
          console.log(res); 
        })
        .catch((err) => {
          console.log(err);
        });
      setUploadContent({
        subject:'',
        title:'',
        link:''
      })
      alert("Content updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
// console.log(uploadContentTableData);
  const [uploadContentTableData, setUploadContentTableData] = useState();
  useEffect(() => { 
    console.log(uploadContentTableData);
    const uploadContentData= async()=>{ 
      const {data}=await axios.get("http://localhost:5000/api/ias/getUploadContent"); 
      console.log(data); 
      setUploadContentTableData(data);   
      console.log(uploadContentTableData); 
    }
    uploadContentData();
  }, [])
  console.log(uploadContentTableData); 
  

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

  const subject=[
    "History","Political Science","Economics"
  ]

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
  if(!uploadContentTableData){
    return(<>
    loading
    </>)
  }
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
onSubmit={handleSubmit}
>
<Box mb={7}>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Select Subject</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={uploadContent.subject}
                    label="Select Subject"
                    onChange={handleSubjectChange1}
                  >
                    <MenuItem value="History">History</MenuItem>
                    <MenuItem value="Economics">Economics</MenuItem>
                    <MenuItem value="Political Science">Political Science</MenuItem>
                    <MenuItem value="Geography">Geography</MenuItem>
                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                    <MenuItem value="Public Administration">Public Administration</MenuItem>
                    <MenuItem value="Ethics">Ethics</MenuItem>
                    <MenuItem value="Chemistry">Chemistry</MenuItem>
                    <MenuItem value="Sociology">Sociology</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Video Title"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="text"
                  name="title"
                  value={uploadContent.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Video Link"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="text"
                  name="link"
                  value={uploadContent.link}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
              <Box>
            <Button variant="contained" fullWidth component="label" style={{height:'54px'}}>
              Attach Notes
              <input
                hidden
                // accept="image/*"
                type="file"
              />
            </Button>
            </Box>
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button variant="contained" type="submit" mt={3}>
                Upload
              </Button>
            </Box>
          </Box>
        </Box>
</form>

<Box mb={5}>
<FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Subject</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={subjectName}
          onChange={handleSubjectChange}
          input={<OutlinedInput label="Subject" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {subjectsArray.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={subjectName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
</Box>

        <Box >
        <Typography variant="h6">
            All Contents
        </Typography>
        </Box>
        

        {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
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
                {uploadContentTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id, subject,title,link } = row;
                  const isItemSelected = selected.indexOf(subject) !== -1;

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                      </TableCell> */}
                      {/* <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell> */}
                      <TableCell align="left">{subject}</TableCell>
                      <TableCell align="left">{title}</TableCell>     
                      <TableCell align="left">
                          
                      {link}
                          
                        </TableCell>
                        <TableCell align="left">
                            <Button
                          variant="contained"
                        //   onClick={handleOpenPre}
                        >
                          View
                        </Button></TableCell>

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
