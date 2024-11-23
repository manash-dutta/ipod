import style from "./screen.module.css";
import Menu from "./menus/menu";
import Cover from "./menus/Cover";
import Settings from "./menus/Settings";
import Music from "./menus/Music";
import Games from "./menus/Games";
import PlaySong from "./menus/PlaySong";

export default function Screen(props) {
  const { isMenuActive, currentMenu, selectedItemIndex, isSelectBtnActive } =
    props;
  return (
    <>
      <div className={style.screen}>
        {isMenuActive && currentMenu === "Main" && !isSelectBtnActive && (
          <Menu selectedItemIndex={selectedItemIndex} />
        )}
        {isMenuActive && currentMenu === "Music" && !isSelectBtnActive && (
          <Music selectedItemIndex={selectedItemIndex} />
        )}
        {isMenuActive && currentMenu === "AllSongs" && <PlaySong />}
        {isMenuActive && currentMenu === "Artists" && <PlaySong />}
        {isMenuActive && currentMenu === "Albums" && <PlaySong />}
        {isMenuActive && currentMenu === "Cover" && <Cover />}
        {isMenuActive && currentMenu === "Games" && <Games />}
        {isMenuActive && currentMenu === "Settings" && <Settings />}
      </div>
    </>
  );
}
