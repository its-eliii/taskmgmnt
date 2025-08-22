// import "../styles/Calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyBigCalendar = () => {
    const myEvents = [
    // Example event data
    {
        id: 0,
        title: 'Buy groceries',
        start: new Date(2025, 7, 22, 10, 0, 0),
        end: new Date(2025, 7, 22, 11, 0, 0),
    },
    {
        id: 1,
        title: 'Finish project report',
        start: new Date(2025, 7, 22, 9, 0, 0),
        end: new Date(2025, 7, 22, 17, 0, 0),
    },
    {
        id: 2,
        title: 'Team meeting',
        start: new Date(2025, 7, 15, 9, 0, 0),
        end: new Date(2025, 7, 15, 17, 0, 0),
    },
    {
        id: 3,
        title: 'Update website banner',
        start: new Date(2025, 7, 10, 9, 0, 0),
        end: new Date(2025, 7, 10, 17, 0, 0),
    },
    {
        id: 4,
        title: 'New single deadline',
        start: new Date(2025, 7, 25, 9, 0, 0),
        end: new Date(2025, 7, 25, 17, 0, 0),
    },
    ];

    return (
    <div style={{ height: '700px', minHeight: 'calc(100% - 80px)', width: '940px' }}> {/* Set a height for the calendar container */}
        <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }} // Calendar takes full height of its container
        />
    </div>
    );
};

export default MyBigCalendar;