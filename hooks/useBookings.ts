import { useState, useEffect } from 'react';
import { 
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';

interface Booking {
  id: string;
  userId: string;
  trainerId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
}

export const useBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setBookings([]);
        setLoading(false);
        return;
      }

      try {
        const bookingsQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(bookingsQuery);
        const bookingsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate()
        })) as Booking[];
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'userId'>) => {
    if (!user) throw new Error('No user logged in');

    try {
      const bookingRef = await addDoc(collection(db, 'bookings'), {
        ...bookingData,
        userId: user.uid,
        date: Timestamp.fromDate(bookingData.date),
        status: 'pending' as const
      });

      const newBooking: Booking = {
        id: bookingRef.id,
        ...bookingData,
        userId: user.uid,
        status: 'pending'
      };

      setBookings(prev => [...prev, newBooking]);
      return newBooking;
    } catch (error) {
      throw error;
    }
  };

  const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, { status });
      setBookings(prev =>
        prev.map(booking =>
          booking.id === bookingId ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      throw error;
    }
  };

  return {
    bookings,
    loading,
    createBooking,
    updateBookingStatus,
  };
}; 