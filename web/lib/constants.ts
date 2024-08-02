export const API_HOST =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "http://backend:8000";
