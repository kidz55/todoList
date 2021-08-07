import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://0.0.0.0:9000',
  headers: { Pragma: 'no-cache' },
});

export default axiosInstance;
