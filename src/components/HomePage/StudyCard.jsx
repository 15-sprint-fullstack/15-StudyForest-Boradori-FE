import { getBackgroundImage } from '../../utils/get-background-image';
import style from './StudyCard.module.css';
import TestButton from './TestButton';
import { useNavigate } from 'react-router-dom';

const StudyCard = ({
  id,
  nickname,
  name,
  description,
  point,
  background,
  createdAt,
}) => {
  const nav = useNavigate();
  return (
    <div className={style.Card}>
      <div onClick={() => nav(`/studies/${id}`)} className={style.img_section}>
        <img src={getBackgroundImage(background)} />
      </div>
      <div onClick={() => nav(`/studies/${id}`)} className={style.info_section}>
        <div className="created_date">
          {new Date(createdAt).toLocaleDateString()}
        </div>
        <div className={style[`img_section_${background}`]}>{nickname}</div>
        <div className="name">{name}</div>
        <div className="description">{description}</div>
        <div className="point">포인트:{point}</div>
      </div>
      <div className={style.button_section}>
        <TestButton onClick={() => nav(`/edit/${id}`)} text={'수정'} />
      </div>
    </div>
  );
};

export default StudyCard;
