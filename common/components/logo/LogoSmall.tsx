import styles from './Logo.module.sass'

export const LogoSmall = () => {

  return (
    <a href="/" className={styles.logoLink}>
      <div className={styles.logoWrapperSmall}>
        <div className={styles.learnMathComWrapperSmall}>
          <p className={styles.learnSmall}>Learn</p>
          <p className={styles.mathComSmall}>-math</p>
          <p className={styles.mathComSmall}>.com</p>
        </div>
      </div>
    </a>
  )
}