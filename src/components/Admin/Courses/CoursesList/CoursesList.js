import React, { useEffect, useState } from 'react';
import { List, Button, Modal as ModalAntd, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Modal from '../../../Modal';
import EditCourse from '../CoursesEdit';
import { getAccToken} from '../../../../api/auth';
import { deleteCourseApi } from '../../../../api/courses';
import './CoursesList.scss';

const { confirm } = ModalAntd;

const CoursesList = (props) => {
    const { courses, setReloadCourses } = props;
    console.log(courses)
    const [ listCourses, setListCourses] = useState([]);
    const [ isVisible, setIsVisible ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalContent, setModalContent ] = useState(null);

    useEffect(() => {
        const listCourseArray = [];
        courses.forEach(course => {
            listCourseArray.push({
                content: course
            });
        });        
        setListCourses(listCourseArray)
    }, [courses]);

    const deleteCourse = course => {
        const accesToken = getAccToken();

        confirm({
            title: "Eliminar curso?",
            content: `¿Estas seguro de que quieres eliminar este curso?`,
            okText: "Eliminar",
            cancelText: "Cancelar",
            onOk() {
                deleteCourseApi(accesToken, course._id)
                    .then(response => {
                        const typeNotification = response.code === 200 ? "success" : "warning";
                        notification[typeNotification]({
                            message: response.message
                        });
                        setReloadCourses(true);
                    })
                    .catch(() => {
                        notification["error"]({
                            message: "Error en el servidor, intente de nuevos más tarde"
                        })
                    })
            }
        })
    }

    const addCourseModal = () => {
        setIsVisible(true);
        setModalTitle("Creando nuevo curso");
        setModalContent(<EditCourse setIsVisible={setIsVisible} setReloadCourses={setReloadCourses} />)
    }

    const editCourseModal = course => {
        setIsVisible(true);
        setModalTitle("Editando curso");
        setModalContent(<EditCourse setIsVisible={setIsVisible} setReloadCourses={setReloadCourses} course={course} />)
    }

    return ( 
        <div className="courses-list">
            <div className="courses-list__header">
                <Button type="primary" onClick={addCourseModal}>Nuevo Curso</Button>
            </div>
            <div className="courses-list__items">
                {listCourses.length === 0 && (
                    <h2 style={{ textAlign: "center", margin: 0}}>No hay cursos creados</h2>
                )}
                {courses.map((course) => (
                    <List.Item
                        actions={[
                            <Button 
                                type="primary"
                                onClick={() => editCourseModal(course)}
                            ><EditOutlined /></Button>,
                            // <Button 
                            //     type="danger"
                            //     //onClick={desactiveUser}
                            // ><StopOutlined /></Button>,
                            <Button 
                                type="danger"
                                onClick={() => deleteCourse(course)}
                            ><DeleteOutlined /></Button>
                        ]}
                    >
                        <img 
                            src={course.img}
                            alt={course.title}
                            style={{ width: "100px", marginRight: "20px"}}
                        />
                        <List.Item.Meta
                            title={course.title}
                            description={course.description}
                        />
                    </List.Item>
                ))}
            </div>
            <Modal
                title={modalTitle}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            >
                {modalContent}
            </Modal>
        </div>
    );
}

export default CoursesList;