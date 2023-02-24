import React from "react";
import "./SuggestionList.scss";
import { Card, Space } from "antd";
import Suggestion from "./Suggestion";

export default function SuggestionList({ style }) {
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
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </Card>
    </div>
  );
}
