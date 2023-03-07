import AppLayout from "components/AppLayout";
import PostList from "components/PostList";
import React from "react";
import StoryList from "components/StoryList";
import SuggestionList from "components/SuggestionList";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

function Home() {
  //element을 무조건 return안에만 써야하는 것은 아니다
  const history = useHistory();
  const handleClick = () => {
    history.push("/posts/new");
  };
  const sidebar = (
    <>
      <Button
        type="primary"
        block
        style={{ marginBottom: "1rem" }}
        onClick={handleClick}
      >
        새 포스팅 쓰기
      </Button>
      <StoryList style={{ marginBottom: "1rem" }} />
      <SuggestionList style={{ marginBottom: "1rem" }} />
    </>
  );
  return (
    // <AppLayout children={<PostList/>}> 이렇게 해도 되고 밑에처럼 해도 되지만 지금은 밑에가 더 보기 좋을듯?
    <AppLayout sidebar={sidebar}>
      <PostList />
    </AppLayout>
  );
}

export default Home;
