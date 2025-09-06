import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Button,
  Paper,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight,
  PersonAdd,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

const Slot = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState({});
  const [bookingDialog, setBookingDialog] = useState({ open: false, slot: null });
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

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
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null); 
    setSelectedTime(null);
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

  // Generate time slots from 10:00 AM to 6:30 PM (30-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 10;
    const endHour = 18;
    const endMinute = 30;
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Skip if it's past 6:30 PM
        if (hour === endHour && minute > endMinute) break;
        
        const timeString = `${hour > 12 ? hour - 12 : hour === 0 ? 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'pm' : 'am'}`;
        slots.push(timeString);
      }
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleDateSelect = (day) => {
    if (day) {
      setSelectedDate(day);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time) => {
    if (selectedDate) {
      setSelectedTime(time);
      const slotKey = `${selectedDate}-${time}`;
      setBookingDialog({ open: true, slot: slotKey });
    }
  };

  const isDateSelectable = (day) => {
    if (!day) return false;
    const today = new Date();
    const selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return selectedDateObj >= today;
  };

  const getSlotBookings = (day, time) => {
    const slotKey = `${day}-${time}`;
    return bookings[slotKey] || [];
  };

  const isSlotAvailable = (day, time) => {
    const slotBookings = getSlotBookings(day, time);
    return slotBookings.length < 5;
  };

  const isSlotFull = (day, time) => {
    const slotBookings = getSlotBookings(day, time);
    return slotBookings.length >= 5;
  };

  const handleBookingSubmit = () => {
    if (!userInfo.name.trim() || !userInfo.email.trim()) {
      return;
    }

    const slotKey = bookingDialog.slot;
    const newBooking = {
      id: Date.now(),
      name: userInfo.name.trim(),
      email: userInfo.email.trim(),
      timestamp: new Date().toISOString()
    };

    setBookings(prev => ({
      ...prev,
      [slotKey]: [...(prev[slotKey] || []), newBooking]
    }));

    setUserInfo({ name: '', email: '' });
    setBookingDialog({ open: false, slot: null });
    setSelectedTime(null);
  };

  const handleBookingCancel = () => {
    setBookingDialog({ open: false, slot: null });
    setUserInfo({ name: '', email: '' });
    setSelectedTime(null);
  };

  const removeBooking = (slotKey, bookingId) => {
    setBookings(prev => ({
      ...prev,
      [slotKey]: prev[slotKey]?.filter(booking => booking.id !== bookingId) || []
    }));
  };

  return (
    <Box className="bg-white p-4 md:p-6 max-w-6xl mx-auto">
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* Calendar Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} className="p-4 md:p-6">
            {/* Calendar Header */}
            <Box className="flex items-center justify-between mb-4 md:mb-6">
              <IconButton 
                size="small"
                className="text-gray-600 hover:bg-gray-100"
                onClick={handlePreviousMonth}
                sx={{ p: { xs: 0.5, md: 1 } }}
              >
                <ChevronLeft fontSize="small" />
              </IconButton>
              <Typography 
                variant="h6" 
                className="font-medium text-gray-800"
                sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
              >
                {formatMonthYear(currentDate)}
              </Typography>
              <IconButton 
                size="small"
                className="text-gray-600 hover:bg-gray-100"
                onClick={handleNextMonth}
                sx={{ p: { xs: 0.5, md: 1 } }}
              >
                <ChevronRight fontSize="small" />
              </IconButton>
            </Box>

            {/* Days of Week */}
            <Box className="grid grid-cols-7 gap-1 mb-3 md:mb-4">
              {weekDays.map((day) => (
                <Typography 
                  key={day}
                  variant="body2" 
                  className="text-center text-gray-500 font-medium py-2"
                  sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
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
                    ${day && isDateSelectable(day) ? 'hover:bg-gray-50' : ''}
                  `}
                  onClick={() => handleDateSelect(day)}
                >
                  {day && (
                    <Box
                      className={`
                        rounded-full flex items-center justify-center font-medium
                        ${selectedDate === day 
                          ? 'bg-blue-600 text-white' 
                          : isDateSelectable(day)
                            ? 'text-blue-600 hover:bg-blue-50'
                            : 'text-gray-400'
                        }
                      `}
                      sx={{
                        width: { xs: '32px', md: '36px' },
                        height: { xs: '32px', md: '36px' },
                        fontSize: { xs: '0.875rem', md: '1rem' }
                      }}
                    >
                      {day}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Time Slots Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} className="p-4 md:p-6 h-full">
            {/* Time Header */}
            <Typography 
              variant="h6" 
              className="font-medium text-gray-800 mb-4 md:mb-6"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              {selectedDate ? formatSelectedDate(currentDate, selectedDate) : 'Select a date'}
            </Typography>

            {/* Time Slots */}
            <Box className="space-y-2 max-h-80 md:max-h-96 overflow-y-auto pr-1 md:pr-2">
              {selectedDate ? (
                timeSlots.map((time) => {
                  const slotBookings = getSlotBookings(selectedDate, time);
                  const isAvailable = isSlotAvailable(selectedDate, time);
                  const isFull = isSlotFull(selectedDate, time);
                  
                  return (
                    <Box key={time} className="flex items-center gap-2">
                      <Button
                        variant={selectedTime === time ? "contained" : "outlined"}
                        disabled={!isAvailable}
                        className={`
                          flex-1 justify-start rounded-lg font-medium
                          ${selectedTime === time 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : isAvailable
                              ? 'border-blue-200 text-blue-600 hover:bg-blue-50'
                              : 'border-gray-200 text-gray-400 cursor-not-allowed'
                          }
                        `}
                        sx={{
                          px: { xs: 2, md: 3 },
                          py: { xs: 1.5, md: 2 },
                          fontSize: { xs: '0.75rem', md: '0.875rem' }
                        }}
                        onClick={() => isAvailable && handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                      
                      {/* Booking count indicator */}
                      <Box className="flex items-center gap-1">
                        {slotBookings.length > 0 && (
                          <Chip
                            size="small"
                            label={`${slotBookings.length}/5`}
                            color={isFull ? "error" : "primary"}
                            variant="outlined"
                            sx={{ fontSize: '0.7rem', height: '24px' }}
                          />
                        )}
                        {isFull && (
                          <Cancel 
                            sx={{ 
                              fontSize: '1rem', 
                              color: 'error.main' 
                            }} 
                          />
                        )}
                        {isAvailable && slotBookings.length === 0 && (
                          <CheckCircle 
                            sx={{ 
                              fontSize: '1rem', 
                              color: 'success.main' 
                            }} 
                          />
                        )}
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Please select a date to view available time slots.
                </Alert>
              )}
            </Box>

            {/* Bookings List */}
            {selectedDate && selectedTime && (
              <Box className="mt-4">
                <Typography variant="subtitle2" className="text-gray-600 mb-2">
                  Current Bookings for {selectedTime}:
                </Typography>
                <Box className="space-y-1 max-h-32 overflow-y-auto">
                  {getSlotBookings(selectedDate, selectedTime).map((booking) => (
                    <Box 
                      key={booking.id}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded"
                    >
                      <Box>
                        <Typography variant="body2" className="font-medium">
                          {booking.name}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          {booking.email}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => removeBooking(`${selectedDate}-${selectedTime}`, booking.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <Cancel fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Booking Dialog */}
      <Dialog 
        open={bookingDialog.open} 
        onClose={handleBookingCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box className="flex items-center gap-2">
            <PersonAdd color="primary" />
            Book Time Slot
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box className="space-y-4 mt-2">
            <Typography variant="body2" className="text-gray-600">
              Booking slot: {selectedDate && formatSelectedDate(currentDate, selectedDate)} at {selectedTime}
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              value={userInfo.name}
              onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
              required
              variant="outlined"
            />
            <Alert severity="info">
              Maximum 5 users can book the same time slot. Current bookings: {getSlotBookings(selectedDate, selectedTime).length}/5
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBookingCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleBookingSubmit}
            variant="contained"
            disabled={!userInfo.name.trim() || !userInfo.email.trim()}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Slot;
