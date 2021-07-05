import React, { useState, useEffect } from 'react';
import { Switch, List, Button, Modal as ModalAntd, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditMenuWebForm from '../EditMenu';
import AddMenuWebForm from '../AddMenu';
import { deleteMenuApi, activeMenuApi } from '../../../../api/menu';
import { getAccToken } from '../../../../api/auth';
import Modal  from '../../../Modal';
import './MenuList.scss';

const { confirm } = ModalAntd;

const MenuWebList = (props) => {
    const { menu, setReloadMenu } = props;
    const [ listItems, setListItems ] = useState([]);
    const [ isVisible, setIsVisible ] = useState(false);
    const[ modalTitle, setModalTitle ] = useState('');
    const [ modalContent, setModalContent ] = useState(null);

    useEffect(() => {
        const listItemsArray = [];

        menu.forEach(item => {
            listItemsArray.push({
                content: (<div><p>{item.title}</p></div>)
            })
        });
        setListItems(listItemsArray)
    }, [menu])

    const activateMenu = (menu, status) => {
        const accesToken = getAccToken();
        activeMenuApi(accesToken, menu._id, status)
            .then(response => {
                notification["success"]({
                    message: response
                });
            });
    };

    const newMenuModal = () => {
        setIsVisible(true);
        setModalTitle('Crear nuevo menú');
        setModalContent(
            <AddMenuWebForm
                setIsVisible={setIsVisible}
                setReloadMenu={setReloadMenu}
            />
        );
    };

    const editMenuWebModal = menu => {
        setIsVisible(true);
        setModalTitle(`Editanto menú: ${menu.title}`);
        setModalContent(
            <EditMenuWebForm
                setIsVisible={setIsVisible}
                setReloadMenu={setReloadMenu}
                menu={menu}
            />
        );
    }

    const deleteMenu = menu => {
        const accessToken = getAccToken();

        confirm({
            title:'Eliminando Menú',
            content:`Estas seguro de eliminar el menú ${menu.title}?`,
            okText:"Eliminar",
            okType:"danger",
            cancelText:"Cancelar",
            onOk() {
                deleteMenuApi(accessToken, menu._id)
                    .then(response => {
                        notification['success']({
                            message: response
                        });
                        setReloadMenu(true);
                    })
                    .catch(() => {
                        notification['error']({
                            message: 'Error en el servidor.'
                        })
                    })
            }
        })
    }



    return ( 
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={newMenuModal}>Nuevo menú</Button>
            </div>

            <div className="menu-web-list__items">
                {menu.map((menus) => (
                    <List.Item
                        actions={[
                            <Switch defaultChecked={menus.active} onChange={e => activateMenu(menus, e)} />,
                            <Button 
                                type="primary"
                                onClick={() => editMenuWebModal(menus)}
                            ><EditOutlined /></Button>,
                            // <Button 
                            //     type="danger"
                            //     //onClick={desactiveUser}
                            // ><StopOutlined /></Button>,
                            <Button 
                                type="danger"
                                onClick={() => deleteMenu(menus)}
                            ><DeleteOutlined /></Button>
                        ]}
                    >
                        <List.Item.Meta 
                            title={`
                                ${menus.title ? menus.title : '...'}
                            `}
                            description={menus.url}
                        />
                    </List.Item>
                ))}            
            </div>

            <Modal
                title={modalTitle}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            >
                {modalContent}
            </Modal>
        </div>
    );
}

export default MenuWebList;