import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Avatar, Spin } from 'antd';
import { EyeOutlined, GithubOutlined, LoadingOutlined } from '@ant-design/icons';
import './ListPortfolio.scss';

const { Meta } = Card;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ListPortfolio = (props) => {
    const { data } = props;

    return ( 
        <Row className="portfolio-proyect">
            <Col lg={24} className="portfolio-proyect__title">
                <h2>Portfolio</h2>
                <a href="https://github.com/NicooRomero/" className="linkedin" target="_blank" rel="noopener noreferrer"><GithubOutlined /></a>
                <h3>Todos mis proyctos realizados, tanto personales, como de trabajo o en conjuntos a los cursos realizados se encuentran en esta sección.</h3>
            </Col>
            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-proyect">
                    {!data ?
                        (
                            <Spin indicator={antIcon} tip="Cargando proyectos" style={{ textAlign: "center", width: "100%", padding: "20px" }}/>
                        ) :
                        (
                            data.map((proyect) => (
                                <Card
                                    className="portfolio-proyect__card"
                                    style={{ width: 300 }}
                                    cover={
                                    <img
                                        alt={proyect.title}
                                        src={proyect.img}
                                    />
                                    }
                                    actions={[
                                        <a href={proyect.url} className="linkedin" target="_blank" rel="noopener noreferrer"><EyeOutlined /></a>,
                                        <a href={proyect.git} className="linkedin" target="_blank" rel="noopener noreferrer"><GithubOutlined /></a>,
                                    ]}
                                >
                                    <Meta
                                    title={proyect.title}
                                    description={proyect.description}
                                    />
                                </Card>
                            ))
                        )                    
                    }
                </Row>
            </Col>
            <Col lg={4} />
        </Row>
        );
}

export default ListPortfolio;