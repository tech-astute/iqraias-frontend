import React, { useState } from 'react';
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
  FormHelperText,
  OutlinedInput,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { YearPicker } from '@mui/x-date-pickers/YearPicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Prelims from './Prelims';
import Mains from './Mains';

const AddPaper = () => {
  const [value, setValue] = React.useState(dayjs('2022-04-07'));
  const [year, setYear] = useState();
  const [paperType, setPaperType] = useState();
  const [pyqs, setPyqs] = useState({
    year: '',
    paperType: '',
  });

  const handleChange = ({ currentTarget: input }) => {
    setPyqs({
      ...pyqs,
      [input.name]: input.value,
    });
    console.log(pyqs);
  };

  const handleYearChange = (event) => {
    setPyqs({
      ...pyqs,
      year: event.target.value,
    });
    console.log(year);
  };
  const handlePaperChange = (event) => {
    setPyqs({
      ...pyqs,
      paperType: event.target.value,
    });
    console.log(paperType);
  };
  return (
    <>
      <Box m={3}>
        <Box>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={year}
                  label="Year"
                  onChange={handleYearChange}
                >
                  <MenuItem value="2022">2022</MenuItem>
                  <MenuItem value="2021">2021</MenuItem>
                  <MenuItem value="2020">2020</MenuItem>
                  <MenuItem value="2019">2019</MenuItem>
                  <MenuItem value="2018">2018</MenuItem>
                  <MenuItem value="2017">2017</MenuItem>
                  <MenuItem value="2016">2016</MenuItem>
                  <MenuItem value="2015">2015</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  fullWidth
                  views={['year']}
                  label="Year"
                  value={pyqs.year}
                  onChange={(newValue) => {
                    setPyqs({
                      ...pyqs,
                      year: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} helperText={null} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            {/* <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Paper Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={paperType}
                    label="Paper Type"
                    onChange={handlePaperChange}
                  >
                    <MenuItem value="Prelims">Prelims</MenuItem>
                    <MenuItem value="Mains">Mains</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
          </Grid>
        </Box>
        <Prelims />
        <Mains />
      </Box>
    </>
  );
};

export default AddPaper;
