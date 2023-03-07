import React, { useEffect, useState } from "react";
import "./SuggestionList.scss";
import { Card } from "antd";
import Suggestion from "./Suggestion";
import { useAppContext } from "store";
import Axios from "axios";
import useAxios from "axios-hooks";

export default function SuggestionList({ style }) {
  const {
    store: { jwtAccessToken },
  } = useAppContext();

  const [userList, setUserList] = useState([]);

  //axios을 좀더 일반적으로 쓰기위한 훅을 이용 useAxios hook
  //useEffect자체가 필요없다 요청자체를 useAxios가 보내게 되니까?
  //useAxios는 조회를 할때는 유용한다 post을 할때는 코드가 복잡해진다?
  const headers = { Authorization: `Bearer ${jwtAccessToken}` };
  const [{ data: origUserList, loading, error }, refetch] = useAxios({
    url: "http://127.0.0.1:8000/accounts/suggestions/",
    headers,
  });

  useEffect(() => {
    if (!origUserList) setUserList([]);
    else
      setUserList(origUserList.map((user) => ({ ...user, if_follow: false })));
  }, [origUserList]);

  //단순히 이런식이면 함수형 컴포넌트이기때문에 매 렌더링시마다 수행한다는 단점이 된다. >> useMemo을 사용
  // const userList =
  //   origUserList && origUserList.map((user) => ({ ...user, isFollow: false }));

  // const onFollowUser = (username) => {
  //   setUserList((prevUserList) => {
  //     return prevUserList.map((user) => {
  //       if (user.username === username) {
  //         return { ...user, is_follow: true };
  //       } else return user;
  //     });
  //   });
  // };

  const onFollowUser = (username) => {
    console.log("성공");
    try {
      Axios.post(
        "http://127.0.0.1:8000/accounts/follow/",
        { username },
        { headers }
      )
        // .then((response) => {
        //   setUserList((prevUserList) => {
        //     return prevUserList.map((user) => {
        //       if (user.username === username) {
        //         return { ...user, is_follow: true };
        //       } else return user;
        //     });
        //   });
        // })
        //위에 부분을 좀더 깔끔하게??
        .then((response) => {
          setUserList((prevUserList) =>
            prevUserList.map((user) =>
              user.username !== username ? user : { ...user, is_follow: true }
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("여기 에러야 :", error);
    }
  };

  return (
    <div style={style}>
      {/* 정말 빠르게 지나갈 것이다 */}
      {loading && <div>Loading...</div>}
      {error && <div>로딩중에 에러가 발생했습니다.</div>}

      {/* <button onClick={() => refetch()}>Reload</button> */}
      <Card
        size="small"
        title="Suggestions for you"
        // extra={<a href="#">More</a>}
        style={{
          width: 300,
        }}
      >
        {userList.map((suggestionUser) => (
          <Suggestion
            key={suggestionUser.username}
            suggestionUser={suggestionUser}
            onFollowUser={onFollowUser} //속성값으로 주입함
          />
        ))}
      </Card>
    </div>
  );
}
