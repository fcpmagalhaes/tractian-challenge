import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { api } from "@/services/axios/index";
import {Table, Tag } from 'antd';
import { PageTitle } from "@/components/PageTitle";
import { setStatusData } from '@/utils/status';

const { Column } = Table;

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

  type Status = {
    statusData: string;
  }

  function RenderTag({ statusData }: Status ) {
    const {translatedLabel, colorStatus} = setStatusData(statusData);
    return <Tag color={colorStatus} key={statusData}>{translatedLabel}</Tag>
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