import React, { useState } from "react";
import { BiPulse, BiSearch } from "react-icons/bi";
import { BsFillHouseFill, BsJournalAlbum } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom"; // Import Link
import '../index.css';
import './LeftMenu.css';
import { Menu } from "./Menu";
import { MenuPlayList } from "./MenuPlaylist";
import { TrackList } from "./TrackList";

function LeftMenu() {
    const [searchTerm, setSearchTerm] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/Search/${id}`);
    };

    return (
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
            <Menu title={"Menu"} menuObject={MenuList} />
            <MenuPlayList />
            <TrackList />
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

