import { useEffect, useMemo } from 'react';
import { Box, CardContent, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { EventBusy, People } from '@mui/icons-material';
import { fetchSchedules } from '@/store/features/schedule';
import { useAuth } from '@/contexts/AuthContext';

import ScheduleCalendar from '../components/ScheduleCalendar';
import { fetchLectureSchedules } from '@/store/features/lecture_schedule';

const themeColors = {
  primary: '#5e35b1',
  secondary: '#FF4081',
  background: '#F5F5F5',
  textPrimary: '#333333',
  textSecondary: '#888888',
};

function CalendarApp() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const result = useAppSelector(state => state.lecture_schedule.items.result);
  console.log("result DAta : ", result.data)
  console.log(user, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  const events = useMemo(() => result.data.map((schedule:any) => ({
    id: schedule.id,
    title: schedule?.students ?schedule?.students?.name:"保留中"    , // Assuming there's a title
    start: dayjs(`${schedule.date} ${schedule.start_time}`).format('YYYY-MM-DD HH:mm'),
    end: dayjs(`${schedule.date} ${schedule.end_time}`).format('YYYY-MM-DD HH:mm'),
    calendarId: schedule.state,
    _meeting: schedule?.teacher?.meeting,
  })), [result.data]);


  useEffect(()=>{
    if(user?.id)
      dispatch(fetchLectureSchedules(user?.id));
  },[dispatch, user?.id])

  return (
    <div>
      
      <CardContent>
            {events.length > 0  ? (
              <ScheduleCalendar events={events} />
            ) : (
              <Box sx={{ textAlign: 'center', padding: 4 }}>
                <EventBusy sx={{ fontSize: '4rem', color: themeColors.textSecondary }} />
                <Typography variant="h3" sx={{ color: themeColors.textSecondary, mt: 2 }}>
                  スケジュールはありません。
                </Typography>
              </Box>
            )}
          </CardContent>
    </div>
  );
}

export default CalendarApp;   