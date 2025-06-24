import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import EmojiPicker from 'emoji-picker-react';

const EmojiPicker = () => {
  const [date, setDate] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
      <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
        😊 Pick Emoji
      </button>

      {showEmojiPicker && (
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      )}

      <div>
        Welcome John Porter 👋 {selectedEmoji && <span>{selectedEmoji}</span>}
      </div>

      <Calendar
        value={date}
        onChange={(e) => setDate(e.value)}
        inline
        showWeek
      />
    </>
  );
};

export default EmojiPicker;
