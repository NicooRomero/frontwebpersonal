import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { getCoursesApi } from '../api/courses';
import ListCursos from '../components/Web/Cursos/ListCursos';

const Cursos = () => {
    const [ data, setData ] = useState();

    useEffect(() => {
        getCoursesApi()
            .then(response => {
                setData(response.cursos)
            })
    }, [])
    console.log(data)
    return ( 
                <Row>
                    <ListCursos data={data} />
                </Row>
            
        );
}

export default Cursos;