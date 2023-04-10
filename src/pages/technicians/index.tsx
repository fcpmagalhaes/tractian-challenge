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
      
      

      {/* <Table
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
        loading={loading}
      >      
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Age" dataIndex="age" key="age"/>
        <Column title="Address" dataIndex="address" key="address"/>
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          
          render={(tags: string[]) => (
            <>
              {tags.map((tag) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <a>Invite {record.lastName}</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table> */}
    </>
  )
}