import React from "react";
import { Outlet } from "react-router-dom";
export default function PrivateLayout(props) {
  return (
    <div>
      <Outlet />
    </div>
  );
}
