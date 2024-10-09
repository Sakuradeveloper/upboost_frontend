type props = {
    calendarEvent: {
      id: string | number
      title: string
      start: string
      end: string
    }
  }
  
  export default function CustomTimeGridEvent({ calendarEvent }: props) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'green',
          color: 'white',
          padding: 10,
          borderRadius: 5,
          border: '1px solid white',
        }}
      >
        {calendarEvent.title}
      </div>
    )
  }