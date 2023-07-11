import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (!loading && isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      {/* {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              return <Navigate to="/login" />;
            }
            return <Element {...props} />;
          }}
        />
      )} */}
      {loading === false ? <Element {...rest} /> : null}
    </>
  );
};

export default ProtectedRoute;
