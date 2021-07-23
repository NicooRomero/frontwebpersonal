import React from 'react';
import MainBanner from '../components/Web/MainBanner';
import About from '../components/Web/About';
import Tecnologias from '../components/Web/Tecnologias';
import Cursos from '../components/Web/Cursos';
import Portfolio from '../components/Web/Portfolio';
import ContactBanner from '../components/Web/Contacto/ContactBanner';

const Home = () => {
    return ( 
        <>
            <MainBanner />
            <About />
            <Tecnologias />
            <Cursos />
            <Portfolio />
            <ContactBanner />
        </>
        );
}

export default Home;