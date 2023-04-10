import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';


export function SignInButton() {
  const { data } = useSession();

  
  function UserData() {
    if (data && data.user) {
      return <div className={styles.signOutButton}>
        <strong>{data.user.name}</strong>
        <img src={data.user.image || ''} alt="Foto de perfil"/>
        <FiX
          color="#737380"
          className={styles.closeIcon}
          onClick={() => signOut()}/>
      </div>
    }
    return <button
        type="button"
        className={styles.signInButton}
        onClick={() => signIn('github')}
      >
        Login com GitHub
        <FaGithub/>
      </button>
  }

  return (
    <UserData/>
  )
}