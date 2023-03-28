import { useEffect, useState } from "react"
import { api } from "@/services/axios/index"
import styles from '@/styles/home.module.scss';
import Head from 'next/head';
import { Button } from 'antd';

export default function Home() {

  type User = {
    companyId: number;
    email: string;
    id: number;
    name: string;
    unitId: number;
  };

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    chama();
  },[]);

  async function chama() {
    const response = await api.get<User[]>('/users');
    setUsers(response.data);
  }

  return (
    <>
    <Head><title>TRACTIAN | Painel de Gerência</title></Head>
      <h1 className={styles.title}>hello <span>world</span></h1>
      <Button type="primary">Button</Button>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.companyId}</td>
                  <td>{user.unitId}</td>
                </tr>
            )})}
          </tbody>
        </table>
    </>
  )
}
