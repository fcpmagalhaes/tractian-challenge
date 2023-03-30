import { useEffect, useState } from "react"
import { api } from "@/services/axios/index"

export default function Technicians() {
   type User = {
    companyId: number;
    email: string;
    id: number;
    name: string;
    unitId: number;
  };

  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    async function getTechnicians() {
      const response = await api.get<User[]>('/users');
      setUsers(response.data);
    };
    getTechnicians();
  },[]);

  return (
    <>
      <h1>Técnicos</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.companyId}</td>
                <td>{user.unitId}</td>
              </tr>
          )})}
        </tbody>
      </table>
    </>
  )
}