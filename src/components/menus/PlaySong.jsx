import style from "./menu.module.css"
import nowPlaying from "./nowPlaying.png"

export default function PlaySong() {
  return (
    <div className={style.menuItem}>
      <img src={nowPlaying} alt="Dummy" className={style.nowPlayingImg} />
    </div>
  );
}