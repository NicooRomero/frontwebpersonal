import React from 'react';
import MERN from '../../assets/img/png/tecnologias/mern.png';
import HTML5 from '../../assets/img/png/tecnologias/html5.png';
import PHPMYSQL from '../../assets/img/png/tecnologias/phpmysql.png';
import SASS from '../../assets/img/png/tecnologias/sass.png';
import JS from '../../assets/img/png/tecnologias/js.png';
import REACT from '../../assets/img/png/tecnologias/react.png';
import WP from '../../assets/img/png/tecnologias/wordpress.png';
import BP from '../../assets/img/png/tecnologias/bootstrap.png';


import './Carousel.scss';

const Carousel = () => {
    return ( 
        <div className="slider">
            <div className="slide-track">
                <div className="slide">
                    <img src={MERN} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={HTML5} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={BP} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={SASS} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={JS} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={REACT} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={WP} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={PHPMYSQL} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={MERN} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={HTML5} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={BP} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={SASS} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={JS} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={REACT} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={WP} height="100" width="250" alt="" />
                </div>
                <div className="slide">
                    <img src={PHPMYSQL} height="100" width="250" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Carousel;