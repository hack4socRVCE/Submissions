import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css'
import NavBar from './NavBar';

const apiUrl = 'http://localhost:8080/api/reminders'; // Update with your backend API URL

const Schedular = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('12:00');
  const [reminder, setReminder] = useState('');
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    console.log('Fetching reminders...');
    const fetchReminders = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const reminders = await response.json();
          console.log('Fetched reminders:', reminders);
          setReminders(reminders);
        } else {
          console.error('Failed to fetch reminders');
        }
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };

    fetchReminders();
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleReminderChange = (event) => {
    setReminder(event.target.value);
  };

  const addReminder = async () => {
    if (reminder.trim() !== '') {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date, time, reminder }),
        });
  
        if (response.ok) {
          const newReminder = await response.json();
          setReminders((prevReminders) => [...prevReminders, newReminder]); // Update the local state
          setReminder('');
        } else {
          console.error('Failed to add reminder');
        }
      } catch (error) {
        console.error('Error adding reminder:', error);
      }
    } else {
      alert('Please enter a valid reminder!');
    }
  };

  const deleteReminder = async (id) => {
    try {
      console.log('Deleting reminder with id:', id);
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const deletedReminder = await response.json();
        console.log('Deleted reminder:', deletedReminder);
        setReminders((prevReminders) =>
          prevReminders.filter((r) => r._id !== deletedReminder._id)
        );
      } else {
        console.error('Failed to delete reminder');
      }
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayReminders = reminders.filter(
        (r) =>
          date.getDate() === new Date(r.date).getDate() &&
          date.getMonth() === new Date(r.date).getMonth() &&
          date.getFullYear() === new Date(r.date).getFullYear()
      );
  
      return (
        <div>
          {dayReminders.map((r, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'green', // Change color to mark reminded dates
                borderRadius: '50%',
                padding: '2px',
              }}
            ></div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
    <div className="get-started-container">
        <NavBar />
      </div>
    <div>
      <h1>Scheduler Planner</h1>
      <div>
        <div  className="calendar">
          <Calendar onChange={handleDateChange} value={date} tileContent={tileContent} />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" value={time} onChange={handleTimeChange} />
        </div>
        <div>
          <label>Reminder:</label>
          <input
            type="text"
            value={reminder}
            onChange={handleReminderChange}
            placeholder="Enter your reminder"
            />
        </div>
        <button onClick={addReminder}>Add Reminder</button>
      </div>
      <div>
        <h2>Reminders</h2>
        <ul>
          {reminders.map((r) => (
              <li key={r._id}>
              {`${new Date(r.date).toDateString()} - ${r.time} - ${r.reminder}`}
              <button onClick={() => deleteReminder(r._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
          </>
  );
};

export default Schedular;