import React from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./Suggestion.scss";

export default function Suggestion() {
  return (
    <div className="suggestion">
      <div className="avatar">
        <UserAddOutlined />
      </div>
      <div className="usesrname">Username</div>
      <div className="action">
        <Button size="small">Follow</Button>
      </div>
    </div>
  );
}
