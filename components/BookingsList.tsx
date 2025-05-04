import React from 'react';
import { useBookings } from '@/hooks/useBookings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
};

export const BookingsList = () => {
  const { bookings, loading, updateBookingStatus } = useBookings();

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Session with Trainer</CardTitle>
                  <CardDescription>
                    {format(booking.date, 'PPP p')}
                  </CardDescription>
                </div>
                <Badge className={statusColors[booking.status]}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {booking.notes && (
                <p className="text-sm text-gray-600 mb-4">{booking.notes}</p>
              )}
              {booking.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {bookings.length === 0 && (
          <p className="text-center text-gray-500">No bookings found</p>
        )}
      </div>
    </div>
  );
}; 