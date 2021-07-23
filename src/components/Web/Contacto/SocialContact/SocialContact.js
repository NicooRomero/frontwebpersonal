import React from 'react';
import { WhatsAppOutlined, TwitterOutlined, MailOutlined, LinkedinFilled  } from '@ant-design/icons';

import './SocialContact.scss';

const SocialContact = () => {
    return ( 
        <div className="social-contact">

            <div className="social-contact__icon">
                <a href="mailto:nicooromero@gmail.com" className="mail" target="_blank">
                    <MailOutlined />
                
                <p>nicooromero@gmail.com</p>
                </a>
            </div>

            <div className="social-contact__icon">
                <a href="https://api.whatsapp.com/send/?phone=543854263515" className="whatsapp" target="_blank">
                    <WhatsAppOutlined />
                
                <p>+54 385 426 3515</p>
                </a>
            </div>
            
            <div className="social-contact__icon">
                <a href="https://www.linkedin.com/in/nicooromero" className="linkedin" target="_blank" >
                    <LinkedinFilled />
                
                <p>/nicooromero</p>
                </a>
            </div>

        </div>
    );
}

export default SocialContact;