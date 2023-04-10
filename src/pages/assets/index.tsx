import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { api } from "@/services/axios/index";
import { Space, Table, Tag } from 'antd';
import { PageTitle } from "@/components/PageTitle";

const { Column, ColumnGroup } = Table;

interface DataType {
  id: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

const data: DataType[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    id: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    id: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }
];

type User = {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
};

type Health = {
  status: string;
  timestamp: Date;
};

type Metrics = {
  lastUptimeAt: Date,
  totalCollectsUptime: number;
  totalUptime: number;
};

type Specifications = {
  maxTemp?: number;
  power?: number;
  rpm?: number;
};

type Assets = {
  assignedUserIds: Array<number>;
  companyId: number;
  healthHistory: Array<Health>;
  healthscore: number;
  id: number;
  image: string;
  metrics: Metrics;
  model: string;
  name: string;
  sensors: Array<string>;
  specifications: Specifications;
  status: string;
  unitId: number;
}

export default function Assets() {

  const [assets, setAssets] = useState<Assets[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  
  useEffect(() => {
    async function getAssets() {
      const response = await api.get<Assets[]>('/assets');
      setAssets(response.data);
      setLoading(false);
      console.log('response', response);
    };
    getAssets();
  },[]);

  type T = {
    statusData: string;
  }

  function RenderTag({ statusData }: T ) {
    let color = 'success';
    let description = 'Em Operação';

    if (statusData === 'inAlert') {
      color = 'warning';
      description = 'Em Alerta';
    }
    if (statusData === 'inDowntime') {
      color = 'error';
      description = 'Em Parada';
    }
    return <Tag color={color} key={statusData}>{description}</Tag>
    
  }

  return (
    <>
      <PageTitle title={"Ativos"}/>
        <Table
        dataSource={assets}
        pagination={{ pageSize: 3 }}
        scroll={{ x: true }}
        loading={loading}
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/assets/${record.id}`);
            },
          };
        }}
        >
          <Column title="Nome" dataIndex="name" key="name" />
          <Column title="Modelo" dataIndex="model" key="model" />
          <Column title="Nível de Saúde" dataIndex="healthscore" key="healthscore" />
          <Column title="Empresa" dataIndex="companyId" key="companyId" />
          <Column title="Unidade" dataIndex="unitId" key="unitId" />
          <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status: string) => (
              <RenderTag statusData={status}/>
          )}
        />
        </Table>
    </>
  )
}