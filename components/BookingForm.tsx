import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

interface BookingFormProps {
  trainerId: string;
  onBookingSubmit: (data: BookingData) => void;
}

interface BookingData {
  date: Date;
  time: string;
  notes: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ trainerId, onBookingSubmit }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) {
      onBookingSubmit({
        date,
        time,
        notes,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Select Date</Label>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Select Time</Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Input
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any specific requirements or notes for the trainer"
        />
      </div>

      <Button type="submit" className="w-full">
        Book Session
      </Button>
    </form>
  );
}; 