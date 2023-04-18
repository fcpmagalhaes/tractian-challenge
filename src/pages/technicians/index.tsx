import { useEffect, useState } from "react";
import { api } from "@/services/axios/index";
import { PageTitle } from "@/components/PageTitle";
import { TableData } from "@/components/TableData";

type User = {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
};

const columns = [
  { title: "Nome",
    dataIndex: "name",
    key: "name"
  },
  { title: "Email",
    dataIndex: "email",
    key: "email"
  },
  { title: "Empresa",
    dataIndex: "companyId",
    key: "companyId"
  },
  { title: "Unidade",
    dataIndex: "unitId",
    key: "unitId"
  }
];

export default function Technicians() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
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
      <TableData
        tableColumns={columns}
        data={users}
        clicable
        urlPath={'technicians'}
        loading={loading}
      />
    </>
  )
}