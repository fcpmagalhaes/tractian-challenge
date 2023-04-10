import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from "@/services/axios/index";
import styles from "./styles.module.scss";

import { Image, Divider, Timeline } from 'antd';

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

export default function Asset() {
  const router = useRouter();
  const { id }  = router.query;

  const [asset, setAsset] = useState<Asset>();
  const [healthHistory, setHealthHistory] = useState<HealthHistory[]>([]);

  useEffect(() => {
    async function getTechnician() {
      const response = await api.get<Asset>(`/assets/${id}`);
      setAsset(response.data);
      console.log('asset', response);
      createHealthHistory(response.data.healthHistory);
    };
    getTechnician();
  },[]);

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


  function createHealthHistory(healthData: Array<Health>) {
    const healtMapped = healthData.map((item) => {
      const dateFormated = formatDate(new Date(item.timestamp));
      let colorStatus = '';
      let label = item.status;
      
      if (label === 'inOperation') {
        label = 'Em Operação';
        colorStatus = 'green';
      }
      if (label === 'inDowntime') {
        label = 'Em Parada'
        colorStatus = 'red';
      }
      if (label === 'inAlert') {
        label = 'Em Alerta';
        colorStatus = 'orange';
      }
      if (label === 'unplannedStop') {
        label = 'Parada Não Planejada';
        colorStatus = 'black';
      }
      if (label === 'plannedStop') {
        label = 'Parada Planejada';
        colorStatus = 'blue';
      }
      
      return {
        label: label,
        children: dateFormated,
        color: colorStatus,
      }
    });
    
    setHealthHistory(healtMapped);
  }
  
  return (
    <div className={styles.container}>
    { asset ? (
      <>
        <Image
          height={200}
          src={asset.image}
          fallback="/images/asset-img-error.png"
          alt="asset image"
        />
        <Divider />
        <Timeline
          mode={'left'}
          items={healthHistory}
        />
      </>
    ) :
    <h1>Carragando...</h1>
    }
    </div>
  )
}