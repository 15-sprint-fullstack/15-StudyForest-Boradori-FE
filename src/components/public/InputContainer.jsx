import { useState } from 'react';
import visibilityOff from '#assets/btn_visibility_off_24px.svg';
import visibilityOn from '#assets/btn_visibility_on_24px.svg';
import styles from '#styles/InputContainer.module.css';

export function InputContainer({
  label,
  type,
  name,
  value,
  onChange,
  onKeyDown,
  placeholder,
  multiline = false,
  error,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const isPassword = type === 'password';
  const errorClass = error ? styles.error : '';

  let field;
  if (multiline) {
    field = (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={errorClass}
      ></textarea>
    );
  } else if (isPassword) {
    field = (
      <span className={styles.inputWrap}>
        <input
          type={isVisible ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          className={errorClass}
        />
        <button
          type="button"
          className={styles.visibilityButton}
          onClick={() => setIsVisible(!isVisible)}
        >
          <img
            src={isVisible ? visibilityOn : visibilityOff}
            alt={isVisible ? '비밀번호 숨기기' : '비밀번호 보이기'}
            width={24}
            height={24}
          />
        </button>
      </span>
    );
  } else {
    field = (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className={errorClass}
      />
    );
  }

  return (
    <label className={styles.inputContainer}>
      <span className={styles.inputTitle}>{label}</span>
      {field}
      <p className={styles.errorParagraph}>{error}</p>
    </label>
  );
}
