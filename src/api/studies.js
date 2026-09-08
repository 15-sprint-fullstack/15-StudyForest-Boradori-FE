import axios from 'axios';
import { API_BASE_URL } from '../constants/ApiUrl';

export const getStudies = async ({
  page = 1,
  limit = 6,
  sort = 'asc',
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
    throw new Error(error.message, '스터디 조회에 실패했습니다.', {
      cause: error,
    });
  }
};

export const createStudies = async (postData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/studies`, postData);
    return response.data;
  } catch (error) {
    throw new Error('스터디 생성에 실패했습니다.', { cause: error });
  }
};

export const updateStudies = async (id, postData) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/studies/${id}`,
      postData,
    );
    return response.data;
  } catch (error) {
    throw new Error('스터디 수정에 실패했습니다.', { cause: error });
  }
};

export const deleteStudies = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/studies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('스터디 삭제에 실패했습니다.', { cause: error });
  }
};
