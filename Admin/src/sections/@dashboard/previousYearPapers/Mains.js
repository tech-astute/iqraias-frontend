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
  Modal,
} from '@mui/material';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 460,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
  justifyContent: 'center',
  pt: 2,
  px: 4,
  pb: 3,
};

const Mains = () => {
  const [format, setFormat] = useState();
  const [quesFile, setQuesFile] = useState();
  const [mainsPaper, setMainsPaper] = useState({
    format: '',
  });

  const handleChange = ({ currentTarget: input }) => {
    setMainsPaper({
      ...mainsPaper,
      [input.name]: input.value,
    });
    console.log(mainsPaper);
  };

  const handleFormatChange = (event) => {
    setMainsPaper({
      ...mainsPaper,
      format: event.target.value,
    });
    console.log(format);
  };

  const handleQuesFile = (e) => {
    setQuesFile(e.target.files[0], '$$$$');
    console.log(quesFile);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //   const handleSubmit = async (e) => {
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

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        {/* Upload PDF */}
        <Box sx={{ ...style }}>
          <Button variant="contained" sx={{ width: 400 }} value={quesFile} onChange={(e) => handleQuesFile(e)} component="label">
            Upload pdf
            <input
              hidden
              // accept="image/*"
              type="file"
            />
          </Button>
          <Button variant="contained" sx={{ width: 400, mt: 3 }}>
            Post
          </Button>
        </Box>
        {/* Post */}
        {/* <Box sx={{ ...style }}>
            <Box sx={{display:'flex', justifyContent:'end'}}>
                <Button variant="contained">Post</Button>
            </Box>
        </Box> */}
      </Modal>
      {/* <Box m={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Select Format</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={format}
                label="Select Format"
                onChange={handleFormatChange}
              >
                <MenuItem value="PDF">PDF</MenuItem>
                <MenuItem value="Post">Post</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box> */}
      <form
      // onSubmit={handleSubmit}
      >
        <Box mt={3} mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Upload Mains Paper</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" fullWidth onClick={handleOpen}>
                Upload/Post Essay Paper
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" fullWidth onClick={handleOpen}>
                Upload/Post GS Paper 1
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" fullWidth onClick={handleOpen}>
                Upload/Post GS Paper 2
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" fullWidth onClick={handleOpen}>
                Upload/Post GS Paper 3
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="contained" fullWidth onClick={handleOpen}>
                Upload/Post GS Paper 4
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Mains;
