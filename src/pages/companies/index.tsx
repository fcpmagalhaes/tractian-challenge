import { useEffect, useState } from "react";
import { api } from "@/services/axios/index";
import { PageTitle } from "@/components/PageTitle";
import { TableData } from "@/components/TableData";

type Companie = {
  id: number;
  name: string;
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

export default function Companies() {

  const [companies, setCompanies] = useState<Companie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
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
      <PageTitle title={'Empresas'}/>
        <TableData
          tableColumns={columns}
          data={companies}
          clicable
          urlPath={'companies'}
          loading={loading}
        />
    </>
  )
}