import axios from "axios";


const apiUrl = "http://localhost:8000/";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});



export default api;