import React, { useEffect, useState } from "react";
import "./SuggestionList.scss";
import { Card, Space } from "antd";
import Suggestion from "./Suggestion";
import { useAppContext } from "store";
import Axios from "axios";

export default function SuggestionListV2({ style }) {
  const [userList, setUserList] = useState([]);
  const {
    store: { jwtAccessToken },
  } = useAppContext();

  //이 항목을 언제 읽어올 것이냐?? 로딩이 될때
  //위에서 그냥 호출될때 읽어오는거랑 그냥 useEffect안에 넣는거랑 뭔 차이내? []가 어떤 의미였는데
  useEffect(() => {
    async function fetchUserList() {
      const apiUrl = "http://127.0.0.1:8000/accounts/suggestions/";
      const headers = { Authorization: `Bearer ${jwtAccessToken}` };
      try {
        const { data } = await Axios.get(apiUrl, { headers });
        setUserList(data);
        console.log("response: ", data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList();
  }, []);

  return (
    <div style={style}>
      <Card
        size="small"
        title="Suggestions for you"
        extra={<a href="#">More</a>}
        style={{
          width: 300,
        }}
      >
        {userList.map((suggestionUser) => (
          <Suggestion
            key={suggestionUser.username}
            suggestionUser={suggestionUser}
          />
        ))}
      </Card>
    </div>
  );
}
