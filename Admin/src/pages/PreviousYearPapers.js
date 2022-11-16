import React from 'react';
import {Box, Card} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AddPaper from '../sections/@dashboard/previousYearPapers/AddPaper'
import AllPapers from '../sections/@dashboard/previousYearPapers/AllPapers'

const Teachers = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Card>
        <Box m={3}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Add New Paper" value="1" />
                <Tab label="All Papers" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"><AddPaper/></TabPanel>
            <TabPanel value="2"><AllPapers/></TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  );
};

export default Teachers;
