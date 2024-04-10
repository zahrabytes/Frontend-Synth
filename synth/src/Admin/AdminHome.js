import { AdminPage } from "./AdminLeftMenu";
import "./LeftMenu.css";
import { MainContainer } from "./MainContainer";
import "./MainContainer.css";

function AdminHome() {
  return (
    <div className="adminContainer">
      <AdminPage />
      <MainContainer />
    </div>
  );
}

export { AdminHome };
