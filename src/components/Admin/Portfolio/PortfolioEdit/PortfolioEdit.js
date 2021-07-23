import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined, AlignLeftOutlined, FileImageOutlined, GithubOutlined } from '@ant-design/icons';
import { updateProyectApi, addProyectApi } from '../../../../api/portfolio';
import { getAccToken } from '../../../../api/auth';

const PortfolioEdit = (props) => {
    const { setIsVisible, setReloadProyects, proyect } = props;
    const [ proyectData, setProyectData ] = useState({});

    useEffect(() => {
        proyect ? setProyectData(proyect) : setProyectData({});
    }, [proyect]);

    const addProyect = () => {
        if(!proyectData) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            })
        } else {
            const accessToken = getAccToken();

            addProyectApi(accessToken, proyectData)
                .then(response => {
                        notification['success']({
                            message: response.message
                        });
                    setIsVisible(false);
                    setReloadProyects(true);
                    setProyectData({});
                })
                .catch(err => {
                    console.log(err)
                    notification["error"]({
                        message: "Error en el servidor, intente de nuevo más tarde."
                    })
                })
        }
    }

    const updateProyect = () => {
        const accessToken = getAccToken();

        updateProyectApi(accessToken, proyect._id, proyectData)
            .then(response => {
                        notification['success']({
                            message: response.message
                        });
                setIsVisible(false);
                setReloadProyects(true);
                setProyectData({});
            })
            .catch(err => {
                console.log(err)
                notification["error"]({
                    message: "Error en el servidor, intente de nuevo más tarde."
                })
            })
    }


    return ( 
        <div className="add-edit-proyect-form">
            <AddEditForm proyect={proyect} addProyect={addProyect} updateProyect={updateProyect} setProyectData={setProyectData} proyectData={proyectData} />
        </div>
        );
}

function AddEditForm(props) {
    const { proyect, addProyect, updateProyect, setProyectData, proyectData } = props;
    return (
        <Form className="form-add-edit" onFinish={proyect ? updateProyect : addProyect}>
            <Form.Item>
                <Input 
                    prefix={<FontSizeOutlined />}
                    placeholder="Titulo del curso"
                    value={proyectData.title}
                    onChange={e => setProyectData({ ...proyectData, title: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<FontSizeOutlined />}
                    placeholder="Titulo del curso"
                    value={proyectData.subtitle}
                    onChange={e => setProyectData({ ...proyectData, subtitle: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LinkOutlined />}
                    placeholder="Url"
                    value={proyectData.url}
                    onChange={e => setProyectData({ ...proyectData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<GithubOutlined />}
                    placeholder="Url"
                    value={proyectData.git}
                    onChange={e => setProyectData({ ...proyectData, git: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<AlignLeftOutlined />}
                    placeholder="Descripción"
                    value={proyectData.description}
                    onChange={e => setProyectData({ ...proyectData, description: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<FileImageOutlined />}
                    placeholder="Url imagen"
                    value={proyectData.img}
                    onChange={e => setProyectData({ ...proyectData, img: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    {proyect ? "Actualizar Curso" : "Crear curso"}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default PortfolioEdit;