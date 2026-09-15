import axios from "axios";
import {API_BASE_URL} from '../constants/ApiUrl.js'

//스터디 이모지 목록 조회
async function getEmojis(studyId) {
  const response = await axios.get(
    `${API_BASE_URL}/studies/${studyId}/emojis`, 
  )

  return response.data.data
}

//이모지 새로 생성 시 만들어지거나 개수 +1
async function addEmoji(studyId, emojiType) {
  const response = await axios.post(
    `${API_BASE_URL}/studise/${studyId}/emojis`,
    {emojiType}, 
  )
  return response.data.data
}

//한번 더 클릭하면 개수를 1 줄이고, 0이되면 이모지 삭제
async function removeEmoji(studyId, emojiType) {
  const response = await axios.delete(
    `${API_BASE_URL}/studies/${studyId}/emojis`,
    {data: {emojiType}},
  )
  return response.data.data
}

export const emojiApi = {
  getEmojis, //모록조회함수
  addEmoji, //추가,증가함수
  removeEmoji //감소,삭제함수
}