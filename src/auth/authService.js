// export const mockUsers = [
//   {
//     email: "principal@test.com",
//     password: "123456",
//     role: "PRINCIPAL",
//     name: "Principal Sir"
//   },
//   {
//     email: "teacher@test.com",
//     password: "123456",
//     role: "TEACHER",
//     name: "Mr. Teacher"
//   },
//   {
//     email: "staff@test.com",
//     password: "123456",
//     role: "OFFICE_STAFF",
//     name: "Office Staff"
//   }
// ];

// export const login = (email, password) => {
//   const user = mockUsers.find(
//     u => u.email === email && u.password === password
//   );

//   if (!user) {
//     throw new Error("Invalid credentials");
//   }

//   // simulate backend response
//   localStorage.setItem("authUser", JSON.stringify(user));
//   localStorage.setItem("token", "mock-token-123");

//   return user;
// };

// export const logout = () => {
//   localStorage.removeItem("authUser");
//   localStorage.removeItem("token");
// };

// export const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("authUser"));
// };



// import axios from "axios";

// const API_URL = "https://serp.lemmecode.in/schoolerp/api";

// // LOGIN
// export const login = async (email, password) => {
//   const response = await axios.post(`${API_URL}/login`, {
//     email,
//     password,
//   });

//   if (response.data.success) {
//     const { user, token } = response.data.data;

//     // Save token & user
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));

//     return user;
//   } else {
//     throw new Error("Login failed");
//   }
// };

// // LOGOUT
// export const logout = async () => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     await axios.post(
//       `${API_URL}/logout`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   }

//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
// };

// // CURRENT USER
// export const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };




// src/services/authService.js
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
