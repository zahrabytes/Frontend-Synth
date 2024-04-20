import React from "react";
import { Link, useParams } from "react-router-dom";
//import "../Admin/LeftMenu.css";
import { ArtistMenuList } from "./ArtistMenuList";
import "./LeftMenu.css";

function ArtistLeft() {
  const { artistID } = useParams();

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
        <ul className="menuContainer">
          {/* Render each menu option as a list item */}
          {ArtistMenuList.map((item) => (
            <li key={item.artistID}>
              <Link to={item.name === "Logout" ? "/" : `/${artistID}${item.path}`}>
                {item.icon} {item.name}
            </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { ArtistLeft };


