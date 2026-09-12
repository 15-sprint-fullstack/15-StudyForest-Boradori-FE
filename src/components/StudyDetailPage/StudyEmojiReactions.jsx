import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Tag } from '#publicComponents';
import smileIcon from '../../assets/ic_smile.svg';
import styles from './StudyEmojiReactions.module.css';

export function StudyEmojiReactions({ emojis, onEmojiSelect }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  function handleSelect(emojiData) {
    onEmojiSelect(emojiData);
    setIsPickerOpen(false);
  }

  return (
    <div className={styles.emojiList}>
      {emojis.map((item) => (
        <button
          key={item.id}
          type="button"
          className={styles.emojiReactionButton}
          aria-pressed={item.isSelected}
          onClick={() => handleSelect(item)}
        >
          <Tag emoji={item.emoji} count={item.count} />
        </button>
      ))}

      <button
        type="button"
        className={styles.addEmojiButton}
        aria-expanded={isPickerOpen}
        onClick={() => setIsPickerOpen((isOpen) => !isOpen)}
      >
        <img src={smileIcon} alt="" width={16.125} height={16.125} />
        <span>추가</span>
      </button>

      {isPickerOpen && (
        <div
          className={styles.emojiPickerPanel}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setIsPickerOpen(false);
            }
          }}
        >
          <EmojiPicker
            width={306}
            height={392}
            emojiStyle="native"
            previewConfig={{ showPreview: true }}
            onEmojiClick={handleSelect}
          />
        </div>
      )}
    </div>
  );
}