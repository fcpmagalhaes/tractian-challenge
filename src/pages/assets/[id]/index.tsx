import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { api } from "@/services/axios/index";
import { 
  Image, 
  Divider, 
  Timeline,
  Descriptions,
  Badge,
  Tag,
  List,
  Avatar,
  Row,
  Col
} from 'antd';
import { setStatusData } from '@/utils/status';
import { formatDate } from '@/utils/date';
import { donutChart, barChart } from '@/utils/chartDefault';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import styles from "./styles.module.scss";


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

export default function DetailAsset() {
  const router = useRouter();
  const { id }  = router.query;
  
  const [asset, setAsset] = useState<Asset>();
  const [healthHistory, setHealthHistory] = useState<HealthHistory[]>([]);
  const [status, setStatus] = useState<Status>({} as Status);
  const [lastUptime, setLastUptime] = useState('');
  const [metricChart, setMetricChart] = useState(barChart);
  const [healthChart, setHealthChart] = useState(donutChart);

  async function getAssets() {
    const response = await api.get<Asset>(`/assets/${id}`);
    setAsset(response.data);
  };

  function createHealthHistory(healthData: Array<Health>) {
    const healtMapped = healthData.map((item) => {
      const dateFormated = formatDate(new Date(item.timestamp));
      const {translatedLabel, colorStatus} = setStatusData(item.status);
      return {
        label: translatedLabel,
        children: dateFormated,
        color: colorStatus,
      }
    });

    setHealthHistory(healtMapped);
  }

  function updateCharts(asset: Asset) {
    const donutSeries = [{
      name: 'Nível',
      data: [{
        color: '#3498db',
        radius: '112%',
        innerRadius: '88%',
        y: asset.healthscore,
      }],
    }];

    const barSeries = [
      {
        name: 'Tempo Total de Atividade',
        data: [asset.metrics.totalUptime],
        color: '#6AA5E7',
        index: 2
      },
      {
        name: 'Tempo Total de Coleta',
        data: [asset.metrics.totalCollectsUptime],
        color: '#6C6DE3',
        index: 0
      }
    ];

    setHealthChart(existingValues => ({
      ...existingValues,
      series: donutSeries,
    }));

    setMetricChart(existingValues => ({
      ...existingValues,
      series: barSeries,
    }));
  }

  useEffect(() => {
    highchartsMore(Highcharts);
    solidGauge(Highcharts);
    getAssets();
  },[]);

  useEffect(() => {
    if (asset) {
      createHealthHistory(asset.healthHistory);
      setStatus(setStatusData(asset.status));
      setLastUptime(formatDate(new Date(asset.metrics.lastUptimeAt)));
      updateCharts(asset);
    }
  },[asset]);

  
  return (
    asset ? (
      <div className={styles.container}>
        <Row justify="space-between" align="middle">
          <Col xs={24} md={12} lg={8}>
            <Image
              height={200}
              src={asset.image}
              fallback="/images/asset-img-error.png"
              alt="asset image"
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <HighchartsReact highcharts={Highcharts} options={healthChart} />
          </Col>
        </Row>
        
        <Row>
          <Col xs={24}>
            <Descriptions title={asset.name} layout="vertical" bordered>
              <Descriptions.Item label="Modelo">{asset.model}</Descriptions.Item>
              <Descriptions.Item label="Sensores">
                {asset.sensors.map((sensor: string, index: number) => <Tag color='processing' key={index}>{sensor}</Tag>)}
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={2}>
                <Badge color={status.colorStatus} text={status.translatedLabel} />
              </Descriptions.Item>
              <Descriptions.Item label="Último Tempo de Atividade">{lastUptime}</Descriptions.Item>
              <Descriptions.Item label="Empresa">{asset.companyId}</Descriptions.Item>
              <Descriptions.Item label="Unidade">{asset.unitId}</Descriptions.Item>
              <Descriptions.Item label="Temperatura Máxima">
                {asset.specifications.maxTemp ? `${asset.specifications.maxTemp}°C`: '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Potência">
                {asset.specifications.power ? `${asset.specifications.power}kWh`: '-'}
              </Descriptions.Item>
              <Descriptions.Item label="RPM">
                {asset.specifications.rpm ? `${asset.specifications.rpm}`: '-'}
                {asset.specifications.rpm}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        
        <Divider orientation="left">Indicadores</Divider>
        
        <Row justify="space-around" align="middle">
          <Col xs={24} md={8}>
            <Timeline
              mode={'left'}
              items={healthHistory}
            />
          </Col>
          <Col xs={24} md={16}>
            <HighchartsReact highcharts={Highcharts} options={metricChart} />
          </Col>
        </Row>

        <Divider orientation="left">Técnicos Notificados</Divider>

        <Row>
          <Col xs={24} md={12}>
            <List
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
          </Col>
        </Row>
      </div>
    ) :
    <h1>Carragando...</h1>
  )
}