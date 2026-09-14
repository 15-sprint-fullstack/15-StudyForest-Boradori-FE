import axios from 'axios';
import { API_BASE_URL, TEST_BASE_URL } from '../constants/ApiUrl';

// studies 가져와서 실행함. 음. 다른 곳들도 이거 들고와서 하면 되려나?

export async function checkAccess(studyId) {
  try {
    const response = await axios.get(
      `${TEST_BASE_URL}/studies/${studyId}/access`,
      {
        withCredentials: true,
      },
    );
    console.log(response);
    return true;
  } catch (error) {
    if (
      error.response?.status === 403 &&
      error.response?.data?.code === 'STUDY_ACCESS_REQUIRED'
    ) {
      return false;
    }
    throw error;
  }
}

export async function verifyPassword(studyId, password) {
  try {
    const response = await axios.post(
      `${TEST_BASE_URL}/studies/${studyId}/access`,
      { password },
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    throw new Error('비밀번호 인증에 실패했습니다.', { cause: error });
  }
}
