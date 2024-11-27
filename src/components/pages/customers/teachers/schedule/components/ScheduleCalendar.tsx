
import '@schedule-x/theme-default/dist/index.css';
import { useState } from 'react';
import { useNextCalendarApp, ScheduleXCalendar, Calendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import dayjs, { Dayjs } from 'dayjs';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import { createScrollControllerPlugin } from '@schedule-x/scroll-controller'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { postRequest } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import CustomDateGridEvent from './CustomDateGridEvent';
import CustomTimeGridEvent from './CustomTimeGridEvent';
import { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { fetchSchedules } from '@/store/features/schedule';

const eventsServicePlugin = createEventsServicePlugin();


interface Props { 
    events: any[]
}

const ScheduleCalendar = ( {events} : Props)  => {
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const handleOpenModal = (event: any) => {
      setSelectedEvent(event);
      console.log("event : ", event)
      setOpenModal(true);
    };
    const handleDisagree = () => {
      // Handle the disagree action here
      console.log('Disagree clicked');
      handleCloseModal();
    };
    const handleCloseModal = () => {

      setOpenModal(false);
      setSelectedEvent(null);
    };

    const handleLecture = (link: string) => {
      // try {
      //   // Destructure the updatedEvent object for cleaner code
      //   const { id, title, start, end } = selectedEvent;
      //   // Format the request data only once
      //   // const formattedStart = dayjs(start).format('HH:mm');
      //   // const formattedEnd = dayjs(end).format('HH:mm');
      //   // const formattedDate = dayjs(start).format('YYYY-MM-DD');
      //   const start_time = dayjs(start).format('YYYY-MM-DD HH:mm');
      //   const end_time = dayjs(end).format('YYYY-MM-DD HH:mm');
      //   // Send the update request to the API
      //   postRequest(`/v0/student/schedule/complete/${user?.id}`, {
      //       schedule_id:id,
      //       title,
      //       start_time: start_time,
      //       end_time: end_time,
      //       user_id: user?.id
      //   })
      //   .then(res => {
      //       if(res.status == 200){
      //         dispatch(fetchSchedules(user?.id));
      //       }
      //   })
      // } catch (error) {
      //   // Handle any errors during the request
      //   console.error('Failed to update event', error);
      //   // You can also set error state here or alert the user
      // }
      handleCloseModal();
      window.open(link, '_blank')
    }

    const scrollController = createScrollControllerPlugin({
      initialScroll: '20:50'
    })
    const calendarControls = createCalendarControlsPlugin()
    const calendar = useNextCalendarApp({
      locale: 'ja-JP',
      calendars:{
        pending:{
          colorName: 'pending',
          lightColors: {
            main: '#f9d71c',
            container: '#fff5aa',
            onContainer: '#594800',
          },
          darkColors: {
            main: '#fff5c0',
            onContainer: '#fff5de',
            container: '#a29742',
          },
        },
        accepted: {
          colorName: 'accepted',
          lightColors: {
            main: '#f91c45',
            container: '#ffd2dc',
            onContainer: '#59000d',
          },
          darkColors: {
            main: '#ffc0cc',
            onContainer: '#ffdee6',
            container: '#a24258',
          },
        },
        rejected: {
          colorName: 'rejected',
          lightColors: {
            main: '#1cf9b0',
            container: '#dafff0',
            onContainer: '#004d3d',
          },
          darkColors: {
            main: '#c0fff5',
            onContainer: '#e6fff5',
            container: '#42a297',
          },
        },
      },
      views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
      plugins: [
        // createDragAndDropPlugin(15),
        // createResizePlugin(30),
        createEventModalPlugin(),
        createCurrentTimePlugin(),
        scrollController,
        calendarControls,
        eventsServicePlugin],
      events,
      callbacks:{
        onEventClick(calendarEvent) {
          console.log('Event clicked:', calendarEvent);
          // Perform an action, e.g., opening a modal or updating event details

        },
        onClickDate(date) {
          console.log('Date clicked:', date);
          // You can open a modal to create a new event for this date
        },
        onClickDateTime(dateTime) {
          console.log('DateTime clicked:', dateTime);
          // You can add an event at this specific date and time
        },
        onSelectedDateUpdate(date) {
          console.log('onSelectedDateUpdate', date)
        },
        onEventUpdate (updatedEvent) {
          try {
              // Destructure the updatedEvent object for cleaner code
              const { id, title, start, end } = updatedEvent;
              // Format the request data only once
              const formattedStart = dayjs(start).format('HH:mm');
              const formattedEnd = dayjs(end).format('HH:mm');
              const formattedDate = dayjs(start).format('YYYY-MM-DD');
              // Send the update request to the API
              postRequest(`/v0/admin/schedule/update`, {
                  id,
                  title,
                  start_time: formattedStart,
                  end_time: formattedEnd,
                  date: formattedDate,
                  teacher_id: user?.id
              })
              .then(res => {
                  if(res.status == 200){
                      console.log("aaa")
                  }
              })
          } catch (error) {
          // Handle any errors during the request
          console.error('Failed to update event', error);
          // You can also set error state here or alert the user
          }
          // Call the internal async function
          // updateEvent();
        },
        onClickAgendaDate(date) {
          console.log('onClickAgendaDate', date) // e.g. 2024-01-01
        },
        onDoubleClickDate(date) {
          console.log('onClickDate', date) // e.g. 2024-01-01
        },
        onDoubleClickDateTime(dateTime) {
          console.log('onDoubleClickDateTime', dateTime) // e.g. 2024-01-01 12:37
        },
        onClickPlusEvents(date) {
          console.log('onClickPlusEvents', date) // e.g. 2024-01-01
        },
      }
    });
    
    useEffect(() => {
      if (events.length > 0) {
        // eventsServicePlugin.clear(); // Clear the existing events before adding new ones
        eventsServicePlugin.set([]);
        events.forEach(event => eventsServicePlugin.add(event)); // Add new events
        // console.log('Events updated in the calendar:', events);
      }
    }, [events]);

    return (
      <>
        <ScheduleXCalendar calendarApp={calendar} />
        {selectedEvent?._meeting && ((selectedEvent?.calendarId === "accepted") ? 
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle sx={{fontSize: '4rem'}} >講義を始めますか？</DialogTitle>
            {/* <DialogContent>
              <DialogContentText>
                講義を始めますか？
              </DialogContentText>
              {selectedEvent && (
                <Link href={selectedEvent._meeting}>Zoom meeting</Link>
              )}
            </DialogContent> */}
            <DialogActions>
              <Button onClick={handleCloseModal} color="secondary">
                拒否する
              </Button>
              <Button onClick={()=>handleLecture(selectedEvent._meeting)} color="primary">
                受け入れる
              </Button>
            </DialogActions>
          </Dialog>:<></>)}
      </>
    )
}


export default ScheduleCalendar