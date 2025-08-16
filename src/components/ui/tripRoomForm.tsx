import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const TripRoomForm = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    destination: "",
    dates: "",
    budget: "",
    spotsLeft: 0,
    totalSpots: 0,
    organizer: {
      name: "",
      avatar: "",
      rating: 4.8,
      verified: true,
      completedTrips: 0
    },
    vibe: [],
    expiresIn: 12,
    price: 0,
    itinerary: [],
    safetyFeatures: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes("organizer.")) {
      const [_, key] = name.split(".");
      setForm((prev) => ({
        ...prev,
        organizer: {
          ...prev.organizer,
          [key]: value
        }
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value.split(",").map((v) => v.trim())
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:6080/api/triprooms", {
        ...form,
        spotsLeft: Number(form.spotsLeft),
        totalSpots: Number(form.totalSpots),
        price: Number(form.price),
        expiresIn: Number(form.expiresIn),
        organizer: {
          ...form.organizer,
          rating: Number(form.organizer.rating),
          completedTrips: Number(form.organizer.completedTrips),
          verified: true
        }
      });
      alert("Trip Room created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error creating TripRoom:", err);
      alert("Error occurred");
    }
    navigate("/flash-trip-rooms"); // Redirect to the trip rooms feed after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Create Trip Room</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>ID</Label>
          <Input name="id" value={form.id} onChange={handleChange} required />
        </div>
        <div>
          <Label>Destination</Label>
          <Input name="destination" value={form.destination} onChange={handleChange} required />
        </div>
        <div>
          <Label>Dates</Label>
          <Input name="dates" value={form.dates} onChange={handleChange} />
        </div>
        <div>
          <Label>Budget</Label>
          <Input name="budget" value={form.budget} onChange={handleChange} />
        </div>
        <div>
          <Label>Spots Left</Label>
          <Input name="spotsLeft" type="number" value={form.spotsLeft} onChange={handleChange} />
        </div>
        <div>
          <Label>Total Spots</Label>
          <Input name="totalSpots" type="number" value={form.totalSpots} onChange={handleChange} />
        </div>
        <div>
          <Label>Expires In (hrs)</Label>
          <Input name="expiresIn" type="number" value={form.expiresIn} onChange={handleChange} />
        </div>
        <div>
          <Label>Price (₹)</Label>
          <Input name="price" type="number" value={form.price} onChange={handleChange} />
        </div>
      </div>

      <div>
        <Label>Organizer Name</Label>
        <Input name="organizer.name" value={form.organizer.name} onChange={handleChange} />
      </div>
      <div>
        <Label>Organizer Avatar (URL)</Label>
        <Input name="organizer.avatar" value={form.organizer.avatar} onChange={handleChange} />
      </div>
      <div>
        <Label>Organizer Rating</Label>
        <Input name="organizer.rating" type="number" value={form.organizer.rating} onChange={handleChange} />
      </div>
      <div>
        <Label>Organizer Completed Trips</Label>
        <Input name="organizer.completedTrips" type="number" value={form.organizer.completedTrips} onChange={handleChange} />
      </div>

      <div>
        <Label>Vibe Tags (comma-separated)</Label>
        <Input onChange={(e) => handleArrayChange("vibe", e.target.value)} />
      </div>

      <div>
        <Label>Itinerary (comma-separated)</Label>
        <Textarea onChange={(e) => handleArrayChange("itinerary", e.target.value)} />
      </div>

      <div>
        <Label>Safety Features (comma-separated)</Label>
        <Textarea onChange={(e) => handleArrayChange("safetyFeatures", e.target.value)} />
      </div>

      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg">
        Add Trip Room
      </Button>
    </form>
  );
};

export default TripRoomForm;
