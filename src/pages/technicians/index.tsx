import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { api } from "@/services/axios/index";
import { Table } from 'antd';
import { PageTitle } from "@/components/PageTitle";

const { Column } = Table;

type User = {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
};
export default function Technicians() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  
  useEffect(() => {
    async function getTechnicians() {
      const response = await api.get<User[]>('/users');
      setUsers(response.data);
      setLoading(false);
    };
    getTechnicians();
  },[]);

  

  return (
    <>
      <PageTitle title={"Técnicos"}/>
        <Table
        dataSource={users}
        pagination={{ pageSize: 3 }}
        scroll={{ x: true }}
        loading={loading}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              router.push(`/technicians/${record.id}`);
              
            },
          };
        }}
        >
          <Column title="Nome" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Empresa" dataIndex="companyId" key="companyId" />
          <Column title="Unidade" dataIndex="unitId" key="unitId" />
        </Table>
    </>
  )
}