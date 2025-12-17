export const mockUsers = [
  {
    email: "principal@test.com",
    password: "123456",
    role: "PRINCIPAL",
    name: "Principal Sir"
  },
  {
    email: "teacher@test.com",
    password: "123456",
    role: "TEACHER",
    name: "Mr. Teacher"
  },
  {
    email: "staff@test.com",
    password: "123456",
    role: "OFFICE_STAFF",
    name: "Office Staff"
  }
];

export const login = (email, password) => {
  const user = mockUsers.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // simulate backend response
  localStorage.setItem("authUser", JSON.stringify(user));
  localStorage.setItem("token", "mock-token-123");

  return user;
};

export const logout = () => {
  localStorage.removeItem("authUser");
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("authUser"));
};
