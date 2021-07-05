import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { signUpAdmApi } from '../../../../api/user';
import { getAccToken } from '../../../../api/auth';
import './AddUser.scss';

const AddUserForm = (props) => {
    const { setIsVisible, setReloadUser } = props;
    const [ userData, setUserData ] = useState({});


    const addUser = e => {
        if(
            !userData.name || 
            !userData.lastname || 
            !userData.email || 
            !userData.role || 
            !userData.password ||
            !userData.rePassword
        ) {
            notification['error']({
                message: 'Todos los campos son obligatorios.'
            })
        } else if(userData.password !== userData.rePassword){
            notification['error']({
                message: 'Las contraseñas no coinciden.'
            })
        } else {
            const accesToken = getAccToken();

            signUpAdmApi(accesToken, userData)
                .then(response => {
                    notification['success']({
                        message: 'Usuario creado con éxito!'
                    })
                    setIsVisible(false);
                    setReloadUser(true);
                    setUserData({})
                })
                .catch(err => {
                    notification['error']({
                        message: 'Error en el serviro.'
                    })
                })
        }
}

    return ( 
        <div className="add-user-form">
            <AddForm
                userData={userData}
                setUserData={setUserData}
                addUser={addUser}
            />
        </div>
    );
}

function AddForm(props) {
    const { userData, setUserData, addUser } = props;
    const { Option } = Select;

    return (
        <Form className="form-add" onFinish={addUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Nombre"
                            velue={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value})}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Apellido"
                            velue={userData.lastname}
                            onChange={e => setUserData({ ...userData, lastname: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Correo electrónico"
                            velue={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                
                <Col span={12}>
                    <Form.Item>
                        <Select 
                            placeholder="Seleccionar rol"
                            value={userData.role}
                            onChange={e => setUserData({ ...userData, role: e })}
                        >
                            <Select.Option value="admin">Administrador</Select.Option>
                            <Select.Option value="editor">Editor</Select.Option>
                            <Select.Option value="review">Revisor</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            type="password"
                            velue={userData.password}
                            onChange={e => setUserData({ ...userData, password: e.target.value})}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            placeholder="Repetir Password"
                            type="password"
                            velue={userData.rePassword}
                            onChange={e => setUserData({ ...userData, rePassword: e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">Crear Usuario</Button>
            </Form.Item>
        </Form>
    )
}

export default AddUserForm;