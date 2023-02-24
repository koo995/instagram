import React from "react";

//최대한 의미 있는 단위로 component을 나누는 연습을 할 것
//잘 나눠놓으면 매번 서비스 만들때 마다 재사용이 용이하다

function Post({ post }) {
  const { caption, location, photo } = post; //콘솔에서 어떤 값들이 넘어오는지 보고 id값이 넘어오니 그것으로 유니크한 key값을 설정해 준다.
  return (
    <div>
      <img src={photo} alt={caption} style={{ width: "100px" }} />
      {caption}, {location},
    </div>
  );
}

export default Post;
