import React from "react";
import { BiSearch } from "react-icons/bi";
import { AMenuList } from "./AdminMenu";
import { Menu } from "./Menu";

function AdminPage() {
    return (
        <div>
          <div className="leftMenu">
            <div className="logoContainer">
              <div className="logo">
                <i>
                  <header-menu>Synth</header-menu>
                </i>
              </div>
            </div>
            <div className="searchBox">
              <input type="text" placeholder="Search..." />
              <i>
                <BiSearch />
              </i>
            </div>
            <Menu title={"Menu"} menuObject={AMenuList} />
          </div>
          
      </div>
          
      );
        
}

export { AdminPage };




