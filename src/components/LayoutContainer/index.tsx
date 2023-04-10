import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Layout, Menu, theme } from 'antd';
import { MdSensors, MdOutlineFactory, MdArrowBack } from 'react-icons/md';
import { GrUserWorker, GrDocumentConfig } from 'react-icons/gr';
import styles from './styles.module.scss';

const { Sider, Content } = Layout;
const primaryMenu = [
  {
    key: 'assets',
    icon: <MdSensors />,
    label: 'Ativos'
  },
  {
    key: 'workorders',
    icon: <GrDocumentConfig />,
    label: 'Ordens de Serviço'
  },
  {
    key: 'companies',
    icon: <MdOutlineFactory />,
    label: 'Empresas'
  },
  {
    key: 'technicians',
    icon: <GrUserWorker />,
    label: 'Técnicos'
  }
];
const backMenu = [
  {
    key: 'back',
    icon: <MdArrowBack />,
    label: 'Voltar'
  },
];

export function LayoutContainer({contentPage}: any) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { token: { colorBgContainer }} = theme.useToken();
  const [menuSelected, setMenuSelected] = useState<string[]>();

  useEffect(() => {
    setMenuSelected([router.pathname.substring(1)]);
  },[router.pathname]);
 
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
          onClick={() => router.back()}
          className={styles.menu}
          theme="dark"
          mode="inline"
          selectedKeys={[]}
          items={backMenu}
        />
        <Menu
          onClick={({key}) => router.push(`/${key}`)}
          className={styles.menu}
          theme="dark"
          mode="inline"
          selectedKeys={menuSelected}
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