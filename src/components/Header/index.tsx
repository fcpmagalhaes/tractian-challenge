import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
export function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
          <img className={styles.headerLogo} src="/images/tractian-logo.svg" alt="Tractian Logo"/>
          <div className={styles.signInButton}>
            <SignInButton/>
          </div>
      </div>
    </div>
  )
}