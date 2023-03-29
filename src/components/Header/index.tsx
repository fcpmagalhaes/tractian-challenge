import styles from './styles.module.scss';
import Image from 'next/image';
import { Welcome } from '../Welcome'
export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img className={styles.headerLogo} src="/images/tractian-logo.svg" alt="Tractian Logo"/>
        <Welcome/>
      </div>
    </header>
  )
}