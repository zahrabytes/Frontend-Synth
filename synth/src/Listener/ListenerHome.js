import React from "react";
import { LeftMenu } from "./LeftMenu";
import { SearchPage } from "./SearchPage.js";

function ListenerHome() {
  return (
    <div>
      <LeftMenu>
      <SearchPage />
      </LeftMenu>
    </div>
  );
}

export { ListenerHome }; 