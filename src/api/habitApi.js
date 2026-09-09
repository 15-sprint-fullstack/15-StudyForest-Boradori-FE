import axios from 'axios';

const BASE_URL = 'https://one5-studyforest-boradori-be.onrender.com';

async function getHabits(studyId) {
  try {
    const response = await axios.get(`${BASE_URL}/studies/${studyId}/habits`);
    console.log(response, response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createHabit(studyId, data) {
  try {
    const response = await axios.post(
      `${BASE_URL}/studies/${studyId}/habits`,
      data,
    );
    console.log(response, response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateHabit(studyId, habitId, data) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/studies/${studyId}/habits/${habitId}`,
      data,
    );
    console.log(response, response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteHabit(studyId, habitId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/studies/${studyId}/habits/${habitId}`,
    );
    console.log(response, response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const habitApi = { getHabits, createHabit, updateHabit, deleteHabit };
