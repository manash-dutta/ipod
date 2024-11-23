import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForwardFast,
  faBackwardFast,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import style from "./wheel.module.css";

export default function Wheel(props) {
  const { handleMenu, handleScrollStart, handleSelect, wheelRef } = props;
  return (
    <div
      className={style.wheel}
      onPointerDown={handleScrollStart}
      ref={wheelRef}
    >
      <div className={style.selectBtn} onClick={handleSelect}></div>
      <ul className={style.controls}>
        <li className={style.menu} onPointerDown={handleMenu}>
          MENU
        </li>
        <li className={style.prev}>
          <FontAwesomeIcon icon={faBackwardFast} />
        </li>
        <li className={style.next}>
          <FontAwesomeIcon icon={faForwardFast} />
        </li>
        <li className={style.play}>
          <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faPause} />
        </li>
      </ul>
    </div>
  );
}
