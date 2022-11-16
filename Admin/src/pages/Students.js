import React from 'react';
import {Box, Card} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import StudentDetails from '../sections/@dashboard/student/StudentDetails';
import StudentPending from '../sections/@dashboard/student/StudentPending';

const Students = () => {
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
                <Tab label="Student Details" value="1" />
                <Tab label="Pending" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"><StudentDetails/></TabPanel>
            <TabPanel value="2"><StudentPending/></TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  );
};

export default Students;
