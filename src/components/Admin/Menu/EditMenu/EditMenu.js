import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import { updateMenuApi } from '../../../../api/menu';
import { getAccToken } from '../../../../api/auth';
import './EditMenu.scss';

const EditMenuWebForm = (props) => {
    
    const { setIsVisible, setReloadMenu, menu } = props;
    const [ menuWebData, setMenuWebData ] = useState(menu);

    useEffect(() => {
        setMenuWebData(menu);
    }, [menu]);

    const editMenu = e => {
        
        if(!menuWebData.title || !menuWebData.url) {
            notification['error']({
                message: 'Todos los campos son obligatorios.'
            })
        } else {
            const accessToken = getAccToken();

            updateMenuApi(accessToken, menuWebData._id, menuWebData)
                .then(response => {
                    notification['success']({
                        message: response
                    });
                    setIsVisible(false);
                    setReloadMenu(true);
                })
                .catch(() => {
                    notification['error']({
                        message: 'Error en el servidor.'
                    })
                })
        }
    }

    return ( 
        <div className="edit-menu-web-form">
            <EditForm menuWebData={menuWebData} setMenuWebData={setMenuWebData} editMenu={editMenu} />
        </div>
    );
}

function EditForm(props) {
    const { menuWebData, setMenuWebData, editMenu } = props;

    return (
        <Form className="form-edit" onFinish={editMenu}>
            <Form.Item>
                <Input 
                    prefix={<FontSizeOutlined />}
                    placeholder="Titulo"
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({ ...menuWebData, title: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LinkOutlined />}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">Actualizar</Button>
            </Form.Item>
        </Form>
    )
}

export default EditMenuWebForm;