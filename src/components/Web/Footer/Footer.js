import React from 'react';
import { Layout, Row, Col } from 'antd';
import InfoFooter from './InfoFooter';
import NavigationFooter from './Navigation';
import SocialLinks from './SocialLinks';
import './Footer.scss';

const Footer = () => {
    const { Footer } = Layout;

    return ( 
        <Footer className="footer">
            <Row>
                <Col md={4} />
                <Col md={16}>
                    <Row>
                        <Col md={8}><InfoFooter /></Col>
                        <Col md={8}><NavigationFooter /></Col>
                        <Col md={8}><SocialLinks /></Col>
                    </Row>
                    <Row className="footer__copyright">
                        <Col md={12}>© 2021 ALL RIGHTS RESERVED</Col>
                        <Col md={12}>NÍCOLAS ROMERO | DESARROLLADOR WEB JR</Col>
                    </Row>
                </Col>
                <Col md={4} />
            </Row>
        </Footer>    
        );
}

export default Footer;