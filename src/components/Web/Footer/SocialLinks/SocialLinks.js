import React from 'react';
import { FacebookFilled, TwitterOutlined, YoutubeFilled, LinkedinFilled  } from '@ant-design/icons';

import './SocialLinks.scss';

const SocialLinks = () => {
    return ( 
        <div className="social-links">
            <div>
                <a href="youtube.com" className="youtube" target="_blank">
                    <YoutubeFilled />
                </a>
                <a href="twitter.com" className="twitter" target="_blank">
                    <TwitterOutlined />
                </a>
                <a href="facebook.com" className="facebook" target="_blank">
                    <FacebookFilled />
                </a>
                <a href="https://www.linkedin.com/in/nicooromero" className="linkedin" target="_blank">
                    <LinkedinFilled />
                </a>
            </div>

            <div className="social-links__qr">
                <img src="https://www.codigos-qr.com/qr/php/qr_img.php?d=BEGIN%3AVCARD%0AN%3ANicolas+Romero%0ATITLE%3ADesarrollador+Web+Jr%0AORG%3A%0AADDR%3A%0ATEL%3A3854263515%0AEMAIL%3Anicooromero%40gmail.com%0AURL%3Ahttps%3A%2F%2Fwww.linkedin.com%2Fin%2Fnicooromero%0AEND%3AVCARD&s=8&e=" alt="codigo QR"/>
            </div>

            
        </div>
    );
}

export default SocialLinks;