
import { BiPulse, BiSolidComment } from "react-icons/bi";
import { BsFillHouseFill } from "react-icons/bs";

const AMenuList = [
    {
      id: 1,
      icon: <BsFillHouseFill />,
      name: "Home",
      path: "/admin-home",
    },
    {
      id: 2,
      icon: <BiSolidComment />,
      name: "Flag Reports",
    },
    {
      id: 3,
      icon: <BiPulse/>,
      name: "Logout",
    },
  ];
  
  export { AMenuList };
