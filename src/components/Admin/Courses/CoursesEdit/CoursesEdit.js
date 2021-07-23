import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined, GiftOutlined, AlignLeftOutlined, DollarOutlined } from '@ant-design/icons';
import { addCourseApi, updateCourseApi } from '../../../../api/courses';
import { getAccToken } from '../../../../api/auth';
import './CoursesEdit.scss';

const EditCourse = (props) => {
    const { setIsVisible, setReloadCourses, course } = props;
    const [ courseData, setCourseData ] = useState({});

    useEffect(() => {
        course ? setCourseData(course) : setCourseData({});
    }, [course])

    const addCourse = () => {
        if(!courseData) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            })
        } else {
            const accessToken = getAccToken();

            addCourseApi(accessToken, courseData)
                .then(response => {
                    const typeNotification = response.code === 200 ? "success" : "warning";
                        notification[typeNotification]({
                            message: response.message
                        });
                    setIsVisible(false);
                    setReloadCourses(true);
                    setCourseData({});
                })
                .catch(err => {
                    console.log(err)
                    notification["error"]({
                        message: "Error en el servidor, intente de nuevo más tarde."
                    })
                })
        }
    }

    const updateCourse = () => {
        const accessToken = getAccToken();

        updateCourseApi(accessToken, course._id, courseData)
            .then(response => {
                const typeNotification = response.code === 200 ? "success" : "warning";
                        notification[typeNotification]({
                            message: response.message
                        });
                setIsVisible(false);
                setReloadCourses(true);
                setCourseData({});
            })
            .catch(err => {
                console.log(err)
                notification["error"]({
                    message: "Error en el servidor, intente de nuevo más tarde."
                })
            })
    }

    return ( 
        <div className="add-edit-course-form">
            <AddEditForm course={course} addCourse={addCourse} updateCourse={updateCourse} setCourseData={setCourseData} courseData={courseData} />
        </div>
    );
}

function AddEditForm(props) {
    const { course, addCourse, updateCourse, setCourseData,courseData } = props;
    return (
        <Form className="form-add-edit" onFinish={course ? updateCourse : addCourse}>
            <Form.Item>
                <Input 
                    prefix={<FontSizeOutlined />}
                    placeholder="Titulo del curso"
                    value={courseData.title}
                    onChange={e => setCourseData({ ...courseData, title: e.target.value })}
                    disabled={course ? true : false}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LinkOutlined />}
                    placeholder="Url"
                    value={courseData.url}
                    onChange={e => setCourseData({ ...courseData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<AlignLeftOutlined />}
                    placeholder="Descripción"
                    value={courseData.description}
                    onChange={e => setCourseData({ ...courseData, description: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LinkOutlined />}
                    placeholder="Url imagen"
                    value={courseData.img}
                    onChange={e => setCourseData({ ...courseData, img: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    {course ? "Actualizar Curso" : "Crear curso"}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default EditCourse;