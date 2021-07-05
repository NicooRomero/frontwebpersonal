import React from 'react';
import { Row, Col, Card, Avatar } from 'antd';
import perfil from '../../../assets/img/jpg/perfil.jpg'
import './About.scss';

const About = () => {
    return ( 
        <Row className="about-section">
                <Col lg={4}/>
                <Col lg={16} className="about-section__title">
                    <h2>Información sobre mi perfil</h2>
                </Col>
                <Col lg={4}/>
            <Row>
                <Col lg={4}/>
                <Col lg={16}>
                    <Row className="row-cards">
                            <CardReview name="Nicolás Romero" subtitle="Santiago del Estero, Argentina" avatar={perfil} review="Dentro del ámbito de la tecnología informática orientada a aplicaciones y entornos web poseo conocimientos en desarrollo/diseño web, lenguajes de programación, base de datos, servidores, API’s y Sistemas de Control de Versiones." 
                            review2="Mi objetivo principal es desarrollarme profesionalmente y evolucionar en mi sector, de modo que busco oportunidades que me permitan hacerlo, al tiempo que trataré de alinearme completamente con los objetivos de la empresa."
                            />                        
                    </Row>
                </Col>
                <Col lg={4}/>
            </Row>
        </Row>
        );
}

function CardReview(props) {
    const { name, subtitle, avatar, review, review2 } = props;
    const { Meta } = Card;

    return (
        <Card className="about-section__card">
            <Meta
                avatar={<Avatar src={avatar} />}
                title={name}
                description={subtitle}
            />
            <p>{review}</p>
            <p>{review2}</p>
        </Card>
    );
}

export default About;