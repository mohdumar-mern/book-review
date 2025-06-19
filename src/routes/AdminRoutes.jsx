import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { token, userRole } = useSelector((state) => state.auth);
  return token && userRole === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
