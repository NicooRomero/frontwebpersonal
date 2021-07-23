import React from 'react';
import { Row, Spin, Col, Card, Button, notification } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './ContactBanner.scss';

const ContactBanner = () => {
    return ( 
    <Link to="/contact">
        <Row className="home-contact">
            <div className="row-contact__banner">
                    <h2>Contactarme</h2>
                </div>  
            <Row className="row-contact">
                <div className="row-contact__banner">
                    <h2>Contactarme</h2>
                </div>                
            </Row>
        </Row>
    </Link>
    );
}

export default ContactBanner;