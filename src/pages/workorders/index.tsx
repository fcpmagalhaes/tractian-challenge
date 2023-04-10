import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { api } from "@/services/axios/index";
import { Table } from 'antd';
import { PageTitle } from "@/components/PageTitle";

import { useSelector, useDispatch } from 'react-redux';
import { Creators } from '@/store/painel/actions';
const { Column } = Table;

type Workorders = {
  assetId: number;
  id: number;
  priority: string;
  status: string;
  title: string;
}

export default function Workorders() {

  const [workorders, setWorkorders] = useState<Workorders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function getTechnicians() {
      const response = await api.get<Workorders[]>('/workorders');
      setWorkorders(response.data);
      setLoading(false);
    };
    getTechnicians();
    
  },[]);

  const { workOrders } = useSelector((state) => {
    return state.painel;
  });

  useEffect(() => {
    dispatch(Creators.loadWorkOrders());
  }, []);

  useEffect(() => {
    if(workOrders) {
      console.log('workOrders', workOrders);
    }
  }, [workOrders]);

  return (
    <>
      <PageTitle title={"Órdens de Serviço"}/>
        <Table
        dataSource={workorders}
        pagination={{ pageSize: 3 }}
        scroll={{ x: true }}
        loading={loading}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              router.push(`/workorders/${record.id}`);
              
            },
          };
        }}
        >
          <Column title="Ativo" dataIndex="assetId" key="assetId" />
          <Column title="Título" dataIndex="title" key="title" />
          <Column title="Status" dataIndex="status" key="status" />
          <Column title="Prioridade" dataIndex="priority" key="priority" />
        </Table>
    </>
  )
}