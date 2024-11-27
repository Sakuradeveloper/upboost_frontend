import { AddCircleOutline, CalendarToday } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Modal, Typography, Fade, Backdrop, FormControl, FormHelperText } from "@mui/material";
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentItemValue, clearCurrentItem, setError, fetchSchedules, setResult, addEvent } from '@/store/features/schedule';
import { useAuth } from '@/contexts/AuthContext';
import { postRequest } from "@/utils/axios";

// Custom theme colors
const themeColors = {
  primary: '#5e35b1',
  secondary: '#FF4081',
  background: '#F5F5F5',
  textPrimary: '#333333',
  textSecondary: '#888888',
};

const ScheduleTitle = () => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const current = useAppSelector(state => state.schedule.item.form);
  console.log(current, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>        time           >>>>>>>>>>")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddEvent = async (e: React.FormEvent) => {

    e.preventDefault();
    if (!current.date || !current.start_time || !current.end_time) {
      return dispatch(setError('All fields are required.'));
    }
    const res = await postRequest(`/v0/teacher/schedule/create`, current);
    if (res.status === 200) {
      console.log(res.data, " : data : ")
      dispatch(addEvent(res.data.data))
      dispatch(clearCurrentItem());
      handleClose();
    } else if (res.status === 422 && res.data.errors) {
      dispatch(setError(res.data.errors));
    }
  };

  return (
    <div>
      {/* Modal for adding new events */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        aria-labelledby="add-schedule-title"
      >
        <Fade in={open}>
          <Card sx={{ width: { xs: '90%', sm: '500px' }, margin: 'auto' }}>
            <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
              <Typography id="add-schedule-title" variant="h6" sx={{ mb: 2, color: themeColors.textPrimary }}>
                スケジュールを追加してください。
              </Typography>
              <Box
                component="form"
                onSubmit={handleAddEvent}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="日付選択 *"
                    value={current.date ? dayjs(current.date, 'YYYY-MM-DD') : null}
                    minDate={dayjs()}
                    onChange={(newValue) =>
                      newValue && dispatch(setCurrentItemValue({ date: newValue.format('YYYY-MM-DD'), teacher_id: user?.id }))
                    }
                  />
                  <TimePicker
                    label="開始時間 *"
                    value={
                      current.start_time && current.date
                        ? dayjs(`${current.date} ${current.start_time}`, 'YYYY-MM-DD HH:mm')
                        : null
                    }
                    maxTime={
                      current.end_time && current.date
                        ? dayjs(`${current.date} ${current.end_time}`, 'YYYY-MM-DD HH:mm').subtract(1, 'minute') // Ensure start_time < end_time
                        : undefined
                    }
                    timeSteps={{ hours: 1, minutes: 30 }}
                    onChange={(newValue) => {
                      if (newValue) {
                        dispatch(setCurrentItemValue({ start_time: newValue.format('HH:mm') }));
                      }
                    }}
                  /> 

                  <TimePicker
                    label="終了時間 *"
                    value={
                      current.end_time && current.date
                        ? dayjs(`${current.date} ${current.end_time}`, 'YYYY-MM-DD HH:mm')
                        : null
                    }
                    minTime={
                      current.start_time && current.date
                        ? dayjs(`${current.date} ${current.start_time}`, 'YYYY-MM-DD HH:mm').add(1, 'minute') // Ensure end_time > start_time
                        : undefined
                    }
                    timeSteps={{ hours: 1, minutes: 30 }}
                    onChange={(newValue) => {
                      if (newValue) {
                        dispatch(setCurrentItemValue({ end_time: newValue.format('HH:mm') }));
                      }
                    }}
                  />
                </LocalizationProvider>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: themeColors.primary,
                    '&:hover': { backgroundColor: themeColors.primary, color: '#FFFFFF', },
                    mt: 2,
                  }}
                >
                  スケジュールを追加
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Modal>

      {/* Title section with "Add New Event" button */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarToday sx={{ fontSize: '2rem', color: themeColors.primary, mr: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: themeColors.textPrimary }}>
            スケジュール管理
          </Typography>
        </Box>
        <Button variant="contained" onClick={handleOpen} sx={{ display:'flex', alignItems:'end', justifyContent:'space-between', backgroundColor: '#ede7f6', color: themeColors.primary, '&:hover': { backgroundColor: themeColors.primary, color: '#FFFFFF', }, }}>
          <AddCircleOutline sx={{mr:2}}/>
          <Typography sx={{fontSize:20}}>追加</Typography>
        </Button>
      </Box>
    </div>
  );
};

export default ScheduleTitle;