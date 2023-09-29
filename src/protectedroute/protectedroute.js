import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
