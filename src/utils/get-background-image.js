import background1 from './../assets/background1.jpg';
import background2 from './../assets/background2.jpg';
import background3 from './../assets/background3.jpg';
import background4 from './../assets/background4.jpg';
import background5 from './../assets/background5.jpg';
import background6 from './../assets/background6.jpg';
import background7 from './../assets/background7.jpg';
import background8 from './../assets/background8.jpg';

// 배경 이미지를 쉽게 불러오기 위한 모듈
// 단색 1~4

export function getBackgroundImage(backgroundId) {
  switch (backgroundId) {
    case 1:
      return background1;
    case 2:
      return background2;
    case 3:
      return background3;
    case 4:
      return background4;
    case 5:
      return background5;
    case 6:
      return background6;
    case 7:
      return background7;
    case 8:
      return background8;
    default:
      return null;
  }
}
