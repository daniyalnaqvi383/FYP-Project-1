import axios from 'axios';

// Continuous endpoint mapping based on your real .env PORT=8030
const apiClient = axios.create({
  baseURL: 'http://localhost:8030/api/v1', // 👈 100% accurate portal route
  timeout: 45000, // 45 seconds buffer max for multi-layered rendering loops
});

export default apiClient;