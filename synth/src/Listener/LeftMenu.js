import React, { useState } from "react";
import { BiPulse, BiSearch } from "react-icons/bi";
import { BsFillHouseFill, BsJournalAlbum } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import Link
import '../index.css';
import './LeftMenu.css';

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
        </div>
        <div>
        <ul className="menuContainer">
        {/* Render each menu option as a list item */}
        {MenuList.map((item) => (
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

const MenuList = [
    {
      id: 1,
      icon: <BsFillHouseFill />,
      name: "Home",
    },
    {
      id: 2,
      icon: <BiPulse />,
      name: "Discover",
    },
    {
      id: 3,
      icon: <FaMicrophoneAlt />,
      name: "Artist",
    },
    {
      id: 5,
      icon: <BsJournalAlbum />,
      name: "Albums",
    },
  ];
  
export { LeftMenu, MenuList };

