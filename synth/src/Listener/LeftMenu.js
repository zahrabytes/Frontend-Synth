import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import Link
import '../index.css';
import './LeftMenu.css';
import { MenuList } from "./MenuList";

function LeftMenu() {
    const [searchTerm, setSearchTerm] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/Search/${id}`);
    };

    const handleHome = () => {
        navigate(`/${id}/user-home`);
    };

    return (
        <div>
        <div className="leftMenu">
            <div className ="logoContainer">
                <div className="logo">
                    <i>
                        <header-menu>Synth</header-menu>
                    </i>
                </div>
            </div>
            <i onClick={handleSearch}>
                <BiSearch />
            </i>
            {/*<MenuPlayList />
            <TrackList />*/}
            <div>
        <ul className="menuContainer">
        {/* Render each menu option as a list item */}
        {MenuList.map((item) => (
          <li key={item.id}>
            <Link to={item.name === "Logout" ? "/" : `/${id}${item.path}`}>
                {item.icon} {item.name}
            </Link>
          </li>
        ))}
      </ul>
      </div>
        </div>
    </div>
    );
}
  
export { LeftMenu };

