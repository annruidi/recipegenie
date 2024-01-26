import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
