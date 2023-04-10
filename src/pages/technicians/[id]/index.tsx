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

export default function Tech() {
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
      return <div>
        <h1>Id</h1>
        <span>{user.id}</span>
        <h1>Nome</h1>
        <span>{user.name}</span>
        <h1>Email</h1>
        <span>{user.email}</span>
        <h1>Empresa</h1>
        <span>{user.companyId}</span>
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