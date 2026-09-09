import axios from 'axios';
import { API_BASE_URL } from '../constants/ApiUrl';

export const getStudies = async ({
  page = 1,
  limit = 6,
  sort = 'desc',
  sortBy = 'point',
  keyword = '',
}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/studies`, {
      params: {
        page,
        limit,
        sort,
        sortBy,
        keyword,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('스터디 조회에 실패했습니다.', {
      cause: error,
    });
  }
};

export async function getStudy(studyId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/studies/${studyId}`);

    const study = response.data.data;
    console.log(response.data);
    if (!study) {
      throw new Error('스터디를 찾을 수 없습니다.');
    }

    return {
      id: study.id,
      nickname: study.nickname,
      name: study.name,
      description: study.description,
      background: study.background,
      point: study.point,
      password: study.password,
    };
  } catch (error) {
    throw new Error('스터디 조회에 실패했습니다.', {
      cause: error,
    });
  }
}

export const createStudy = async (postData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/studies`, postData);
    return response.data;
  } catch (error) {
    throw new Error('스터디 생성에 실패했습니다.', { cause: error });
  }
};

export const updateStudy = async (studyId, postData) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/studies/${studyId}`,
      postData,
    );
    return response.data;
  } catch (error) {
    throw new Error('스터디 수정에 실패했습니다.', { cause: error });
  }
};

export const deleteStudy = async (studyId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/studies/${studyId}`);
    return response.data;
  } catch (error) {
    throw new Error('스터디 삭제에 실패했습니다.', { cause: error });
  }
};
