import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from "@/services/axios/index";

type Checklist = {
  completed: boolean,
  task: string
}
type Workorder = {
  assetId: number;
  assignedUserIds: Array<string>;
  checklist: Array<Checklist>;
  description: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}

export default function DetailWorkorder() {
  const router = useRouter();
  const { id }  = router.query;

  const [workorder, SetWorkorder] = useState<Workorder>();

  useEffect(() => {
    async function getTechnician() {
      const response = await api.get<Workorder>(`/workorders/${id}`);
      SetWorkorder(response.data);
    };
    getTechnician();
  },[id]);

  function WorkorderData() {
    if (workorder) {
      return <div style={{padding: '1rem'}}>
        <h1>Id</h1>
        <span>{workorder.id}</span>
        <br/>
        <br/>
        <h1>Título</h1>
        <span>{workorder.title}</span>
        <br/>
        <br/>
        <h1>Descrição</h1>
        <span>{workorder.description}</span>
        <br/>
        <br/>
        <h1>Ativo</h1>
        <span>{workorder.assetId}</span>
        <br/>
        <br/>
        <h1>Prioridade</h1>
        <span>{workorder.priority}</span>
        <br/>
        <br/>
        <h1>Status</h1>
        <span>{workorder.status}</span>
        <br/>
        <br/>
        <h1>Técnicos Notificados</h1>
        <ul style={{padding: 'revert'}}>
          {workorder.assignedUserIds.map((user, index) => (
            <li key={index}>
              {user}
            </li>
          ))}
        </ul>
        <br/>
        <br/>
        <h1>Checklist</h1>
        <ul style={{padding: 'revert'}}>
          {workorder.checklist.map((check: Checklist, index) => (
            <li key={index}>
              {check.task}
            </li>
          ))}
        </ul>
      </div>
    }
    return <h1>Carregando...</h1>
  }
  
  return (
    <WorkorderData/>
  )
}