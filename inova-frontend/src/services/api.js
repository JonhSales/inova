// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:5000/', // URL do seu back-end
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerWorkshop = async (data) => {
  try {
    const response = await api.post('/workshops', data);
    return response.data;
  } catch (error) {
    console.error('Error registering workshop:', error);
    throw error;
  }
};

export const registerCustomer = async (data) => {
  try {
    const response = await api.post('/customers', data);
    return response.data;
  } catch (error) {
    console.error('Error registering customer:', error);
    throw error;
  }
};
