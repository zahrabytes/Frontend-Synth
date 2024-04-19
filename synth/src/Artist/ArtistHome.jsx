
import { useParams } from "react-router-dom";
import "../Admin/LeftMenu.css";
import "../Admin/MainContainer.css";
import Albums from "./Albums";
import { ArtistLeft } from "./LeftMenu";

function ArtistHome() {
  const { id } = useParams();
  console.log(id); // Check if id is logged correctly
  return (
    <div className="adminContainer">
      <ArtistLeft />
      <Albums />
    </div>
  );
}

export { ArtistHome };
