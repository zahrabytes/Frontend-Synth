import React from "react";
import { LeftMenu } from "./LeftMenu";
import "./MainContainer.css";
import { MainContainer } from "./MainContainer.js";
import { useNavigate, useParams } from "react-router-dom"; // Import Link
import { ListenerLikes } from "./ListenerLikes.js";

function ListenerHome() {
  return (
    <div className="listener-container">
      <LeftMenu />
      <div className="content-container">
        <ListenerLikes />
      </div>
    </div>
  );
}

export { ListenerHome };

