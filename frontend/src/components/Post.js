import React from "react";
import { Card, Avatar, commentList } from "antd";
import { HeartOutlined, UserOutlined, HeartTwoTone } from "@ant-design/icons";
import useAxios from "axios-hooks";
import Axios from "axios";
import { useAppContext } from "store";
//최대한 의미 있는 단위로 component을 나누는 연습을 할 것
//잘 나눠놓으면 매번 서비스 만들때 마다 재사용이 용이하다

function Post({ post, handleLike }) {
  const {
    store: { jwtAccessToken },
  } = useAppContext();
  const { author, caption, location, photo, is_like } = post; //콘솔에서 어떤 값들이 넘어오는지 보고 id값이 넘어오니 그것으로 유니크한 key값을 설정해 준다.
  const { username, name, avatar } = author;

  // const headers = { Authorization: `Bearer ${jwtAccessToken}` };
  // const [{ data: commentList, loading, error }, refetch] = useAxios({
  //   url: `http://127.0.0.1:8000/api/posts/${post.id}/comments/`,
  //   headers,
  // });

  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[
          is_like ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              onClick={() => handleLike({ post, isLike: false })}
            />
          ) : (
            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
          ),
        ]}
      >
        {" "}
        {/* hoverable은 마우스 가져다 대면 그림자?*/}
        <Card.Meta
          avatar={
            <Avatar size="large" icon={<img src={avatar} alt="username" />} />
          }
          title={location}
          description={caption}
        />
      </Card>
    </div>
  );
}

export default Post;
