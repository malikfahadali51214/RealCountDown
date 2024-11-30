import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';

const Timer = ({ duration, propertyId }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      // Update timerEnd to null in the database
      const updateTimerEnd = async () => {
        try {
          const token = localStorage.getItem('token');
          await axios.put(`http://localhost:3000/api/property-requirements/${propertyId}/timer-end`, {
            timerEnd: null,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error('Error updating timer end:', error);
        }
      };
      updateTimerEnd();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1000, 0)); // Decrease time left by 1000ms (1 second)
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, propertyId]);

  const formatTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m ` : ''}${seconds}s`;
  };

  return (
    <Typography variant="body2" sx={{ color: 'green', fontWeight: 'bold' }}>
      {timeLeft > 0 ? formatTime(timeLeft) : 'Time is up!'}
    </Typography>
  );
};

export default Timer;