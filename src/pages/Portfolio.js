import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { getProyectsApi } from '../api/portfolio';
import ListPortfolio from '../components/Web/Portfolio/ListPortfolio/ListPortfolio';

const Portfolio = () => {
    const [ data, setData ] = useState();

    useEffect(() => {
        getProyectsApi()
            .then(response => {
                setData(response.proyects)
            })
    }, [])
console.log(data)
    return ( 
        <Row>
            <ListPortfolio data={data} />
        </Row>
    );
}

export default Portfolio;