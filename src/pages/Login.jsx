// // src/pages/Login.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const mockUsers = [
//     { email: "office@nivid.edu", password: "123456", role: "office", name: "Office Staff" },
//     { email: "principal@nivid.edu", password: "123456", role: "principal", name: "Principal" },
//     { email: "teacher@nivid.edu", password: "123456", role: "teacher", name: "Teacher" },
//     { email: "library@nivid.edu", password: "123456", role: "librarian", name: "Librarian" },
//     { email: "accounts@nivid.edu", password: "123456", role: "accountant", name: "Accountant" },
//     { email: "student@nivid.edu", password: "123456", role: "student", name: "Student" }
//   ];

//   const handleLogin = () => {
//     const user = mockUsers.find(
//       u => u.email === email && u.password === password
//     );

//     if (!user) {
//       setError("Invalid credentials");
//       return;
//     }

//     localStorage.setItem("user", JSON.stringify(user));

//     navigate(`/dashboard/${user.role}`);
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4 shadow" style={{ width: 380 }}>
//         <h4 className="text-center mb-3">Education Portal Login</h4>

//         {error && <div className="alert alert-danger">{error}</div>}
            
//         <input
//           className="form-control mb-3"
//           placeholder="Email"
//           onChange={e => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           className="form-control mb-3"
//           placeholder="Password"
//           onChange={e => setPassword(e.target.value)}
//         />

//         <button className="btn btn-primary w-100" onClick={handleLogin}>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;





// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../auth/authService";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       const user = await login(email, password);

//       // Backend gives role inside user.roles[]
//       const role = user.roles?.[0]?.name?.toLowerCase();

//       navigate(`/dashboard/${role}`);
//     } catch (err) {
//       setError("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4 shadow" style={{ width: 380 }}>
//         <h4 className="text-center mb-3">ERP Login</h4>

//         {error && <div className="alert alert-danger">{error}</div>}

//         <input
//           className="form-control mb-3"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="form-control mb-3"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           className="btn btn-primary w-100"
//           onClick={handleLogin}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;




// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth/authService";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const user = await login(email, password);

      // ✅ ROLE NOW EXISTS
      navigate(`/dashboard/${user.role}`);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: 380 }}>
        <h4 className="text-center mb-3">Education Portal Login</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
