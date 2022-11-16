import React,{useState,useEffect} from 'react'
import {Box, Card} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';

import AddCourse from '../sections/@dashboard/courses/AddCourse';
import UploadContent from '../sections/@dashboard/courses/UploadContent';

const Courses = () => {
    const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const [uploadContentTableData, setUploadContentTableData] = useState()
  useEffect(() => { 
    console.log(uploadContentTableData);
    const uploadContentData= async()=>{ 
      const {data}=await axios.get("http://localhost:8000/api/ias/getUploadContent"); 
      console.log(data); 
      setUploadContentTableData(data);   
      console.log(uploadContentTableData); 
    }
    uploadContentData();
  }, [])
  console.log(uploadContentTableData); 

  if(!uploadContentTableData){
    return(<>
    loading
    </>)
  }

  return (
    <>
    <Card>
        <Box m={3}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Add Course" value="1" />
                <Tab label="Upload Content" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"><AddCourse/></TabPanel>
            <TabPanel value="2"><UploadContent data={uploadContentTableData}/></TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  )
}

export default Courses