import React, { useState, useEffect } from 'react';
import { Row, Spin, Col, Card, Button, notification } from 'antd';
import { getCoursesApi } from '../../../api/courses';
import { Link } from 'react-router-dom';
import './Cursos.scss';

const Cursos = () => {

    const [ cursos, setCursos ] = useState(null)

    useEffect(() => {
        getCoursesApi()
            .then(response => {
                if(response.code !== 200) {
                    console.log(response.cursos)
                    notification["warning"]({
                        message: response.message
                    })
                } else {
                    setCursos(response.cursos)
                }
            })
            .catch(() => {
                notification["error"]({
                    message: "Error en el servidor, intente de nuevo más tarde."
                })
            })
    }, [])

    console.log(cursos);

    return ( 
        <Row className="home-courses">
            <Col lg={24} className="home-courses__title">
                <h2>Algunos Cursos y capacitaciones que realicé</h2>
            </Col>
            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-courses">
                    {!cursos ?
                        (
                            <Spin tip="Cargando cursos" style={{ textAlign: "center", width: "100%", padding: "20px" }}/>
                        ) :
                        (
                            cursos.slice(0, 3).map((curso) => (
                                <Col md={6}>
                                    <CardCourse 
                                    image={curso.img}
                                    title={curso.title}
                                    subtitle={curso.description}
                                    link="/cursos"
                                    />
                                </Col>
                            ))
                        )                    
                    }
                    {/* {cursos.map(curso => (
                        <Col md={6}>
                        <CardCourse 
                        image={curso.img}
                        title={curso.title}
                        subtitle={curso.subtitle}
                        link="/cursos"
                        />
                    </Col>
                    ))} */}
                    
                </Row>
            </Col>
            <Col lg={4} />
            <Col lg={24} className="home-courses__more">
                <Link to="/cursos">
                    <Button>Ver más cursos</Button>
                </Link>
            </Col>
        </Row>
    );
}

function CardCourse(props) {
    const { image, title, subtitle, link } = props;
    const { Meta } = Card;

    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card
                className="home-courses__card"
                cover={ <img src={image} alt={title} /> }
                //actions={[ <Button>Certificado</Button> ]}
            >
                <Meta title={title} description={subtitle} />
            </Card>
        </a>
    );
}

export default Cursos;