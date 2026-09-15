import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { Tag } from '#publicComponents';
import smileIcon from '../../assets/ic_smile.svg';
import styles from './StudyEmojiReactions.module.css';

export function StudyEmojiReactions({ emojis, onEmojiSelect }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);

  const visibleEmojis = emojis.slice(0, 3);
  const hiddenEmojis = emojis.slice(3);

  function handleSelect(emojiData) {
    onEmojiSelect(emojiData);
    setIsPickerOpen(false);
    setIsOverflowOpen(false);
  }

  function renderReaction(item) {
    return (
      <button
        key={item.id}
        type="button"
        className={styles.emojiReactionButton}
        aria-pressed={item.isSelected}
        onClick={() => handleSelect(item)}
      >
        <Tag emoji={item.emoji} count={item.count} />
      </button>
    );
  }

  return (
    <div
      className={styles.emojiList}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setIsPickerOpen(false);
          setIsOverflowOpen(false);
        }
      }}
    >
      <div className={styles.reactionGroup}>
        {visibleEmojis.map(renderReaction)}

        {hiddenEmojis.length > 0 && (
          <button
            type="button"
            className={styles.moreButton}
            aria-expanded={isOverflowOpen}
            onClick={() => setIsOverflowOpen((isOpen) => !isOpen)}
          >
            <Tag
              emoji="+"
              count={`${hiddenEmojis.length}..`} 
            />
          </button>
        )}

        {isOverflowOpen && hiddenEmojis.length > 0 && (
          <div className={styles.overflowPanel}>
            {hiddenEmojis.map(renderReaction)}
          </div>
        )}
      </div>

      <div className={styles.pickerAnchor}>
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
          <div className={styles.emojiPickerPanel}>
            <EmojiPicker
              width="100%"
              height={392}
              emojiStyle="native"
              previewConfig={{ showPreview: true }}
              onEmojiClick={handleSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
}
