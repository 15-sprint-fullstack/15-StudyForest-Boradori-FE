import { useEffect, useState } from 'react';
import { emojiApi } from '../api/emojiApi';

function toEmojiItem(serverEmoji, isSelected = false) {
  return {
    id: serverEmoji.id,
    emoji: serverEmoji.emojiType,
    count: serverEmoji.count,
    isSelected,
  };
}

export function useEmojis(studyId) {
  const [emojis, setEmojis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!studyId) return;

    let ignore = false;

    async function fetchEmojis() {
      setIsLoading(true);
      setError(null);

      try {
        const serverEmojis = await emojiApi.getEmojis(studyId);

        if (!ignore) {
          setEmojis(serverEmojis.map((emoji) => toEmojiItem(emoji)));
        }
      } catch (requestError) {
        if (!ignore) {
          setError(requestError);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchEmojis();

    return () => {
      ignore = true;
    };
  }, [studyId]);

  async function toggleEmoji(emojiType) {
    if (!studyId || isLoading || isUpdating) return;

    const currentEmoji = emojis.find((item) => item.emoji === emojiType);
    const shouldRemove = currentEmoji?.isSelected === true;

    setIsUpdating(true);
    setError(null);

    try {
      const serverEmoji = shouldRemove
        ? await emojiApi.removeEmoji(studyId, emojiType)
        : await emojiApi.addEmoji(studyId, emojiType);

      setEmojis((currentEmojis) => {
        if (serverEmoji === null) {
          return currentEmojis.filter((item) => item.emoji !== emojiType);
        }

        const updatedEmoji = toEmojiItem(serverEmoji, !shouldRemove);

        const exists = currentEmojis.some(
          (item) => item.emoji === emojiType,
        );

        if (!exists) {
          return [...currentEmojis, updatedEmoji];
        }

        return currentEmojis.map((item) =>
          item.emoji === emojiType ? updatedEmoji : item,
        );
      });
    } catch (requestError) {
      setError(requestError);
    } finally {
      setIsUpdating(false);
    }
  }

  return { emojis, isLoading, isUpdating, error, toggleEmoji };
}