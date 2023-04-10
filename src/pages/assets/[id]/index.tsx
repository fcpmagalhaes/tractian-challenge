import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from "@/services/axios/index";
import styles from "./styles.module.scss";

import { Image, Divider, Timeline, Descriptions, Badge, Tag, List, Avatar } from 'antd';
import Link from 'next/link';


type Health = {
  status: string;
  timestamp: Date;
};

type HealthHistory = {
  label: string;
  children: string;
  color: string,
};

type Metrics = {
  lastUptimeAt: Date,
  totalCollectsUptime: number;
  totalUptime: number;
};

type Specifications = {
  maxTemp?: number;
  power?: number;
  rpm?: number;
};

type Asset = {
  assignedUserIds: Array<number>;
  companyId: number;
  healthHistory: Array<Health>;
  healthscore: number;
  id: number;
  image: string;
  metrics: Metrics;
  model: string;
  name: string;
  sensors: Array<string>;
  specifications: Specifications;
  status: string;
  unitId: number;
}
type Status = {
  translatedLabel: string;
  colorStatus: string;
}

export default function Asset() {
  const router = useRouter();
  const { id }  = router.query;
  
  const [asset, setAsset] = useState<Asset>();
  const [healthHistory, setHealthHistory] = useState<HealthHistory[]>([]);
  const [status, setStatus] = useState<Status>({} as Status);

  async function getTechnician() {
    const response = await api.get<Asset>(`/assets/${id}`);
    setAsset(response.data);
  };  

  function addZero(num: number){
    if (num <= 9) 
        return "0" + num;
    else
        return num; 
  };

  function formatDate(date: Date) {
    return (
      addZero(date.getDate()).toString() + "/" +
      addZero(date.getMonth()+1).toString() + "/" + 
      date.getFullYear());
  }

  function setStatusData(label: string) {
    let translatedLabel = '';
    let colorStatus = '';
    if (label === 'inOperation') {
      translatedLabel = 'Em Operação';
      colorStatus = 'green';
    }
    if (label === 'inDowntime') {
      translatedLabel = 'Em Parada'
      colorStatus = 'red';
    }
    if (label === 'inAlert') {
      translatedLabel = 'Em Alerta';
      colorStatus = 'orange';
    }
    if (label === 'unplannedStop') {
      translatedLabel = 'Parada Não Planejada';
      colorStatus = 'black';
    }
    if (label === 'plannedStop') {
      translatedLabel = 'Parada Planejada';
      colorStatus = 'blue';
    }
    return {translatedLabel, colorStatus};
  }

  function createHealthHistory(healthData: Array<Health>) {
    const healtMapped = healthData.map((item) => {
      const dateFormated = formatDate(new Date(item.timestamp));
      let label = setStatusData(item.status);
      
      return {
        label: label.translatedLabel,
        children: dateFormated,
        color: label.colorStatus,
      }
    });

    setHealthHistory(healtMapped);
  }

  useEffect(() => {
    getTechnician();
  },[]);

  useEffect(() => {
    if (asset) {
      createHealthHistory(asset.healthHistory);
      setStatus(setStatusData(asset.status));
    }
  },[asset]);

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
  
  return ( 
    asset ? (
      <>
        <div className={styles.container}>
          <Image
            height={200}
            src={asset.image}
            fallback="/images/asset-img-error.png"
            alt="asset image"
          />
          {/* <Divider orientation="center">Presets</Divider> */}
          <Divider />

          <Descriptions title={asset.name} layout="vertical" bordered>
            <Descriptions.Item label="Modelo">{asset.model}</Descriptions.Item>
            <Descriptions.Item label="Sensores">
              {asset.sensors.map((sensor: string, index: number) => <Tag color='processing' key={index}>{sensor}</Tag>)}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <Badge color={status.colorStatus} text={status.translatedLabel} />
            </Descriptions.Item>
            <Descriptions.Item label="Empresa">{asset.companyId}</Descriptions.Item>
            <Descriptions.Item label="Unidade">{asset.unitId}</Descriptions.Item>
          </Descriptions>

          <Divider />

          <List
            header={<h1>Técnicos Notificados</h1>}
            itemLayout="horizontal"
            dataSource={asset.assignedUserIds}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
                  title={<Link href={`/technicians/${item}`}>{item}</Link>}
                  description={`Email: `}
                />
              </List.Item>
            )}
          />

          <Divider />

          <Timeline
            mode={'left'}
            items={healthHistory}
          />
          
          <Divider />

        </div>
      </>
    ) :
    <h1>Carragando...</h1>
  )
}