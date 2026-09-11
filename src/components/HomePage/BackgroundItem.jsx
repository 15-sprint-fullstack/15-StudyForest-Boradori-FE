import stickerSelected from '../../assets/stickers/sticker-empty.svg';
import { getBackgroundImage } from '../../utils/get-background-image';
import style from './BackgroundItem.module.css';

const BackgroundItem = ({ background, isSelected, onClick }) => {
  return (
    <div onClick={onClick} className={style.BackgroundItem}>
      <img
        className={style.background_img}
        src={getBackgroundImage(background)}
      />
      {isSelected && <img className={style.sticker} src={stickerSelected} />}
    </div>
  );
};

export default BackgroundItem;
