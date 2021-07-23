import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import { getProyectsApi } from '../../../api/portfolio';
import './Portfolio.scss';

const Portfolio = () => {
    const [imgProyects, setImgProyects ] = useState([]);

    useEffect(() => {
        getProyectsApi()
            .then(response => {
                setImgProyects(response.proyects)
            })
    }, [])

    return ( 
        <Row className="reviews-portfolio">
                <Col lg={4}/>
                <Col lg={16} className="reviews-portfolio__title">
                    <h2>Portfolio</h2>
                    <h3>
                    Algunos desarrollos que fui realizando durante mi aprendizaje
                    </h3>
                </Col>
                <Col lg={4}/>
            <Row>
                <Col lg={4}/>
                <Col lg={16}>
                    <Row justify="center" className="reviews-portfolio__preview">
                        {imgProyects.map((proyect) => (
                            <Image key={proyect._id} src={proyect.img} alt={proyect.subtitle} placeholder="hola" />
                        ))}
                    </Row>
                </Col>
                <Col lg={4}/>
                <Col lg={24} className="reviews-portfolio__more">
                <Link to="/portfolio">
                    <Button>Más información</Button>
                </Link>
            </Col>
            </Row>
        </Row>
        );
}
export default Portfolio;