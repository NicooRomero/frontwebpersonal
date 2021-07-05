import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';
import MenuTop from '../components/Web/MenuTop';

import './LayoutWeb.scss';

const LayoutWeb = ({routes}) => {

    return (
        <>
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <MenuTop />
                </Col>
                <Col lg={4} />
            </Row>
            <LoadRoutes routes={routes} />
            <h1>footer</h1>
        </>
    );
}

function LoadRoutes({routes}) {

    return (
        <Switch>
            {routes.map((route, index) => (
            <Route 
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
            />
            ))}
        </Switch>
    )
}
export default LayoutWeb;