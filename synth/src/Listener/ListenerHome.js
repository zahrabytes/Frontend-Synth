import React from "react";
import { LeftMenu } from "./LeftMenu";
import { SearchPage } from "./SearchPage.js";

function ListenerHome() {
  return (
    <div>
      <LeftMenu />
      <SearchPage />
    </div>
  );
}

export { ListenerHome }; 