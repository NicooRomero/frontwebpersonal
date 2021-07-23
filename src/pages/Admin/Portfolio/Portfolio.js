import React, { useState, useEffect } from 'react';
import { getProyectsApi } from '../../../api/portfolio';
import PortfolioList from '../../../components/Admin/Portfolio/PortfolioList';

const Portfolio = () => {
    const [ proyects, setProyect ] = useState([]);
    const [ reloadProyects, setReloadProyects ] = useState(false);
    console.log(proyects)

    useEffect(() => {
        getProyectsApi()
            .then(response => {
                //console.log(response.proyects)
                setProyect(response.proyects)
            })
            setReloadProyects(false)
    }, [reloadProyects]);


    return ( 
        <div className="portfolio">
            <PortfolioList proyects={proyects} setReloadProyects={setReloadProyects} />
        </div>
    );
}

export default Portfolio;