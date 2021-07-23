import React, { useState } from 'react';
import { notification, Input } from 'antd';
import { UserOutlined, MailOutlined, MessageOutlined, PaperClipOutlined } from '@ant-design/icons'
import emailjs from 'emailjs-com';
import SocialContact from '../SocialContact';


import './ContactForm.scss';

const ContactForm = () => {
    const { TextArea } = Input;

    const [msg, setMsg] = useState({
        user_name: '',
        user_email:'',
        subject: '',
        message: ''
    });

    console.log(msg)

    const handleChange = e => {
        setMsg({
            ...msg,
            [e.target.name]: e.target.value
        })
    }

    const { user_name, user_email, subject, message } = msg;

    const onSubmit = e =>{
        e.preventDefault();
        
        if(!user_name || !user_email || !subject || !message ) {
        
            notification["error"]({
                message: "Error: Todos los campos son obligatorios."
            });     
            return; 

        } else {
            emailjs.sendForm('service_jctneoe', 'template_1pf54j7', e.target, 'user_psebtTd50aPWM7eK4j5kk')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
            });
            notification["success"]({
                message: "Mensaje enviado con éxito!"
            });
            e.target.reset();
        }

        setMsg({
            user_name: '',
            user_email:'',
            subject: '',
            message: ''
        });
    }

    return (
        <div className="row-form">
        <form className="contact-form" onSubmit={onSubmit}>
        
            <Input size="large" value={msg.user_name} name="user_name" placeholder="Nombre" prefix={<UserOutlined />} onChange={handleChange} />
            {/* <input type="text" name="user_name" placeholder="<UserOutlined/>" onChange={handleChange}/> */}
    
            <Input size="large" value={msg.user_email} type="email" name="user_email" placeholder="Email" prefix={<MailOutlined />} onChange={handleChange} />
        
            <Input size="large" value={msg.subject} type="text" name="subject" placeholder="Asunto" prefix={<PaperClipOutlined />} onChange={handleChange} />
            
            <TextArea name="message" value={msg.message} placeholder="Escribe el Mensaje..." prefix={<MessageOutlined />} onChange={handleChange}/>

            <Input type="submit" value="Enviar Mensaje" />
            
        </form> 
            <SocialContact />
        </div>
        );
}

export default ContactForm;