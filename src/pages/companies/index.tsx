import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { api } from "@/services/axios/index";
import { Table } from 'antd';
import { PageTitle } from "@/components/PageTitle";

const { Column, ColumnGroup } = Table;

type Companie = {
  id: number;
  name: string;
};
export default function Companies() {

  const [companies, setCompanies] = useState<Companie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  
  useEffect(() => {
    async function getCompanies() {
      const response = await api.get<Companie[]>('/companies');
      setCompanies(response.data);
      setLoading(false);
    };
    getCompanies();
  },[]);

  return (
    <>
      <PageTitle title={"Técnicos"}/>
        <Table
        dataSource={companies}
        pagination={{ pageSize: 3 }}
        scroll={{ x: true }}
        loading={loading}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              router.push(`/companies/${record.id}`);
            },
          };
        }}
        >
          <Column title="Nome" dataIndex="name" key="name" />
        </Table>
    </>
  )
}