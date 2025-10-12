import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token scaduto o non valido
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export const publicApi = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const flightsAPI = {
  searchFlights: (params) => publicApi.get("/amadeus/flights", { params }),

  getFlightDetails: (flightId) => publicApi.get(`/amadeus/flights/${flightId}`),
};

export const airportsAPI = {
  searchAirports: (query) =>
    publicApi.get("/amadeus/airport-and-city-search", {
      params: {
        subType: "AIRPORT",
        keyword: query,
      },
    }),
};

export const activityAPI = {
  searchActivity: (params) =>
    publicApi.get("amadeus/tours-and-activities", { params }),
};

export const itineraryAPI = {
  generateItinerary: (data) =>
    publicApi.post("/v1/api/itinerary/generate", data),

  saveItinerary: (data) => api.post("/v1/api/itinerary/save", data),

  getUserItineraries: () => api.get("/v1/api/itinerary"),

  getItinerary: (id) => api.get(`/v1/api/itinerary/${id}`),

  deleteItinerary: (id) => api.delete(`/v1/api/itinerary/${id}`),
};

export const storageAPI = {
  upload: (formData, onProgress) =>
    api.post("/v1/api/storage/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: onProgress,
    }),

  uploadWithProgress: (file, folder = "profiles", onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    return api.post("/v1/api/storage/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: onProgress,
    });
  },

  generateUploadUrl: (fileName, contentType) =>
    api.post("/v1/api/storage/generate-upload-url", {
      fileName,
      contentType,
    }),

  deleteFile: (fileUrl) =>
    api.delete("/v1/api/storage/delete", {
      data: { fileUrl },
    }),
};

export const authAPI = {
  login: (credentials) => publicApi.post("/v1/api/auth/login", credentials),

  register: (userData) => publicApi.post("/v1/api/auth/register", userData),

  status: () => api.get("/v1/api/auth/status"),

  requestReset: (email) =>
    publicApi.post("/v1/api/auth/request-reset-password", email),

  resetPassword: (password) =>
    publicApi.post("/v1/api/auth/reset-password", password),

  googleLogin: (googleData) =>
    publicApi.post("/v1/api/auth/google", googleData),
};

export const userAPI = {
  getUser: (id) => api.get(`/v1/api/user/${id}`),

  updateProfile: (id, data) => api.put(`/v1/api/user/${id}`, data),
};

export const get = (url, config = {}) => api.get(url, config);

export const post = (url, data, config = {}) => api.post(url, data, config);

export const put = (url, data, config = {}) => api.put(url, data, config);

export const del = (url, config = {}) => api.delete(url, config);

export const publicGet = (url, config = {}) => publicApi.get(url, config);
export const publicPost = (url, data, config = {}) =>
  publicApi.post(url, data, config);

export default api;
