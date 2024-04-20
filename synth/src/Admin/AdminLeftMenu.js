import React from "react";
import { Link, useParams } from "react-router-dom";
import { AMenuList } from "./AdminMenu";

function AdminPage() {
  const { id } = useParams();

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
          {AMenuList.map((item) => (
            <li key={item.id}>
              <Link to={`/${id}${item.path}`}>
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>
          </div> 
      </div>
          
      );
        
}

export { AdminPage };




