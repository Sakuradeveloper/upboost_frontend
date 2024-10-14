import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TermCondition from '../components/TermCondition';
import LessonPlan from '../components/LessonPlan';
import RecordingText from '../components/RecordingText';
import PayPlan from '../components/PayPlan';
import Question from '../components/Question';
import Payment from '../components/Payment';
import { Subscriptions } from '@mui/icons-material';
import Subscribe from '../components/Subscribe';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList  aria-label="lab API tabs example">
                <Tab label="利用規約" value="1" />
                <Tab label="レッスンプラン" value="2" />
                <Tab label="録音テキスト" value="3" />
                <Tab label="支払いプラン" value="4" />
                <Tab label="質問" value="5" />
                {/* <Tab label="お支払い" value="6" /> */}
                <Tab label="お支払い" value="7" />
            </TabList>
        </Box>
        <TabPanel value="1">
            <TermCondition handleTab={handleChange} />
        </TabPanel>
        <TabPanel value="2">
            <LessonPlan handleTab={handleChange}/>
        </TabPanel>
        <TabPanel value="3">
            <RecordingText handleTab={handleChange}/>
        </TabPanel>
        <TabPanel value="4">
            <PayPlan handleTab={handleChange}/>
        </TabPanel>
        <TabPanel value="5">
            <Question handleTab={handleChange}/>
        </TabPanel>
        {/* <TabPanel value="6">
            <Payment handleTab={handleChange}/>
        </TabPanel> */}
        <TabPanel value="7">
            <Subscribe handleTab={handleChange}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
