import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { 
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PoweroffOutlined
} from '@ant-design/icons';
import Logo from '../../../assets/img/png/logonico.png';
import { logout } from '../../../api/auth';

import './MenuTop.scss';

const MenuTop = (props) => {
    const { menuCollapsed, setMenuCollapser } = props;
    const [ nameUser, setNameUser ] = useState('');

    useEffect(() => {
        setNameUser(localStorage.getItem('dataUser'))
    },[nameUser])

    const logoutUser = () => {
        logout();
        window.location.reload();
    }

    return ( 
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo" src={Logo} alt="Nicolás Romero" />
                <Button type="link" onClick={() => setMenuCollapser(!menuCollapsed)}>
                {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div>
            <div className="menu-top__user">
                <h1>Bienvenido <span>{nameUser}</span></h1>
            </div>
            <div className="menu-top__right">
                <Button 
                    type="link" 
                    onClick={logoutUser}
                ><PoweroffOutlined /></Button>
            </div>
        </div>
    );
}

export default MenuTop;