import React, { useEffect, useState } from "react";
import Axios from "axios";
import Post from "./Post";

const apiUrl = "http://127.0.0.1:8000/api/posts/";

function PostList() {
  const [postList, setPostList] = useState([]); // 리스트이니까 가급적 빈 리스트를 넣어주는게

  //나는 이 컴포넌트가 만들어질때 api을 호출하고 싶다
  useEffect(() => {
    Axios.get(apiUrl) // 이러면 프로미스 객체를 반환한다?
      .then((Response) => {
        const { data } = Response;
        console.log("loaded response: ", Response);
        setPostList(data);
      })
      .catch((error) => {
        // error.Response
      });
    console.log("mounted");
  }, []);
  return (
    <div>
      {/* postList에서 꺼내온 녀석은 object이니까 render가 안된다? JSON.stringify을 이용한다 */}
      {postList.map((post) => {
        // 중괄호이기 때문에 return이 있어야 한다?? 아니면 그냥 한줄로 붙여서 쓰거나
        //Post컴포넌트 안에서 key을 지정하는 것은 의미가 없다 여기서 지정!
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
}

export default PostList;
