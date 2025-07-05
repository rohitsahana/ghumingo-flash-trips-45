export interface TravelPlan {
  id: string;
  title: string;
  destination: string;
  duration: string;
  cost: {
    total: number;
    breakdown: {
      accommodation: number;
      transportation: number;
      activities: number;
      meals: number;
      misc: number;
    };
  };
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    accommodation: string;
    meals: string[];
  }>;
  hotels: Array<{
    name: string;
    rating: number;
    price: number;
    amenities: string[];
    contact: string;
    address: string;
  }>;
  contact: {
    organizer: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
  groupSize: {
    current: number;
    max: number;
  };
  startDate: string;
  endDate: string;
  image: string;
  tags: string[];
  description: string;
  highlights: string[];
  requirements: string[];
  included: string[];
  notIncluded: string[];
}

export const travelPlans: TravelPlan[] = [
  // Ladakh Adventure Expedition
  {
    id: "ladakh-adventure",
    title: "Ladakh Adventure Expedition",
    destination: "Ladakh, Jammu & Kashmir",
    duration: "8 Days / 7 Nights",
    cost: {
      total: 45000,
      breakdown: {
        accommodation: 15000,
        transportation: 12000,
        activities: 8000,
        meals: 6000,
        misc: 4000
      }
    },
    itinerary: [
      { day: 1, title: "Arrival in Leh", activities: ["Airport pickup", "Acclimatization", "Leh Palace visit", "Shanti Stupa"], accommodation: "Hotel Dragon Ladakh", meals: ["Dinner"] },
      { day: 2, title: "Leh Local Sightseeing", activities: ["Thiksey Monastery", "Hemis Monastery", "Shey Palace", "Local market"], accommodation: "Hotel Dragon Ladakh", meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Nubra Valley", activities: ["Khardungla Pass", "Diskit Monastery", "Sand dunes", "Camel safari"], accommodation: "Nubra Valley Camp", meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Pangong Lake", activities: ["Pangong Lake visit", "Photography", "Sunset viewing", "Camping"], accommodation: "Pangong Camp", meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Tso Moriri Lake", activities: ["Tso Moriri Lake", "Wildlife spotting", "Village visit"], accommodation: "Tso Moriri Camp", meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Return to Leh", activities: ["Return journey", "Rest", "Shopping"], accommodation: "Hotel Dragon Ladakh", meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Magnetic Hill & Monasteries", activities: ["Magnetic Hill", "Alchi Monastery", "Lamayuru Monastery"], accommodation: "Hotel Dragon Ladakh", meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Departure", activities: ["Airport drop", "Farewell"], accommodation: "N/A", meals: ["Breakfast"] }
    ],
    hotels: [
      { name: "Hotel Dragon Ladakh", rating: 4.2, price: 3500, amenities: ["WiFi", "Restaurant", "Room Service", "Mountain View"], contact: "+91-9419177777", address: "Fort Road, Leh, Ladakh" },
      { name: "Nubra Valley Camp", rating: 4.0, price: 2500, amenities: ["Camping", "Bonfire", "Local Food", "Stargazing"], contact: "+91-9419188888", address: "Diskit, Nubra Valley" },
      { name: "Pangong Camp", rating: 3.8, price: 2000, amenities: ["Lake View", "Camping", "Basic Amenities"], contact: "+91-9419199999", address: "Pangong Lake, Ladakh" }
    ],
    contact: { organizer: "Rahul Sharma", phone: "+91-9876543210", email: "rahul@ghumingo.com", whatsapp: "+91-9876543210" },
    groupSize: { current: 8, max: 15 },
    startDate: "2024-12-15",
    endDate: "2024-12-22",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    tags: ["Adventure", "Mountains", "Monasteries", "High Altitude"],
    description: "Experience the mystical land of Ladakh with our carefully curated 8-day adventure. From ancient monasteries to pristine lakes, this journey will take you through the most breathtaking landscapes of the Himalayas.",
    highlights: ["Visit the highest motorable pass - Khardungla", "Experience the magical Pangong Lake", "Explore ancient Buddhist monasteries", "Camel safari in Nubra Valley", "Stargazing in the clear mountain sky"],
    requirements: ["Valid ID proof", "Medical fitness certificate", "Warm clothing", "Altitude sickness medication", "Travel insurance"],
    included: ["All accommodation", "Transportation", "Meals as specified", "Guide services", "Permits and entry fees", "First aid kit"],
    notIncluded: ["Airfare to/from Leh", "Personal expenses", "Tips and gratuities", "Additional meals", "Travel insurance"]
  },
  // Goa Beach & Culture Retreat
  {
    id: "goa-beach-retreat",
    title: "Goa Beach & Culture Retreat",
    destination: "Goa",
    duration: "6 Days / 5 Nights",
    cost: {
      total: 28000,
      breakdown: {
        accommodation: 12000,
        transportation: 6000,
        activities: 5000,
        meals: 4000,
        misc: 2000
      }
    },
    itinerary: [
      { day: 1, title: "Arrival in Goa", activities: ["Airport pickup", "Check-in", "Beach walk", "Welcome dinner"], accommodation: "Taj Holiday Village Resort", meals: ["Dinner"] },
      { day: 2, title: "Old Goa Heritage", activities: ["Basilica of Bom Jesus", "Se Cathedral", "Church of St. Francis", "Archaeological Museum"], accommodation: "Taj Holiday Village Resort", meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Beach Hopping", activities: ["Calangute Beach", "Baga Beach", "Anjuna Beach", "Water sports"], accommodation: "Taj Holiday Village Resort", meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Spice Plantation & Dudhsagar", activities: ["Spice plantation tour", "Dudhsagar Falls", "Elephant bath", "Traditional lunch"], accommodation: "Taj Holiday Village Resort", meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Panjim & Fontainhas", activities: ["Panjim city tour", "Fontainhas heritage walk", "Shopping", "Farewell party"], accommodation: "Taj Holiday Village Resort", meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Departure", activities: ["Beach morning", "Airport drop"], accommodation: "N/A", meals: ["Breakfast"] }
    ],
    hotels: [
      { name: "Taj Holiday Village Resort", rating: 4.5, price: 8000, amenities: ["Beach Access", "Pool", "Spa", "Restaurant", "Water Sports"], contact: "+91-832-6645858", address: "Sinquerim Beach, Goa" }
    ],
    contact: { organizer: "Priya Patel", phone: "+91-9876543211", email: "priya@ghumingo.com", whatsapp: "+91-9876543211" },
    groupSize: { current: 12, max: 20 },
    startDate: "2024-12-20",
    endDate: "2024-12-25",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
    tags: ["Beach", "Culture", "Heritage", "Relaxation"],
    description: "Discover the perfect blend of sun, sand, and culture in Goa. From pristine beaches to Portuguese heritage, this retreat offers the best of both worlds.",
    highlights: ["Visit UNESCO World Heritage churches", "Explore pristine beaches", "Experience Dudhsagar Falls", "Spice plantation tour", "Heritage walk in Fontainhas"],
    requirements: ["Valid ID proof", "Beach wear", "Comfortable walking shoes", "Camera", "Travel insurance"],
    included: ["Luxury beach resort accommodation", "All transportation", "Meals as specified", "Professional guide", "Entry fees", "Water sports activities"],
    notIncluded: ["Airfare to/from Goa", "Personal expenses", "Tips and gratuities", "Additional activities", "Travel insurance"]
  },
  // Kerala Backwaters & Ayurveda
  {
    id: "kerala-backwaters",
    title: "Kerala Backwaters & Ayurveda",
    destination: "Kerala",
    duration: "7 Days / 6 Nights",
    cost: {
      total: 35000,
      breakdown: {
        accommodation: 18000,
        transportation: 8000,
        activities: 6000,
        meals: 5000,
        misc: 2000
      }
    },
    itinerary: [
      { day: 1, title: "Arrival in Kochi", activities: ["Airport pickup", "Fort Kochi walk", "Chinese fishing nets", "Kathakali performance"], accommodation: "Brunton Boatyard", meals: ["Dinner"] },
      { day: 2, title: "Munnar Hill Station", activities: ["Tea plantation", "Eravikulam National Park", "Mattupetty Dam", "Sunset point"], accommodation: "Windermere Estate", meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Thekkady Wildlife", activities: ["Periyar Wildlife Sanctuary", "Boat safari", "Spice plantation", "Traditional dance"], accommodation: "Spice Village", meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Alleppey Backwaters", activities: ["Houseboat check-in", "Backwater cruise", "Village visit", "Sunset viewing"], accommodation: "Luxury Houseboat", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Kumarakom", activities: ["Bird sanctuary", "Ayurvedic massage", "Cooking class", "Cultural show"], accommodation: "Kumarakom Lake Resort", meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Kovalam Beach", activities: ["Beach relaxation", "Ayurvedic treatments", "Lighthouse visit", "Shopping"], accommodation: "Leela Kovalam", meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Departure", activities: ["Morning beach walk", "Airport drop"], accommodation: "N/A", meals: ["Breakfast"] }
    ],
    hotels: [
      { name: "Brunton Boatyard", rating: 4.8, price: 12000, amenities: ["Sea View", "Spa", "Restaurant", "Heritage Building"], contact: "+91-484-2215465", address: "Fort Kochi, Kerala" },
      { name: "Luxury Houseboat", rating: 4.3, price: 8000, amenities: ["Private Deck", "AC Rooms", "Traditional Food", "Backwater Views"], contact: "+91-477-2234567", address: "Alleppey Backwaters" },
      { name: "Kumarakom Lake Resort", rating: 4.6, price: 15000, amenities: ["Lake View", "Ayurvedic Spa", "Infinity Pool", "Fine Dining"], contact: "+91-481-2524500", address: "Kumarakom, Kerala" }
    ],
    contact: { organizer: "Anjali Menon", phone: "+91-9876543212", email: "anjali@ghumingo.com", whatsapp: "+91-9876543212" },
    groupSize: { current: 6, max: 12 },
    startDate: "2024-12-28",
    endDate: "2025-01-03",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600",
    tags: ["Backwaters", "Ayurveda", "Wildlife", "Culture"],
    description: "Experience the serene beauty of Kerala's backwaters, rejuvenate with authentic Ayurvedic treatments, and immerse yourself in the rich culture of God's Own Country.",
    highlights: ["Luxury houseboat experience", "Ayurvedic wellness treatments", "Wildlife safari in Thekkady", "Tea plantation visit", "Traditional Kathakali performance"],
    requirements: ["Valid ID proof", "Comfortable clothing", "Swimming gear", "Medication if any", "Travel insurance"],
    included: ["Premium accommodation", "All transportation", "Meals as specified", "Ayurvedic treatments", "Professional guide", "Entry fees"],
    notIncluded: ["Airfare to/from Kerala", "Personal expenses", "Tips and gratuities", "Additional treatments", "Travel insurance"]
  }
]; 