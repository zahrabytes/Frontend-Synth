// LeftMenu.js

import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import '../index.css';
import './LeftMenu.css';
import { Menu } from "./Menu";
import { MenuList } from "./MenuList";
import { MenuPlayList } from "./MenuPlaylist";
import { TrackList } from "./TrackList";

function LeftMenu() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Perform search when Enter key is pressed
            // You can call your search function here
            console.log('Search term:', searchTerm);
        }
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
            <div className ="searchBox">
                {/* Search bar with Enter key press handling */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress} // Handle Enter key press
                    placeholder="Search..."
                />
                <i>
                    <BiSearch />
                </i>
            </div>
            
            <Menu title={"Menu"} menuObject={MenuList} />
            <MenuPlayList />

            <TrackList />
        </div>

    );
}

export { LeftMenu };

