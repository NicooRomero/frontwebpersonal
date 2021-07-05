import React from 'react';
import MainBanner from '../components/Web/MainBanner';
import About from '../components/Web/About';
import Tecnologias from '../components/Web/Tecnologias';

const Home = () => {
    return ( 
        <>
            <MainBanner />
            <About />
            <Tecnologias />
        </>
        );
}

export default Home;