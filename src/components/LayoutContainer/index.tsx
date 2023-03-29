import { useEffect, useState } from "react"
import { api } from "@/services/axios/index"
import { useRouter } from 'next/router';
import { Layout, Menu, theme } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import styles from './styles.module.scss';

const { Sider, Content } = Layout;
const primaryMenu = [
  {
    key: '1',
    icon: <UploadOutlined />,
    label: 'Ativos'
  },
  {
    key: '2',
    icon: <UserOutlined />,
    label: 'Ordens de Serviço'
  },
  {
    key: '3',
    icon: <VideoCameraOutlined />,
    label: 'Empresas'
  },
  {
    key: '4',
    icon: <VideoCameraOutlined />,
    label: 'Técnicos'
  }
];

export function LayoutContainer() {
  
  type User = {
    companyId: number;
    email: string;
    id: number;
    name: string;
    unitId: number;
  };
  
  const [users, setUsers] = useState<User[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { token: { colorBgContainer }} = theme.useToken();
 
  const primaryMenu2 = [
    {
      key: '1',
      icon: <UploadOutlined />,
      label: 'Ativos',
      onClick: () => router.push('/assets'),
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'Ordens de Serviço',
      onClick: () => router.push('/workorders')
    },
    {
      key: '3',
      icon: <VideoCameraOutlined />,
      label: 'Empresas',
      onClick: () => router.push('/companies')
    },
    {
      key: '4',
      icon: <VideoCameraOutlined />,
      label: 'Técnicos',
      onClick: () => router.push('/technicians')
    }
  ];

  useEffect(() => {
    chama();
  },[]);

  async function chama() {
    const response = await api.get<User[]>('/users');
    setUsers(response.data);
  }

  return (
    <Layout className={styles.layout}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        className={styles.sider}
      >
        <Menu
          className={styles.menu}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={primaryMenu}
        />
      </Sider>

      <Layout>
        <Content
          className={styles.content}
          style={{ background: colorBgContainer}}
        >
          <h1>Hello World</h1>          
          {/* <table>
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
          </table> */}
        </Content>
      </Layout>
  </Layout>
  )
};