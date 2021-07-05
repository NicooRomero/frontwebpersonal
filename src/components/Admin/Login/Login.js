import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined, WindowsFilled } from '@ant-design/icons';
import { signInApi } from '../../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN, DATA_USER } from '../../../utils/const';
import './Login.scss';

const Login = () => {
    const [ inputs, setInputs ] = useState({
        email: '',
        password: ''
    });

    const onChange = e => {
        setInputs({
            ...inputs,
            [e.target.name] : e.target.value
        });
    };

    const login = async () => {
        const result = await signInApi(inputs);
        console.log(result)
        if(result.message) {
            notification['error']({
                message: result.message
            });
        } else {
            const { accessToken, refreshToken, dataUser } = result;

            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            localStorage.setItem(DATA_USER, dataUser);

            notification['success']({
                message: "Login correcto!"
            });

            window.location = "/admin"
        }
    };


    return ( 
        <Form class="login-form" onChange={onChange} onFinish={login}>
            <Form.Item>
                <Input
                    prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}} />}
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    className="login-form__input"
                ></Input>
                <Input
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}} />}
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="login-form__input"
                ></Input>
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    className="login-form__button"
                >Ingresar</Button>
            </Form.Item>
        </Form>
    );
}

export default Login;