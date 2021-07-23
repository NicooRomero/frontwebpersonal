import React from 'react';
import { Row, Spin, Col, Card, Button } from 'antd';
import './ListCursos.scss';

const Cursos = (props) => {

    const{ data } = props;

    return ( 
        <Row className="list-cursos">
            <Col lg={24} className="list-cursos__title">
                <h2>Algunos Cursos y capacitaciones que realicé</h2>
                <h3>Más de <span style={{ color: "#f7485a" }}>350 hs</span> de capacitación constante.  </h3>
            </Col>
            <div style={{ margin: "0 auto" }}>
                <Row className="row-cursos">
                    {!data ?
                        (
                            <Spin tip="Cargando cursos" style={{ textAlign: "center", width: "100%", padding: "20px" }}/>
                        ) :
                        (
                            data.map((curso) => (
                                <Col md={6}>
                                    <CardCursos
                                    image={curso.img}
                                    title={curso.title}
                                    subtitle={curso.description}
                                    link="/cursos"
                                    />
                                </Col>
                            ))
                        )                    
                    }
                    
                </Row>
            </div>
        </Row>
    );
}

function CardCursos(props) {
    const { image, title, subtitle, link } = props;
    const { Meta } = Card;

    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card
                className="list-cursos__card"
                cover={ <img src={image} alt={title} /> }
                // actions={[ <Button>Certificado</Button> ]}
            >
                <Meta title={title} description={subtitle} />
            </Card>
        </a>
    );
}

export default Cursos;