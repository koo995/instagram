import React from "react";
import "./AppLayout.scss";
import { Input, Menu } from "antd";
import StoryList from "./StoryList";
import SuggestionList from "./SuggestionList";
const { Search } = Input;

function AppLayout({ children }) {
  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">instagram</h1>
        <div className="search">
          {/* 이렇게 하면 search의 길이가 줄어지네? */}
          <Search
            placeholder="검색어를 입력해 주세요"
            allowClear
            enterButton="Search"
            size="large"
          />
        </div>
        <div className="topnav">
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="horizontal inline"
          >
            <Menu.Item>Menu1</Menu.Item>
            <Menu.Item>Menu2</Menu.Item>
            <Menu.Item>Menu3</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="contents">{children}</div>
      <div className="sidebar">
        <StoryList style={{ marginBottom: "1rem" }} />
        <SuggestionList style={{ marginBottom: "1rem" }} />
      </div>
      <div className="footer">footer</div>
    </div>
  );
}
export default AppLayout;
