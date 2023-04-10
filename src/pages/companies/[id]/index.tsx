import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from "@/services/axios/index";

type Units = {
  companyId: number;
  id: number;
  name: string;
};

type Companie = {
  id: number;
  name: string;
};

export default function DetailCompanie() {
  const router = useRouter();
  const { id }  = router.query;

  const [companie, setCompanie] = useState<Companie>();
  const [units, setUnits] = useState<Units[]>();

  useEffect(() => {
    async function getCompanie() {
      const response = await api.get<Companie>(`/companies/${id}`);
      setCompanie(response.data);
    };
    async function getUnits() {
      const response = await api.get<Units[]>(`/units`);

      setUnits(response.data);
    };
    getCompanie();
    getUnits();
  },[id]);

  function UserData() {
    if (companie && units) {
      return <div style={{padding: '1rem'}}>
        <h1>Id</h1>
        <span>{companie.name}</span>
        <br/>
        <br/>
        <h1>Nome da Empresa</h1>
        <span>{companie.name}</span>
        <br/>
        <br/>
        <h1>Unidades</h1>
        <ul style={{padding: 'revert'}}>
          {units.map((unit) => (
            <li key={unit.id}>
              {unit.name}
            </li>
          ))}
        </ul>
      </div>
    }
    return <h1>Carregando...</h1>
  }
  
  return (
    <UserData/>
  )
}