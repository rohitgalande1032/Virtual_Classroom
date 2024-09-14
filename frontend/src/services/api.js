import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Adjust base URL to match your backend
});

// API calls for classes
export const getAllClasses = () => api.get('/classes');
export const getClassDetails = (id) => api.get(`/classes/${id}`);

// API calls for comments
export const postComment = (data) => api.post('/comments', data);
export const getComments = (classId) => api.get(`/comments?classId=${classId}`);
