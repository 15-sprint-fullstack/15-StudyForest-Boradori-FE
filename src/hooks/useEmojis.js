import { useEffect, useState } from "react";
import { emojiApi } from "../api/emojiApi";


//서버 데이터를 이모지 컴포넌트에서 사용하는 형식으로 바꿈
function toEmojiItem(serverEmoji) {
  return {
    id: serverEmoji.id,
    emoji: serverEmoji.emojiType,
    count: serverEmoji.count,
    isSelected: false,
  }
}

//해당 스터디 이모지 목록과 조회 상태 관리
export function useEmojis(studyId) {
  const [emojis, setEmojis] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    if(!studyId) return

    let ignore = false

    async function fetchEmojis() {
      setIsLoading(true)
      setError(null)

      try {
        const serverEmojis = await emojiApi.getEmojis(studyId)
        
        if(!ignore) {
          setEmojis(serverEmojis.map(toEmojiItem)) //화면 형식으로 변환해 저장
        }
      } catch(requestError) {
        if(!ignore) {
          setError(requestError) 
        }
      } finally {
        if(!ignore) {
          setIsLoading(false)
        }
      }
    }

    fetchEmojis()

    return () => {
      ignore =true
    }
  }, [studyId])

  return {emojis, isLoading, error}
}
