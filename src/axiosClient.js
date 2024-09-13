import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://66e43ca0d2405277ed13a2ac.mockapi.io/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
