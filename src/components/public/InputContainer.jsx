import styles from '#styles/InputContainer.module.css';

export function InputContainer({
  label,
  type,
  value,
  onChange,
  onKeyDown,
  placeholder,
  multiline = false,
  error,
}) {
  return (
    <label className={styles.inputContainer}>
      <span className={styles.inputTitle}>{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? styles.error : ''}
        ></textarea>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          className={error ? styles.error : ''}
        />
      )}
      <p className={styles.errorParagraph}>{error}</p>
    </label>
  );
}
