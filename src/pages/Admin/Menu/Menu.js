import React, { useState, useEffect } from 'react';
import MenuWebList from '../../../components/Admin/Menu/MenuList';
import { getMenuApi } from '../../../api/menu';

const MenuWeb = () => {
    
    const [ menu, setMenu ] = useState([]);
    const [ reloadMenu, setReloadMenu ] = useState(false);

    useEffect(() => {
        getMenuApi().then(response => {
            setMenu(response.menu);
        })
        setReloadMenu(false);
    }, [reloadMenu]);
    console.log(menu);
    return ( 
        <div className="menu-web">
            <MenuWebList menu={menu} setReloadMenu={setReloadMenu} />
        </div>
    );
}

export default MenuWeb;