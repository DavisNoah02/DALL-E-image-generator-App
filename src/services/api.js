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

export const deleteImage = async (imageId, userId) => {
  try {
    const response = await axios.delete(`${API_URL}/images/${imageId}/`, {
      data: { userId }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateImage = async (imageId, updates, userId) => {
  try {
    const response = await axios.patch(`${API_URL}/images/${imageId}/`, {
      ...updates,
      userId
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const toggleFavorite = async (imageId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/images/${imageId}/favorite/`, {
      userId
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const searchImages = async (userId, query, filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/images/${userId}/search/`, {
      params: { query, ...filters }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};