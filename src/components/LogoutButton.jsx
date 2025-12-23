// import { useNavigate } from "react-router-dom";
// import { logout } from "../auth/authService";

// const LogoutButton = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate("/");
//   };

//   return (
//     <button className="btn btn-outline-light fw-bold" onClick={handleLogout}>
//       Logout
//     </button>
//   );
// };

// export default LogoutButton;



// src/components/LogoutButton.jsx
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authService";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <button
      className="btn btn-light w-100 mt-3"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
