import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const generateImages = async (prompt, count, userId) => {
  try {
    const response = await axios.post(`${API_URL}/generate/`, {
      prompt,
      count,
      userId
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getUserImages = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/images/${userId}/`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};