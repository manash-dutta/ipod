import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import style from "./menu.module.css";

export default function Settings() {
  return (
    <div className={style.menuItem}>
      <FontAwesomeIcon icon={faGear} style={{fontSize: "80px"}} />
      <h4>Settings</h4>
    </div>
  );
}
