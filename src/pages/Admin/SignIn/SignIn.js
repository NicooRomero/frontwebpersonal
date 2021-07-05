import React from 'react';
import { Layout, Tabs } from 'antd';
import { Redirect } from 'react-router-dom';
import Logo from '../../../assets/img/png/logonico.png';
import RegForm from '../../../components/Admin/Reg';
import LoginForm from '../../../components/Admin/Login';
import { getAccToken } from '../../../api/auth';

import './SignIn.scss';

const SignIn = () => {

    const { Content } = Layout;
    const { TabPane } = Tabs;

    if(getAccToken()) {
        return <Redirect to="/admin" />
    }

    return ( 
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <img src={Logo} alt="logo web" />
                </h1>
                <div className="sign-in__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Entrar</span>} key="1">
                            <LoginForm />
                        </TabPane>
                        <TabPane tab={<span>Nuevo usuario</span>} key="2">
                            <RegForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    );
}

export default SignIn;