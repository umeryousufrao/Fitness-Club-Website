import React, { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BookingForm } from './BookingForm';
import { ChatInterface } from './ChatInterface';

export const TrainerList = () => {
  const { getTrainers } = useProfile();
  const [trainers, setTrainers] = useState<any[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const trainersList = await getTrainers();
        setTrainers(trainersList);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Our Trainers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <Card key={trainer.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={trainer.profileImage} />
                  <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{trainer.name}</CardTitle>
                  <CardDescription>{trainer.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{trainer.bio}</p>
              <div className="flex space-x-2">
                <Button
                  onClick={() => {
                    setSelectedTrainer(trainer);
                    setShowBookingForm(true);
                  }}
                >
                  Book Session
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTrainer(trainer);
                    setShowChat(true);
                  }}
                >
                  Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showBookingForm && selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h3 className="text-xl font-bold mb-4">Book Session with {selectedTrainer.name}</h3>
            <BookingForm
              trainerId={selectedTrainer.id}
              onBookingSubmit={() => {
                setShowBookingForm(false);
                setSelectedTrainer(null);
              }}
            />
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => {
                setShowBookingForm(false);
                setSelectedTrainer(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {showChat && selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[800px]">
            <h3 className="text-xl font-bold mb-4">Chat with {selectedTrainer.name}</h3>
            <ChatInterface
              userId="current-user-id" // Replace with actual user ID
              trainerId={selectedTrainer.id}
            />
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => {
                setShowChat(false);
                setSelectedTrainer(null);
              }}
            >
              Close Chat
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}; 