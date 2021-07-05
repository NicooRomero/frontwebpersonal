import React from 'react';
import { Row, Col } from 'antd';
import './MainBanner.scss';

const MainBanner = () => {
    return ( 
        <div className="main-banner">
            <div className="main-banner__dark">
                <Row>
                    <Col lg={4} />
                    <Col lg={16}>
                        <h2>Desarrollador Web<br />FullStack jr.</h2>
                        <h3>Autodidacta, en constante crecimiento y capacitación, en relación  {" "}
                        <br />
                        con el desarrollo Front-end & Back-end.
                        </h3>
                    </Col>
                    <Col lg={4} />
                </Row>
            </div>
        </div>
        );
}

export default MainBanner;