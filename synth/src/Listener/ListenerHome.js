import React from "react";
import { LeftMenu } from "./LeftMenu";
import "./MainContainer.css";
import { MainContainer } from "./MainContainer.js";

function ListenerHome() {
  return (
    <div className="listener-container">
      <LeftMenu />
      <div className="content-container">

        <MainContainer />
      </div>
    </div>
  );
}

export { ListenerHome };

