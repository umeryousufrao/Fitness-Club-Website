import { db } from './firebase';
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';

// Types matching your current schema
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'TRAINER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface Trainer {
  id: string;
  email: string;
  name: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  trainerId: string;
  date: Date;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  trainerId: string;
  createdAt: Date;
  updatedAt: Date;
}

// User operations
export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  const userRef = doc(collection(db, 'users'));
  const now = new Date();
  const user: User = {
    id: userRef.id,
    ...userData,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(userRef, user);
  return user;
};

export const getUser = async (id: string): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, 'users', id));
  return userDoc.exists() ? userDoc.data() as User : null;
};

// Trainer operations
export const createTrainer = async (trainerData: Omit<Trainer, 'id' | 'createdAt' | 'updatedAt'>) => {
  const trainerRef = doc(collection(db, 'trainers'));
  const now = new Date();
  const trainer: Trainer = {
    id: trainerRef.id,
    ...trainerData,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(trainerRef, trainer);
  return trainer;
};

export const getTrainer = async (id: string): Promise<Trainer | null> => {
  const trainerDoc = await getDoc(doc(db, 'trainers', id));
  return trainerDoc.exists() ? trainerDoc.data() as Trainer : null;
};

// Booking operations
export const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
  const bookingRef = doc(collection(db, 'bookings'));
  const now = new Date();
  const booking: Booking = {
    id: bookingRef.id,
    ...bookingData,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(bookingRef, booking);
  return booking;
};

export const getBooking = async (id: string): Promise<Booking | null> => {
  const bookingDoc = await getDoc(doc(db, 'bookings', id));
  return bookingDoc.exists() ? bookingDoc.data() as Booking : null;
};

export const updateBookingStatus = async (id: string, status: Booking['status']) => {
  const bookingRef = doc(db, 'bookings', id);
  await updateDoc(bookingRef, {
    status,
    updatedAt: new Date(),
  });
};

// Message operations
export const createMessage = async (messageData: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>) => {
  const messageRef = doc(collection(db, 'messages'));
  const now = new Date();
  const message: Message = {
    id: messageRef.id,
    ...messageData,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(messageRef, message);
  return message;
};

export const getMessages = async (userId: string, trainerId: string): Promise<Message[]> => {
  const q = query(
    collection(db, 'messages'),
    where('userId', '==', userId),
    where('trainerId', '==', trainerId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as Message);
}; 