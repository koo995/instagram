import React from "react";
import { Button, Avatar } from "antd";
import "./Suggestion.scss";

//프레젠테이션 컴포넌트라 할 수 있다
export default function Suggestion(props) {
  console.log("여기 props야!! :", props);
  const { suggestionUser, onFollowUser } = props;
  const { username, avatar, is_follow } = suggestionUser;
  return (
    <div className="suggestion">
      <div className="avatar">
        <Avatar icon={<img src={avatar} alt={`${username}'s avatar`} />} />
        {/* <UserAddOutlined /> */}
      </div>
      <div className="usesrname">{username}</div>
      <div className="action">
        {is_follow && "팔로잉 중"}
        {!is_follow && (
          <Button size="small" onClick={() => onFollowUser(username)}>
            Follow
          </Button>
        )}
      </div>
    </div>
  );
}
