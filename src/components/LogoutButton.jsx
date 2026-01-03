
// // src/components/LogoutButton.jsx
// import { useNavigate } from "react-router-dom";
// import { logout } from "../auth/authService";

// const LogoutButton = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate("/");
//   };

//   return (
//     <button
//       className="btn btn-light w-100 mt-3"
//       onClick={handleLogout}
//     >
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
      className="btn btn-light w-100 w-md-auto mt-3 mx-md-auto"
      onClick={handleLogout}
      style={{
        maxWidth: '220px', // Prevent over-stretching on desktop
        transition: 'background-color 0.2s ease',
        position:"relative",
        right:"15px"
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f3f5'}
      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
    >
      Logout
    </button>
  );
};

export default LogoutButton;