import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const getInventoryControls = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory/control`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory controls:", error);
    throw error;
  }
};
