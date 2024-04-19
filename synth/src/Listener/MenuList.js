import { BiPulse } from "react-icons/bi";
import { BsFillHouseFill, BsJournalAlbum } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";


const MenuList = [
    {
      id: 1,
      icon: <BsFillHouseFill />,
      name: "Home",
      path: "/user-home",
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
  
  export { MenuList };

