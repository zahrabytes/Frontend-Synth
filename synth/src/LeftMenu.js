import React from "react";
import { BiSearch } from "react-icons/bi";
import './LeftMenu.css';
import { Menu } from "./Menu";
import { MenuList } from "./MenuList";

function LeftMenu() {
    return <div className="leftMenu">
        <div className ="logoContainer">
          <div className="logo">
            <i>
            <header-menu>Synth</header-menu>
            </i>
          </div>
        </div>
        <div className ="searchBox">
        <input type="text" placeholder="Search..." />
        <i>
          <BiSearch />
        </i>
      </div>
      
      <Menu title ={"Menu"} menuObject={MenuList}/>
        </div>
}

export { LeftMenu };
