// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/classes';

export const createClass = async (classData) => {
  try {
    const response = await axios.post(API_URL, classData);
    return response.data;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

export const getAllClasses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};


const api = axios.create({
  baseURL: 'http://localhost:5000/api/classes',  
});

// API calls for classes
// export const getAllClasses = () => api.get('/classes');
export const getClassDetails = (id) => api.get(`/classes/${id}`);

// // API calls for comments
export const postComment = (data) => api.post('/comments', data);
export const getComments = (classId) => api.get(`/comments?classId=${classId}`);
