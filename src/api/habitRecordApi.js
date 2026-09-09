import axios from 'axios';
import { API_BASE_URL } from '../constants/ApiUrl';

async function getHabitRecords(studyId) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/studies/${studyId}/habit-records`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createHabitRecord(studyId, habitId, data) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/studies/${studyId}/habit-records/${habitId}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateHabitRecord(habitId, data) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/studies/habit-records/${habitId}`,
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
      `${API_BASE_URL}/studies/habit-records/${habitRecordId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const habitRecordApi = {
  getHabitRecords,
  createHabitRecord,
  updateHabitRecord,
  deleteHabitRecord,
};
