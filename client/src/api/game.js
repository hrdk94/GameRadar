import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // adjust if deployed

export const getAllGames = async () => {
  try {
    const res = await axios.get(`${API_BASE}/games`);
    return res.data;
  } catch (err) {
    console.error("Error fetching games:", err);
    return [];
  }
};
