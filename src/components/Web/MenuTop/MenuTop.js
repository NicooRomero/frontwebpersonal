import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMenuApi } from '../../../api/menu';
import { LinkedinFilled } from '@ant-design/icons';
import './MenuTop.scss';

const MenuTop = () => {
    const [ menuData, setMenuData ] = useState([]);

    useEffect(() => {
        getMenuApi().then(response => {
            const arrayMenu = [];
            response.menu.forEach(item => {
                if(item.active) {
                    arrayMenu.push(item);
                }
            });
            setMenuData(arrayMenu);
        });
    }, [])

    return ( 
        <div className="menu-top-web" mode="horizontal">
            <div className="menu-top-web__logo">
                <Link to={'/'}>
                    <h1>Nicolás Romero</h1>
                </Link>
            </div>

            <div className="menu-top-web__menus">
                {menuData.map(item => {
                const external = item.url.indexOf('http') > -1 ? true : false;

                if(external) {
                    return (
                        <div key={item._id} className="men-top-web__item">
                            <a href={item.url} target="_blank" rel="noopener noreferrer" >{item.title}</a>
                        </div>
                    )
                }

                return (
                    <div key={item._id} className="menu-top-web__item">
                        <a href={item.url}>{item.title}</a>
                    </div>
                )
                })}
            </div>

            <div>
                <SocialLinks /> 
            </div>
            
        </div>
    );
}

const SocialLinks = () => {
    return ( 
        <div className="social-links">
            <a href="https://www.linkedin.com/in/nicooromero" className="linkedin" target="_blank" rel="noopener noreferrer">
                <LinkedinFilled />
            </a>
            
        </div>
    );
}

export default MenuTop;