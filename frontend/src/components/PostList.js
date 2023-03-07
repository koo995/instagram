import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";
import useAxios from "axios-hooks";
import Axios from "axios";

function PostList() {
  const {
    store: { jwtAccessToken },
  } = useAppContext();
  const [postList, setPostList] = useState([]);

  const headers = { Authorization: `Bearer ${jwtAccessToken}` };
  const [{ data: originPostList, loading, error }, refetch] = useAxios({
    url: "http://127.0.0.1:8000/api/posts/",
    headers,
  });
  //나는 이 컴포넌트가 만들어질때 api을 호출하고 싶다
  useEffect(() => {
    setPostList(originPostList);
  }, [originPostList]);
  useEffect(() => {
    refetch();
  }, []);

  const handleLike = async ({ post, isLike }) => {
    const apiUrl = `http://127.0.0.1:8000/api/posts/${post.id}/like/`;
    const method = isLike ? "POST" : "DELETE";

    try {
      const response = await Axios({
        url: apiUrl,
        method,
        headers,
      });
      console.log("response :", response);

      setPostList((prevList) => {
        return prevList.map((currentPost) =>
          currentPost === post
            ? { ...currentPost, is_like: isLike }
            : currentPost
        );
      });
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <div>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다" />
      )}
      {/* postList에서 꺼내온 녀석은 object이니까 render가 안된다? JSON.stringify을 이용한다 */}
      {postList &&
        postList.map((post) => {
          // 중괄호이기 때문에 return이 있어야 한다?? 아니면 그냥 한줄로 붙여서 쓰거나
          //Post컴포넌트 안에서 key을 지정하는 것은 의미가 없다 여기서 지정!
          return <Post post={post} key={post.id} handleLike={handleLike} />;
        })}
    </div>
  );
}

export default PostList;
