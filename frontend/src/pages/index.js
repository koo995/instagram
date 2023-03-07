import React from "react";
import { Route } from "react-router-dom"; //라우팅을 처리하기 위함? 특정 컴포넌트 하나만 라우팅 되게 하기위함은 Switch로 묶어준다?
import AppLayout from "components/AppLayout";
import Home from "./Home";
import About from "./About";
import AccountRoutes from "./accounts"; //임의로 임포트해도 되니까
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import PostNew from "./PostNew";

//페이지 별로 레이아웃을 다르게 하기 위해서 AppLayout컴포넌트를 빼주었다
function Root() {
  return (
    <>
      {/* 여기서 Route을 쓸 수 있는 이유는 Root이전에 RouterProvider로 감싸져있기 때문이다. "/"은 최상위일때를 뜻하고 어떤 컴파운더를 렌더링 할지 써준다. 
      정확하게 url 매칭시에만 사용하기 위해서 exact을 사용해 준다
      버전 6에서는 컴포넌트로 써줘야 한다 Route을 쓰기 위해서는 Routes로 감싸줘야 한다. */}
      <LoginRequiredRoute exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <LoginRequiredRoute exact path="/posts/new" component={PostNew} />
      <Route path="/accounts" component={AccountRoutes} />
    </>
  ); //중간에 끼여있는 이 녀석은 나오지 않는대 실제로는 칠드런으로 전달됨 probs의 children으로 전달됨
}

export default Root;
