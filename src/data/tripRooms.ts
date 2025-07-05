export interface TripRoom {
  id: string;
  destination: string;
  dates: string;
  budget: string;
  spotsLeft: number;
  totalSpots: number;
  organizer: {
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
    completedTrips?: number;
  };
  vibe: string[];
  expiresIn: number; // hours
  price: number;
  itinerary?: string[];
  safetyFeatures?: string[];
}

export const tripRooms: TripRoom[] = [
  {
    id: "goa-beach-getaway",
    destination: "Goa Beach Getaway",
    dates: "Dec 28-30, 2024",
    budget: "₹8,000-12,000",
    spotsLeft: 2,
    totalSpots: 6,
    organizer: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b1e5f0c7?w=150",
      rating: 4.8,
      verified: true,
      completedTrips: 12
    },
    vibe: ["Beach", "Photography", "Nightlife", "Chill"],
    expiresIn: 8,
    price: 9500,
    itinerary: [
      "Day 1: Arrive in Goa, Check into beachside resort",
      "Day 2: North Goa beaches - Baga, Calangute, Anjuna",
      "Day 3: South Goa exploration - Palolem, Agonda beaches",
      "Day 4: Adventure activities - Parasailing, Jet ski",
      "Day 5: Departure"
    ],
    safetyFeatures: [
      "All members verified with government ID",
      "GPS tracking enabled during trip",
      "Emergency contact system",
      "24/7 support hotline"
    ]
  },
  {
    id: "manali-snow-adventure",
    destination: "Manali Snow Adventure",
    dates: "Jan 5-8, 2025",
    budget: "₹15,000-20,000",
    spotsLeft: 1,
    totalSpots: 4,
    organizer: {
      name: "Arjun Patel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 4.9,
      verified: true,
      completedTrips: 15
    },
    vibe: ["Adventure", "Snow", "Trekking", "Photography"],
    expiresIn: 4,
    price: 17000,
    itinerary: [
      "Day 1: Arrive in Manali, Acclimatization and local sightseeing",
      "Day 2: Solang Valley - Snow activities, Paragliding",
      "Day 3: Rohtang Pass excursion (subject to weather)",
      "Day 4: Kasol and Tosh village exploration",
      "Day 5: Departure from Manali"
    ],
    safetyFeatures: [
      "Professional mountain guides included",
      "All members verified with government ID",
      "Emergency rescue insurance provided",
      "Weather monitoring and safety briefings",
      "GPS tracking enabled during trek"
    ]
  },
  {
    id: "rishikesh-river-rafting",
    destination: "Rishikesh River Rafting",
    dates: "Jan 2-4, 2025",
    budget: "₹6,000-9,000",
    spotsLeft: 5,
    totalSpots: 8,
    organizer: {
      name: "Kavya Joshi",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 4.7,
      verified: true,
      completedTrips: 8
    },
    vibe: ["Adventure", "Spiritual", "River Sports", "Yoga"],
    expiresIn: 12,
    price: 7500,
    itinerary: [
      "Day 1: Arrive in Rishikesh, Check-in and Ganga Aarti",
      "Day 2: White water rafting (16km), Cliff jumping",
      "Day 3: Yoga session, Temple visits, Bungee jumping",
      "Day 4: Departure after breakfast"
    ],
    safetyFeatures: [
      "Certified rafting instructors",
      "All safety equipment provided",
      "Medical support on standby",
      "All members verified with government ID",
      "Insurance coverage included"
    ]
  }
];

// In-memory state for dynamic updates
let tripRoomsState = [...tripRooms];

export const getTripRoom = (id: string): TripRoom | undefined => {
  return tripRoomsState.find(room => room.id === id);
};

export const joinTripRoom = (id: string): boolean => {
  const roomIndex = tripRoomsState.findIndex(room => room.id === id);
  if (roomIndex !== -1 && tripRoomsState[roomIndex].spotsLeft > 0) {
    tripRoomsState[roomIndex] = {
      ...tripRoomsState[roomIndex],
      spotsLeft: tripRoomsState[roomIndex].spotsLeft - 1
    };
    return true;
  }
  return false;
};

export const getAllTripRooms = (): TripRoom[] => {
  return [...tripRoomsState];
};