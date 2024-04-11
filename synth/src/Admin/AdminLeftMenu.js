import React from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Menu } from "../Listener/Menu";
import { AMenuList } from "./AdminMenu";

function AdminPage() {
  const navigate = useNavigate(); // Initialize useNavigate

    const handleSearchClick = () => {
        // Navigate to the search page when the search box is clicked
        navigate("/search");
    };

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
            <div className="searchBox" onClick={handleSearchClick}>
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




