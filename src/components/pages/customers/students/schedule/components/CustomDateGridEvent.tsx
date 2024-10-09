type props = {
    calendarEvent: {
      id: string | number
      title: string
      start: string
      end: string
    }
  }
  
  export default function CustomDateGridEvent({ calendarEvent }: props) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          background: 'green',
          color: 'white',
          padding: '2px',
          borderRadius: 5,
          border: '1px solid white',
        }}
      >
        {calendarEvent.title}
      </div>
    )
  }