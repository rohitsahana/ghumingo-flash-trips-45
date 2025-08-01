import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FlashTripRooms from "./pages/FlashTripRooms";
import TravelStories from "./pages/TravelStories";
import Communities from "./pages/Communities";
import TripRoomDetail from "./pages/TripRoomDetail";
import Messaging from "./pages/Messaging";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import TravelPlans from "./pages/TravelPlans";
import TripRoomForm from "./components/ui/tripRoomForm";
import TravelAgentOnboarding from "./pages/TravelAgentOnboarding";
import TravelAgentDashboard from "./pages/TravelAgentDashboard";
import CreateTravelPackage from "./pages/CreateTravelPackage";
import TravelPlanBooking from "./pages/TravelPlanBooking";
import UserDashboard from "./pages/UserDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/flash-trip-rooms" element={<FlashTripRooms />} />
            <Route path="/trip-room/:id" element={<TripRoomDetail />} />
            <Route path="/travel-stories" element={<TravelStories />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/messaging/:userId" element={<Messaging />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/travel-plans" element={<TravelPlans />} />
            <Route path="/travel-plan-booking/:id" element={<TravelPlanBooking />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/flash-trip-rooms/new" element={<TripRoomForm />} />
            <Route path="/travel-agent/onboarding" element={<TravelAgentOnboarding />} />
            <Route path="/travel-agent/dashboard" element={<TravelAgentDashboard />} />
            <Route path="/travel-agent/create-package" element={<CreateTravelPackage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
