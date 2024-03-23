
import React from "react";
import SidebarOption from "./SidebarOption";
import "./sidebar.css"; // Import the CSS file

function Sidebar() {

  return (
    <div className="sidebar"> {/* Apply the 'sidebar' class */}
      <img
        className="sidebar__logo" // Apply the 'sidebar__logo' class
        src=""
        alt=""
      />
      <SidebarOption Icon={''} option="Home" />
      <SidebarOption Icon={''} option="Search" />
      <SidebarOption Icon={''} option="Profile" />
      <SidebarOption Icon={''} option="Your Library" />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
    </div>
  );
}

export default Sidebar;