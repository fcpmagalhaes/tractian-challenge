import styles from './styles.module.scss';
import Image from 'next/image';
import { SignInButton } from '../SignInButton'
export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img className={styles.headerLogo} src="/images/tractian-logo.svg" alt="Tractian Logo"/>
        <SignInButton/>
      </div>
    </header>
  )
}