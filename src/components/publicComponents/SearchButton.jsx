import { useState } from 'react';
import styles from '#styles/SearchButton.module.css';

export function SearchButton({ search }) {
  const [inputData, setInputData] = useState('');

  const handleInput = (event) => {
    if (event.key === 'Enter') {
      search(inputData);
      setInputData('');
    }
  };
  return (
    <div className={styles.inputSide}>
      <img src="src\assets\ic_search.svg" alt="돋보기" />
      <input
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        onKeyDown={handleInput}
        placeholder="검색"
        className={styles.input}
      />
    </div>
  );
}
