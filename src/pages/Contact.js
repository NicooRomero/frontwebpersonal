import React from 'react';
import { Row, Col } from 'antd';
import ContactForm from '../components/Web/Contacto/ContactForm';

const Contact = () => {
    return ( 
        <Row className="portfolio-proyect">
            <Col lg={24} className="portfolio-proyect__title">
                <h2>Contacto</h2>
                <h3>Todos los medios disponibles para contactarme</h3>
            </Col>
            <Col lg={4} />
            <Col lg={16}>
                <Row>
                    <ContactForm />
                </Row>
            </Col>
            <Col lg={4} />
        </Row>
    );
}

export default Contact;