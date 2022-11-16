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
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const NewQuestions = () => {
  const [quesType, setQuesType] = React.useState('');

  const handleChange = (event) => {
    setQuesType(event.target.value);
  };

  const [statementValues, setStatementValues] = useState([]);
  const [optionValues, setOptionValues] = useState([]);
  const [tagValues, setTagValues] = useState([]);

  const handleChangeStatement = (i, e) => {
    const newStatementValues = [...statementValues];
    newStatementValues[i][e.target.name] = e.target.value;
    setStatementValues(newStatementValues);
  };

  const addStatementFields = () => {
    setStatementValues([...statementValues, { statement:'' }]);
  };

  const removeStatementFields = (i) => {
    const newStatementValues = [...statementValues];
    newStatementValues.splice(i, 1);
    setStatementValues(newStatementValues);
  };

  // const handleChangeOption = (i, e) => {
  //   const newOptionValues = [...optionValues];
  //   newOptionValues[i][e.target.name] = e.target.value;
  //   setOptionValues(newOptionValues);
  // }
  const addOptionFields = () => {
    setOptionValues([...optionValues, { option:'' }]);
  };

  const removeOptionFields = (i) => {
    const newOptionValues = [...optionValues];
    newOptionValues.splice(i, 1);
    setOptionValues(newOptionValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(optionValues));
  };

  const [personName, setPersonName] = React.useState([]);
  const [personNames, setPersonNames] = React.useState([]);

  const handleChangeOption = (i, e) => {
    const {
      target: { value },
    } = e;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    const newOptionValues = [...optionValues];
    newOptionValues[i][e.target.name] = e.target.value;
    setOptionValues(newOptionValues);
  };

  const addTagFields = () => {
    setTagValues([...tagValues, { tag:'' }]);
  };

  const removeTagFields = (i) => {
    const newTagValues = [...tagValues];
    newTagValues.splice(i, 1);
    setTagValues(newTagValues);
  };
  const handleChangeTag = (i, e) => {
    const {
      target: { value },
    } = e;
    setPersonNames(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    const newTagValues = [...tagValues];
    newTagValues[i][e.target.name] = e.target.value;
    setTagValues(newTagValues);
  };

  return (
    <>
      <Box m={3}>
          <Box >
            <FormControl sx={{ minWidth: '40vw' }}>
              <InputLabel id="demo-simple-select-helper-label">Type of Question</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={quesType}
                label="Type of Question"
                onChange={handleChange}
              >
                <MenuItem value="statement">Statement</MenuItem>
                <MenuItem value="mcq">Multiple Choice Questions</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mt={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Question"
                  variant="outlined"
                  fullWidth
                  // sx={{ mr: { md: 1 } }}
                  type="text"
                  name="questionMain"
                  // value={sList.conNewPassword}
                  // onChange={handleChange}
                />
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
              <Box mt={3} mb={3}>
                <Grid container spacing={2}>
                  {statementValues.map((element, index) => (
                    <Grid item xs={12}>
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* <Grid item xs={9} md={12}> */}
                        <TextField
                          label={`Statement ${index + 1}`}
                          variant="outlined"
                          fullWidth
                          // sx={{ mr: { md: 1 } }}
                          type="text"
                          name="statement"
                          value={element.statement || ''}
                          onChange={(e) => handleChangeStatement(index, e)}
                          // sx={{
                          //   mr:'2vw'
                          // }}
                        />
                        {/* </Grid> */}
                        {index ? (
                          // <Grid item xs={6}>
                          <Button
                            sx={{ ml: '2vw', p: '6px 16px', maxHeight: '36px' }}
                            color="error"
                            variant="contained"
                            onClick={() => removeStatementFields(index)}
                          >
                            Remove
                          </Button>
                        ) : // </Grid>
                        null}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Button variant="contained" sx={{ mb: '2vw' }} onClick={() => addStatementFields()}>
                    Add Statement
                  </Button>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    // sx={{ mr: { md: 1 } }}
                    type="text"
                    name="questionSecondary"
                    // value={sList.conNewPassword}
                    // onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Box m={3} ml={0} mr={0}>
                <FormControl
                  fullWidth
                  // sx={{ width: 300 }}
                >
                  <InputLabel id="demo-multiple-checkbox-label">Options</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={optionValues}
                    onChange={handleChangeOption}
                    input={<OutlinedInput label="Options" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {optionValues.map((element, index) => (
                      <>
                        <Box key={index}>
                          <MenuItem>
                            <Checkbox
                              // checked={personName.indexOf(name) > -1}
                              sx={{
                                mt: '1.5vw',
                              }}
                              value={element.name || ''}
                              onChange={(e) => handleChangeOption(index, e)}
                            />
                            <TextField
                              label={`Option ${index + 1}`}
                              variant="outlined"
                              fullWidth
                              // sx={{ mr: { md: 1 } }}
                              type="text"
                              name="option"
                              value={element.option || ''}
                              onChange={(e) => handleChangeOption(index, e)}
                              sx={{
                                mt: '2vw',
                              }}
                            />
                            {index ? (
                              // <Grid item xs={6}>
                              <Button
                                ml={2}
                                mb={3}
                                sx={{ ml: '2vw', mt: '1.6vw' }}
                                color="error"
                                variant="contained"
                                onClick={() => removeOptionFields(index)}
                              >
                                Remove
                              </Button>
                            ) : // </Grid>
                            null}
                            {/* <Button> Add</Button> */}
                          </MenuItem>
                        </Box>
                      </>
                    ))}
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          sx={{ mb: '2vw', ml: '2vw', mt: '2vw' }}
                          onClick={() => addOptionFields()}
                        >
                          Add Option
                        </Button>
                      </Grid>
                    </Grid>
                  </Select>
                </FormControl>
              </Box>

              <Box m={3} ml={0} mr={0}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={tagValues}
                    onChange={handleChangeTag}
                    input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {tagValues.map((element, index) => (
                      <>
                        <Box key={index}>
                          <MenuItem>
                            {/* <TextField
                              label={`Tag ${index + 1}`}
                              variant="outlined"
                              fullWidth
                              type="text"
                              name="tag"
                              value={element.statement || ''}
                              onChange={(e) => handleChangeTag(index, e)}
                              sx={{
                                mt: '2vw',
                              }}
                            /> */}
                            <TextField
                          label={`Tag ${index + 1}`}
                          variant="outlined"
                          fullWidth
                          // sx={{ mr: { md: 1 } }}
                          type="text"
                          name="tagValues"
                          value={element.tagValues || ''}
                          onChange={(e) => handleChangeTag(index, e)}
                          // sx={{
                          //   mr:'2vw'
                          // }}
                        />
                            {index ? (
                              <Button
                                ml={2}
                                mb={3}
                                sx={{ ml: '2vw', mt: '1.6vw' }}
                                color="error"
                                variant="contained"
                                onClick={() => removeTagFields(index)}
                              >
                                Remove
                              </Button>
                            ) : null}
                          </MenuItem>
                        </Box>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Button
                              variant="contained"
                              sx={{ mb: '2vw', ml: '2vw', mt: '2vw' }}
                              onClick={() => addTagFields()}
                            >
                              Add Tag
                            </Button>
                          </Grid>
                        </Grid>
                      </>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </form>
          </Box>
      </Box>
    </>
  );
};

export default NewQuestions;
