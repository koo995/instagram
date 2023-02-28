import React from "react";
import { Route } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import LoginRequiredRoute from "utils/LoginRequiredRoute";

function Routes({ match }) {
  //앞의 index에서 accounts url을 이미 소비해줬으니 match 을 이용한다
  //accounts 폴더안에 있는 login 이나 profile의 라우팅 처리를 여기서 한다.
  return (
    <>
      {/* 모든 속성값에서 식의 표현식이 필요할땐 항상 중괄호를 쓴다? */}
      <LoginRequiredRoute
        exact
        path={match.url + "/profile"}
        component={Profile}
      />
      <Route exact path={match.url + "/login"} component={Login} />
      <Route exact path={match.url + "/signup"} component={Signup} />
    </>
  );
}

export default Routes;
