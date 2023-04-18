import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { api } from "@/services/axios/index";
import { PageTitle } from "@/components/PageTitle";
import { TableData } from "@/components/TableData";

import { Creators } from '@/store/painel/actions';

type Workorders = {
  assetId: number;
  id: number;
  priority: string;
  status: string;
  title: string;
}

const columns = [
  {
    title: "Ativo",
    dataIndex: "assetId",
    key: "assetId"
  },
  {
    title: "Título",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "Prioridade",
    dataIndex: "priority",
    key: "priority"
  }
];

export default function Workorders() {

  const [workorders, setWorkorders] = useState<Workorders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  
  useEffect(() => {
    async function getTechnicians() {
      const response = await api.get<Workorders[]>('/workorders');
      setWorkorders(response.data);
      setLoading(false);
    };
    getTechnicians();
    
  },[]);

  // const { workOrders } = useSelector((state) => {
  //   return state.painel;
  // });

  useEffect(() => {
    dispatch(Creators.loadWorkOrders());
  }, []);

  return (
    <>
      <PageTitle title={"Órdens de Serviço"}/>
      <TableData
          tableColumns={columns}
          data={workorders}
          clicable
          urlPath={'workorders'}
          loading={loading}
        />
    </>
  )
}