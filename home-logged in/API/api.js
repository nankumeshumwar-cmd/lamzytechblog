// api.js
const BASE_URL = "https://lamzytechnewsapi.onrender.com";

async function apiRequest(endpoint, options = {}, authRequired = false) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (authRequired) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("You must be logged in to do this.");
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message || "Something went wrong.");
  }

  return result.data;
}

function isLoggedIn() {
  return Boolean(localStorage.getItem("token"));
}

function getStoredStudent() {
  const student = localStorage.getItem("student");
  return student ? JSON.parse(student) : null;
}

