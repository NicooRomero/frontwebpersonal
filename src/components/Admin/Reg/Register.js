import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { emailValidation, minLengthValidation } from '../../../utils/formValidation';
import { signUpApi } from '../../../api/user';
import './Register.scss';

const Register = () => {
    const [ inputs, setInputs ] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        repassword: '',
        privacyPolicy: false
    });

    const [ formValid, setFormValid ] = useState({
        name: false,
        lastname: false,
        email: false,
        password: false,
        repassword: false,
        privacyPolicy: false
    });

    const onChange = e => {
        if(e.target.name === "privacyPolicy") {
            setInputs({  ...inputs,  [e.target.name] : e.target.checked });
        } else {
            setInputs({ ...inputs, [e.target.name] : e.target.value });
        }
        
    }

    const inputValidation = e => {
        const { type, name } = e.target;

        if(type === "name") {
            setFormValid({  ...formValid, [name]: minLengthValidation(e.target, 3) });
        }

        if(type === "lastname") {
            setFormValid({  ...formValid, [name]: minLengthValidation(e.target, 3) });
        }

        if(type === "email") {
            setFormValid({  ...formValid, [name]: emailValidation(e.target) });
        }

        if(type === "password") {
            setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
        }

        if(type === "checkbox"){
            setFormValid({ ...formValid, [name]: e.target.checked });
        }
    };

    const register = async () => {
        const { name, lastname, email, password, repassword, privacyPolicy } = inputs;

        if(!name || !lastname || !password || !email || !repassword || !privacyPolicy) {
            notification['error']({
                message: "Todos los campos son obligatorios"
            });
        } else {
            if(password !== repassword) {
                notification['error']({
                    message: "Las contraseñas no coinciden"
                });
            } else {
                const result = await signUpApi(inputs);
                if(result.status === 200) {
                    notification['success']({
                        message: result.message
                    });
                    resetForm();
                } else {
                    notification['error']({
                        message: result.message
                    });                    
                }
            }
        }
    };

    const resetForm = () => {
        const inputs = document.getElementsByTagName('input');

        for(let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('success');
            inputs[i].classList.remove('error');
        }

        setInputs({
            email: '',
            password: '',
            repassword: '',
            privacyPolicy: false
        });

        setFormValid({
            email: false,
            password: false,
            repassword: false,
            privacyPolicy: false
        });
    }
    
    return ( 
        <Form className="reg-form" onChange={onChange} onFinish={register} >
            <Form.Item>
            <Input
                prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}} />}
                type="name"
                name="name"
                placeholder="Nombre"
                className="reg-form__input"
                onChange={inputValidation}
                value={inputs.name}                
                />
                <Input
                prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}} />}
                type="lastname"
                name="lastname"
                placeholder="Apellido"
                className="reg-form__input"
                onChange={inputValidation}
                value={inputs.lastname}                
                />
                <Input
                prefix={<MailOutlined style={{color: "rgba(0,0,0,.25)"}} />}
                type="email"
                name="email"
                placeholder="Correo"
                className="reg-form__input"
                onChange={inputValidation}
                value={inputs.email}                
                />
                <Input
                prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}} />}
                type="password"
                name="password"
                placeholder="Contraseña"
                className="reg-form__input"
                onChange={inputValidation}
                value={inputs.password}
                />
                <Input
                prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}} />}
                type="password"
                name="repassword"
                placeholder="Repetir Contraseña"
                className="reg-form__input"
                onChange={inputValidation}
                value={inputs.repassword}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox
                    name="privacyPolicy"
                    onChange={inputValidation}
                    checked={inputs.privacyPolicy}
                >
                    He leído y acepto la política de privacidad.
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="reg-form__button">
                    Crear cuenta
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Register;