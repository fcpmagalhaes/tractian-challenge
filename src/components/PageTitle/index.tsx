import styles from './styles.module.scss';

type Title = {
  title: string;
};

export function PageTitle({title}: Title) {
  
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
    </div>
  )
}