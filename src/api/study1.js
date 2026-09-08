//임시 파일입니다.

import axios from 'axios';
import { API_BASE_URL } from '../constants/ApiUrl.js';

export async function getStudy(studyId) {
  const response = await axios.get(`${API_BASE_URL}/studies/${studyId}`);

  const study = response.data.data;

  if (!study) {
    throw new Error('스터디를 찾을 수 없습니다.');
  }

  return {
    id: study.id,
    nickname: study.nickname,
    name: study.name,
    description: study.description,
    point: study.point,
    password: study.password, // 임시로 서버에서 받은 비밀번호도 모달에 전달, 삭제해야됨
  };
}
