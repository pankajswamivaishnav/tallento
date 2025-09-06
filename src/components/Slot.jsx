import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Button,
  Paper,
  Grid
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight 
} from '@mui/icons-material';

const Slot = () => {
  const [selectedDate, setSelectedDate] = useState(11);
  const [selectedTime, setSelectedTime] = useState('10:30 am');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); 

  // Generate calendar days for any month/year
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;
    
    for (let i = 0; i < adjustedStartDay; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Navigation handlers
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null); 
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null); 
  };

  // Format month and year for display
  const formatMonthYear = (date) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Format selected date for display
  const formatSelectedDate = (date, day) => {
    if (!day) return '';
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    const dayName = dayNames[selectedDate.getDay()];
    return `${dayName}, ${monthNames[date.getMonth()]} ${day}`;
  };

  // Available time slots
  const timeSlots = [
    '10:00 am',
    '10:30 am',
    '11:00 am',
    '11:30 am',
    '12:00 pm',
    '12:30 pm',
    '1:00 pm',
    '1:30 pm',
    '2:00 pm',
    '2:30 pm',
    '3:00 pm',
    '3:30 pm',
    '4:00 pm',
    '4:30 pm',
    '5:00 pm',
    '5:30 pm',
    '6:00 pm'
  ];

  const handleDateSelect = (day) => {
    if (day && day !== 7 && day !== 14 && day !== 21 && day !== 28) {
      setSelectedDate(day);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const isDateSelectable = (day) => {
    return day && day !== 7 && day !== 14 && day !== 21 && day !== 28;
  };

  const isSpecialDate = (day) => {
    
    return day === 4;
  };

  return (
    <Box className="bg-white p-6 max-w-4xl mx-auto">
      <Grid container spacing={4}>
        {/* Calendar Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} className="p-6">
            {/* Calendar Header */}
            <Box className="flex items-center justify-between mb-6">
              <IconButton 
                size="small"
                className="text-gray-600 hover:bg-gray-100"
                onClick={handlePreviousMonth}
              >
                <ChevronLeft />
              </IconButton>
              <Typography variant="h6" className="font-medium text-gray-800">
                {formatMonthYear(currentDate)}
              </Typography>
              <IconButton 
                size="small"
                className="text-gray-600 hover:bg-gray-100"
                onClick={handleNextMonth}
              >
                <ChevronRight />
              </IconButton>
            </Box>

            {/* Days of Week */}
            <Box className="grid grid-cols-7 gap-1 mb-4">
              {weekDays.map((day) => (
                <Typography 
                  key={day}
                  variant="body2" 
                  className="text-center text-gray-500 font-medium py-2"
                >
                  {day}
                </Typography>
              ))}
            </Box>

            {/* Calendar Grid */}
            <Box className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <Box
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center relative cursor-pointer
                    ${day ? 'hover:bg-gray-50' : ''}
                  `}
                  onClick={() => handleDateSelect(day)}
                >
                  {day && (
                    <>
                      <Box
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                          ${selectedDate === day 
                            ? 'bg-blue-600 text-white' 
                            : isDateSelectable(day)
                              ? 'text-blue-600 hover:bg-blue-50'
                              : 'text-gray-400'
                          }
                        `}
                      >
                        {day}
                      </Box>
                      {/* Special indicator dot */}
                      {isSpecialDate(day) && (
                        <Box className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></Box>
                      )}
                    </>
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Time Slots Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} className="p-6 h-full">
            {/* Time Header */}
            <Typography variant="h6" className="font-medium text-gray-800 mb-6">
              {selectedDate ? formatSelectedDate(currentDate, selectedDate) : 'Select a date'}
            </Typography>

            {/* Time Slots */}
            <Box className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {timeSlots.map((time) => (
                <Box key={time} className="flex items-center gap-2">
                  <Button
                    variant={selectedTime === time ? "contained" : "outlined"}
                    className={`
                      flex-1 justify-start px-4 py-3 rounded-lg text-sm font-medium
                      ${selectedTime === time 
                        ? 'bg-gray-700 text-white hover:bg-gray-800' 
                        : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                      }
                    `}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                  {selectedTime === time && (
                    <Button
                      variant="contained"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                      Next
                    </Button>
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Slot;
