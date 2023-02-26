import React from "react"
import { Route, Navigate } from "react-router-dom"

function AdminRoute({ isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (<Navigate to={{ pathname: '/admin', state: { from: props.location } }} />
          );
        }
      }}
    />)
}
export default AdminRoute;