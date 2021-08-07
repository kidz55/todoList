import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://kidz-todo-list-backend.herokuapp.com/',
  headers: { Pragma: 'no-cache' },
});

export default axiosInstance;
