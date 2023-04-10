import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from "@/services/axios/index";

type User = {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
};

export default function DetailTechnician() {
  const router = useRouter();
  const { id }  = router.query;

  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getTechnician() {
      const response = await api.get<User>(`/users/${id}`);
      setUser(response.data);
    };
    getTechnician();
  },[id]);

  function UserData() {
    if (user) {
      return <div style={{padding: '1rem'}}>
        <h1>Id</h1>
        <span>{user.id}</span>
        <br/>
        <br/>
        <h1>Nome</h1>
        <span>{user.name}</span>
        <br/>
        <br/>
        <h1>Email</h1>
        <span>{user.email}</span>
        <br/>
        <br/>
        <h1>Empresa</h1>
        <span>{user.companyId}</span>
        <br/>
        <br/>
        <h1>Unidade</h1>
        <span>{user.unitId}</span>
      </div>
    }
    return <h1>Carregando...</h1>
  }
  
  return (
    <UserData/>
  )
}