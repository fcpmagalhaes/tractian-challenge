import { useState } from "react";
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
    key: 'assets',
    icon: <UploadOutlined />,
    label: 'Ativos'
  },
  {
    key: 'workorders',
    icon: <UserOutlined />,
    label: 'Ordens de Serviço'
  },
  {
    key: 'companies',
    icon: <VideoCameraOutlined />,
    label: 'Empresas'
  },
  {
    key: 'technicians',
    icon: <VideoCameraOutlined />,
    label: 'Técnicos'
  }
];

export function LayoutContainer({contentPage}: any) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { token: { colorBgContainer }} = theme.useToken();
 
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
          onClick={({key}) => router.push(`${key}`)}
          className={styles.menu}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['assets']}
          items={primaryMenu}
        />
      </Sider>

      <Layout>
        <Content
          className={styles.content}
          style={{ background: colorBgContainer}}
        >
          {contentPage}
        </Content>
      </Layout>
  </Layout>
  )
};