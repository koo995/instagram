import React, { createContext, useContext } from "react";
import { getStorageItem, setStorageItem } from "utils/useLocalStorage";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
  Update,
} from "use-reducer-with-side-effects";

const AppContext = createContext();

const reducer = (prevState, action) => {
  //외부로 노출을 안할 것
  //reducer은 언제나 순수함수로 구현해야함
  //사이드이펙트로 token을 set할때 로컬스토리지에 저장하고 싶다
  const { type } = action;
  if (type === SET_TOKEN) {
    // 로그인일때?
    const { payload: jwtAccessToken } = action; //원래 key명이 jwtAccessToken이니 변경해 준다
    const newState = { ...prevState, jwtAccessToken, isAuthenticated: true };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtAccessToken", jwtAccessToken);
    });
  } else if (type === DELETE_TOKEN) {
    //로그아웃일때?
    const newState = {
      ...prevState,
      jwtAccessToken: "",
      isAuthenticated: false,
    };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtAccessToken", "");
    });
  }
  return prevState;
};

//원래는 AppContext.provider이렇게 쓸것을 별도의 컴포넌트를 만들어 준다.
export const AppProvider = ({ children }) => {
  const jwtAccessToken = getStorageItem("jwtAccessToken", "");
  const [store, dispatch] = useReducerWithSideEffects(
    //원래의 usereducer은 3개의 인자를 받는데 여기서는 2개의 인자만 받는다
    reducer,
    {
      jwtAccessToken,
      isAuthenticated: jwtAccessToken.length > 0, //이것을 하나 추가?
    } //훅이 아닌 일반 function이니 사용가능?
  );
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext); //값을 읽어올땐 다른 컴포넌트에서 이것으로 읽어온다

//action 실제 action을 노출하지는 않는다?
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

//action creators
export const setToken = (token) => ({ type: SET_TOKEN, payload: token }); //payload는 해당 action과 관련된 데이터
export const deleteToken = () => ({ type: DELETE_TOKEN });
