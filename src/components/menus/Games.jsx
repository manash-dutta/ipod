import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import style from "./menu.module.css";

export default function Games() {
  return (
    <div className={style.menuItem}>
      <FontAwesomeIcon icon={faGamepad} style={{ fontSize: "80px" }} />
      <h1>Games</h1>
    </div>
  );
}
