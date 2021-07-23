import React from 'react';
import { Link } from 'react-router-dom';
import './InfoFooter.scss';

const InfoFooter = () => {
    return ( 
        <div className="my-info">
            <div className="my-info__logo">
                <Link to={'/'}>
                    <h1>Nicolás Romero</h1>
                </Link>
            </div>
            <h4>Desarrollador Web Full Stack Jr</h4>
        </div>
    );
}

export default InfoFooter;