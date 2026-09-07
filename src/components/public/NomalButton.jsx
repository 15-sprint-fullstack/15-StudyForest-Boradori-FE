import styles from '#styles/NomalButton.module.css';


export function NomalButton ({children, isClick}) {
    
    return (
        <button onClick={isClick} className={styles.buttonBody}>{children}</button>
    )
}