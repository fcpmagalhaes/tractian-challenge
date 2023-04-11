import styles from "@/styles/home.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FiLogIn } from "react-icons/fi";

import { Col, Row } from "antd";
import { SignInButton } from "@/components/SignInButton";
import sensor from '../../public/images/analise-vibracao-sensor-tractian.png';

export default function Home() {
  return (
    <div className={styles.container}>
      <Row justify="space-between" align="top">
        <Col xs={24} md={12}>
          <div className={styles.leftText}>
            <div className={styles.title}>
              Painel de Gerência Tractian
            </div>
            <div className={styles.subtitle}>
              Monitore bens, gerencie equipes e manutenções preventivas
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <Image 
            src={sensor}
            alt="Sensor Tractian"
            width={700}
            height={475}
            sizes="100vw"
            className={styles.rightImage}
          />
        </Col>
      </Row>
      <Row justify="start" align="middle">
        <Col xs={24} md={{ span: 9, offset: 1 }}>
          <SignInButton/>
        </Col>
      </Row>
    </div>
  )
}
