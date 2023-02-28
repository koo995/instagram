import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "store";

export default function LoginRequiredRoute({
  component: Component,
  ...kwargs
}) {
  //여기는 왜 오브젝트로 받아야 하는 것일까?
  const {
    store: { isAuthenticated },
  } = useAppContext();

  return (
    <Route
      {...kwargs}
      render={(props) => {
        //여기에 props은 다양한 값들이 넘어온다 match, location,  react-router-dom에서 컴포넌트로 넘어가는 속성값들이 넘어온다
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/accounts/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}
