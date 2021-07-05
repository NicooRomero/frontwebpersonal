import React from 'react';
import { Row, Col, Card } from 'antd';
import Icon from '@ant-design/icons';
import Carousel from '../../Carousel';
import './Tecnologias.scss';

const Tecnologias = () => {
    return ( 
        <Row className="tec-ok">
            <Col lg={24} className="tec-ok__title">
                <h2>Algunas de las tecnologías que manejo</h2>
                <h3>
                    Estoy familiarizados con distintos lenguajes y marcos de programación, principalmente:
                </h3>
            </Col>
            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo title="Front-End" subtitle="HTML, CSS3, SASS, JavaScript, React JS, Bootstrap." />
                    </Col>
                    <Col md={8}>
                        <CardInfo title="Back-End" subtitle="PHP, Node JS, Express, JAVA, Python." />
                    </Col>
                    <Col md={8}>
                        <CardInfo title="Base de datos" subtitle="Mongo DB, MySql, PostgreSQL." />
                    </Col>
                </Row>
            </Col>
            <Col lg={4} />
            <Carousel />
        </Row>
        
        );
}

function CardInfo(props){
    const { title, subtitle } = props;
    const { Meta } = Card;

    return (
        <Card className="tec-ok__card">
            <Meta title={title} description={subtitle} />
        </Card>
    );
}

export default Tecnologias;