import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

const AddTravelPostForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    content: "",
    image: "",
    destination: "",
    travelDate: "",
    location: "",
    tags: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const user = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()),
      author: {
        name: user.user.user_metadata.email,
        avatar:
          user.user.user_metadata.avatar ||
          "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg", // from useAuth or static
        verified: user.user.user_metadata.email_verified,
        location: user.user.user_metadata.location || "Unknown",
      },
    };

    try {
      await axios.post("/api/travelposts", payload);
      alert("Travel post added!");
      setForm({
        content: "",
        image: "",
        destination: "",
        travelDate: "",
        location: "",
        tags: "",
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to add post.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded shadow"
    >
      <textarea
        name="content"
        placeholder="Share your travel story..."
        value={form.content}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={form.destination}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="travelDate"
        placeholder="Travel Dates (e.g. Dec 10–15, 2024)"
        value={form.travelDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Your City (optional)"
        value={form.location}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (e.g. solo-travel, beaches)"
        value={form.tags}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Post Story
      </button>
    </form>
  );
};

export default AddTravelPostForm;
