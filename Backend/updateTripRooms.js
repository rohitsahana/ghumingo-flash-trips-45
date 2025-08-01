import mongoose from 'mongoose';
import TripRoom from './models/TripRoom.js';

const updateTripRooms = async () => {
  try {
    await mongoose.connect("mongodb+srv://Preet:dejavu@preetsingh.a0rfk.mongodb.net/");
    console.log('Connected to MongoDB');

    // Update existing trip rooms to include userId for organizers
    const tripRooms = await TripRoom.find();
    
    for (const room of tripRooms) {
      if (!room.organizer.userId) {
        // Create userId based on organizer name
        const userId = room.organizer.name.toLowerCase().replace(/\s+/g, '-');
        
        room.organizer.userId = userId;
        await room.save();
        console.log(`Updated trip room ${room.id} with userId: ${userId}`);
      }
    }

    console.log('All trip rooms updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating trip rooms:', error);
    process.exit(1);
  }
};

updateTripRooms(); 