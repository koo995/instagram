import React from "react";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

function AppLayout({ children }) {
  return (
    <>
      <div className="header">header</div>
      {children}
      <div className="footer">footer</div>
    </>
  );
}
export default AppLayout;
