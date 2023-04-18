import { useRouter } from 'next/router';
import { Table } from 'antd';

type Columns = {
  title: string;
  dataIndex: string;
  key: string;
}

type TableProps = {
  tableColumns: Array<Columns>;
  data: Array<any>;
  clicable?: boolean;
  urlPath?: string;
  loading: boolean;
}

export function TableData(props: TableProps) {
  
  const router = useRouter();

  const {tableColumns, data, clicable, urlPath, loading} = props;

  function clickRow(id: number) {
    if(clicable) {
      return {
        onClick: () => {
          router.push(`/${urlPath}/${id}`);
        },
      };
    }
    return {
      onClick: () => {},
    };
  }

  return (
    <Table
      dataSource={data}
      columns={tableColumns}
      pagination={{ pageSize: 3 }}
      scroll={{ x: true }}
      loading={loading}
      onRow={(record) => clickRow(record.id)}
    />
  )
};