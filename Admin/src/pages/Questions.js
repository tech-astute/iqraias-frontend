import React from 'react';
import {Box, Card} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AllQuestions from '../sections/@dashboard/questions/AllQuestions'
import NewQuestions from '../sections/@dashboard/questions/NewQuestions'

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
                <Tab label="New Question" value="1" />
                <Tab label="All Questions" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"><NewQuestions/></TabPanel>
            <TabPanel value="2"><AllQuestions/></TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  );
};

export default Teachers;
