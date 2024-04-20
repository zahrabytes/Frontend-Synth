import { BiPulse, BiSolidBell, BiSolidComment } from "react-icons/bi";
import { BsFillHouseFill } from "react-icons/bs";

const ArtistMenuList = [
  {
    id: 1,
    icon: <BsFillHouseFill />,
    name: "Home",
    path: "/artist-home", // Define path for Home
  },
  {
    id: 2,
    icon: <BiSolidBell />,
    name: "Add New Album",
    path: "/albums/add", // Define path for Add New Album
  },
  {
    id: 3,
    icon: <BiSolidComment />,
    name: "Run Report",
    path: "/reports", // Define path for Run Report
  },
  {
    id: 3,
    icon: <BiPulse/>,
    name: "Logout",
  },
  
];

export { ArtistMenuList };
