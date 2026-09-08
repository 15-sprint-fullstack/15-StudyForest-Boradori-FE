import axios from 'axios';

const BASE_URL = 'https://one5-studyforest-boradori-be.onrender.com';

async function createHabitRecord(studyId, habitId, data) {
  try {
    const response = await axios.post(
      `${BASE_URL}/studies/${studyId}/habit-record/${habitId}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteHabitRecord(habitRecordId) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/studies/habit-record/${habitRecordId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const habitRecordApi = {createHabitRecord, deleteHabitRecord};
