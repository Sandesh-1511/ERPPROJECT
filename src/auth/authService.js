
import axios from "axios";

const API_URL = "https://serp.lemmecode.in/schoolerp/api";

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  const userFromApi = res.data.data.user;
  const token = res.data.data.token;

  // ✅ NORMALIZE USER OBJECT
  const user = {
    id: userFromApi.id,
    name: userFromApi.name,
    email: userFromApi.email,
    role: userFromApi.roles?.[0]?.name || null, // 👈 KEY FIX
  };

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);

  return user;
};

export const logout = async () => {
  try {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (e) {
    console.warn("Logout API failed, clearing local data");
  }

  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
