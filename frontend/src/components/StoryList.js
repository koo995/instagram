import React from "react";
import "./StoryList.scss";
import { Card, Space } from "antd";

export default function StoryList({ style }) {
  return (
    <div style={style}>
      <Card
        size="small"
        title="Storys"
        extra={<a href="#">More</a>}
        style={{
          width: 300,
        }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
}
