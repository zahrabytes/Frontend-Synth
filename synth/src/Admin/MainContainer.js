import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AdminLists } from "./AdminLists";
import './MainContainer.css';

function MainContainer() {

    useEffect(() => {
        const allLi = document
          .querySelector(".menuList")
          .querySelectorAll("li");
    
        function changeMenuActive() {
          allLi.forEach((n) => n.classList.remove("active"));
          this.classList.add("active");
        }
    
        allLi.forEach((n) => n.addEventListener("click", changeMenuActive));
      }, []);

    return (
    <div className='mainContainer'>
        <div className="menuList">
            <ul>
                <li>
                    <a href="#">Active</a>
                    </li>
                <li>
                    <a href="#">Resolved</a>
                    </li>
                    <li>
                        <Link to="/" className="roundedButton">Logout</Link>
                    </li>
            </ul>
            
        </div>
        <AdminLists />
    </div>
    );
}

export { MainContainer };
