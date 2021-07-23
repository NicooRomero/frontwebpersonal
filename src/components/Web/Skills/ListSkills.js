import React from 'react';
import { List, Avatar, Row, Col } from 'antd';

import './ListSkills.scss';

const data = [
{
    title: 'HTML5 & CSS3',
    avatar: 'https://sinergiaformacion.es/wp-content/uploads/2014/10/programacion-html-css.jpg',
    description: 'Convertir y crear diseños en páginas web utilizando HTML y CSS.'
},
{
    title: 'JAVASCRIPT',
    avatar: 'https://okhosting.com/resources/uploads/2019/01/tendencias-javascript-2019.png',
    description: 'Conceptos nuevos de ES6 como Template Literals, arrow functions, generadores, iteradores, promises, async / await, fetch api, etc.'
},
{
    title: 'WORDPRESS',
    avatar: 'https://rockcontent.com/es/wp-content/uploads/sites/3/2020/06/Gu%C3%ADa-completa-de-Wordpress.png',
    description: 'Sitios web y tiendas en línea de manera práctica con WordPress.'
},
{
    title: 'BOOTSTRAP',
    avatar: 'https://res.cloudinary.com/codier/image/upload/v1610905279/lgxjbdivhebojbo6vkbs.png',
    description: 'Sitios y aplicaciones web adaptables a todos los dispositivos y resoluciones con Bootstrap 4.'
},
{
    title: 'PHP & MYSQL',
    avatar: 'https://imjoying.com/file/freeEvent/5f52e4ac-c83d-46fc-b107-745eae5bcc7e',
    description: 'Sitios web dínamicos con PHP y MYSQL.'
},
{
    title: 'REACT',
    avatar: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_1e0d62f445e6448af1e125f5702c8227/reactjs-development-services.png',
    description: 'React Hooks Gatsby Firestore Redux Context Next.js Styled Components Sass.'
},
{
    title: 'REACT MONGODB NODE EXPRESS - MERN STACK',
    avatar: 'https://www.offshoreitstaffing.com/blog/wp-content/uploads/2021/04/Blog-Article-MERN-Stack.jpeg',
    description: 'Crear aplicaciones web utilizando Mongo DB, Express y Node con React.'
},
];

const Skills = () => {
    return (
        <Row>
            <Col lg={24} className="skills-list">
                <h2>Dominios y habilidades</h2>
            </Col>
            <Col md={4} />
            <Col md={16}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item className="skills-list__item">
                        <List.Item.Meta
                        className="skills-list__meta"
                        avatar={<Avatar src={item.avatar} />}
                        title={item.title}
                        description={item.description}
                        />
                    </List.Item>
                    )}
                />
            </Col>
            <Col md={4} />
        </Row>
        );
}

export default Skills;