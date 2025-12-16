import axios from "axios";
export type ErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
  withCredentials: true, // якщо використовуєш cookie
});

// Встановлюємо глобальні налаштування для axios
api.defaults.headers["Cache-Control"] = "no-cache";
api.defaults.headers["Pragma"] = "no-cache";
api.defaults.headers["Expires"] = "0";

export default api;
