import style from "./menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Menu(props) {
  const { selectedItemIndex } = props;
  const menuItems = ["Cover flow", "Music", "Games", "Settings"];
  return (
    <div className={style.menu}>
      <div style={{ padding: "10px" }}>
        <h2>Ipod</h2>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={selectedItemIndex === index ? style.active : ""}
            >
              {item}{" "}
              <FontAwesomeIcon icon={faChevronRight} className={style.icon} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
