import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import axios from 'axios';
import {
  Box,
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
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Tab,
  Tabs,
} from '@mui/material';
// import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Iconify from '../components/Iconify';
import Page from '../components/Page';
import Category from '../components/Master/Category';
import Subject from '../components/Master/Subject';
import Level from '../components/Master/Level';
import Medium from '../components/Master/Medium';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Master = () => {
  const categories = useSelector((state) => state.category.categories);
  const subjects = useSelector((state) => state.subject.subjects);
  const levels = useSelector((state) => state.level.levels);
  const mediums = useSelector((state) => state.medium.mediums);

  const [headTab, setHeadTab] = useState(0);
  const [subTab, setSubTab] = useState(0);

  const handleHeadTabChange = (event, newValue) => {
    setHeadTab(newValue);
  };

  // const handleSubtabChange = (event, newValue) => {
  //   setSubTab(newValue);
  // };

  // const handleChange = ({ currentTarget: input }) => {
  //   setRateMasterData({ ...rateMasterData, [input.name]: input.value });
  //   console.log(rateMasterData);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  // };

  return (
    <>
      <Page title="Master">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Master
            </Typography>
            {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Setting
          </Button> */}
          </Stack>
          <Card sx={{ p: 2 }}>
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={headTab}
                  onChange={handleHeadTabChange}
                  variant="scrollable"
                  aria-label="basic tabs example"
                >
                  <Tab label="Category" {...a11yProps(0)} />
                  <Tab label="Subject" {...a11yProps(1)} />
                  <Tab label="Medium" {...a11yProps(2)} />
                  <Tab label="Level" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={headTab} index={0}>
                <Category categories={categories} />
              </TabPanel>
              <TabPanel value={headTab} index={1}>
                <Subject subjects={subjects} />
              </TabPanel>
              <TabPanel value={headTab} index={2}>
                <Medium mediums={mediums} />
              </TabPanel>
              <TabPanel value={headTab} index={3}>
                <Level levels={levels} />
              </TabPanel>
            </Box>
          </Card>
        </Container>
      </Page>
    </>
  );
};

export default Master;
