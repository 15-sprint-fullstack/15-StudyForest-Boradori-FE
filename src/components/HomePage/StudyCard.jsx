import { useNavigate } from 'react-router-dom';
import pointIcon from '../../assets/ic_point.svg';
import { getBackgroundImage } from '../../utils/get-background-image';
import style from './StudyCard.module.css';

const NICKNAME_COLOR = {
  1: '#578246',
  2: '#C18E1B',
  3: '#418099',
  4: '#BC3C6A',
};
const DEFAULT_NICKNAME_COLOR = '#578246';

const getDayCount = (createdAt) => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
  return diffDays + 1;
};

const StudyCard = ({
  id,
  nickname,
  name,
  description,
  point,
  background,
  createdAt,
  emojis = [],
}) => {
  const nav = useNavigate();
  const backgroundId = Number(background);
  const isPhoto = backgroundId > 4;
  const nicknameColor = isPhoto
    ? undefined
    : (NICKNAME_COLOR[backgroundId] ?? DEFAULT_NICKNAME_COLOR);

  return (
    <div
      className={`${style.card} ${isPhoto ? style.photoCard : ''}`}
      style={{
        backgroundImage: isPhoto
          ? `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url(${getBackgroundImage(background)})`
          : `url(${getBackgroundImage(background)})`,
      }}
      onClick={() => nav(`/studies/${id}`)}
    >
      <div className={style.head}>
        <div className={style.titleGroup}>
          <p className={style.title}>
            <span
              className={style.nickname}
              style={nicknameColor ? { color: nicknameColor } : undefined}
            >
              {nickname}
            </span>
            의 {name}
          </p>
          <p className={style.day}>{getDayCount(createdAt)}일째 진행 중</p>
        </div>
        <span className={style.point}>
          <img src={pointIcon} width={14} height={14} />
          {point}P 획득
        </span>
      </div>

      <p className={style.description}>{description}</p>

      {emojis.length > 0 && (
        <div className={style.emojiList}>
          {emojis.map((item) => (
            <span key={item.emojiType} className={style.emojiItem}>
              {item.emojiType} {item.count}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyCard;
