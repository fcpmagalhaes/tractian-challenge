import { useEffect, useState } from 'react';
import { apiGH } from '@/services/axios/index';
import styles from './styles.module.scss';

type User = {
  name: string;
  avatar: string;
};

type ProfileResponse = {
  name: string;
  avatar_url: string; 
};

export function Welcome() {
  const [user, setUser] = useState<User>({} as User);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await apiGH.get<ProfileResponse>('/fcpmagalhaes');
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        });
      } catch(err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
      <div className={styles.container}>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="Foto de perfil" />
      </div>
  )
}