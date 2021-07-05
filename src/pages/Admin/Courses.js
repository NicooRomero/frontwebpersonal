import React, { useState, useEffect } from 'react';
import { getCoursesApi } from '../../api/courses';
import CoursesList from '../../components/Admin/Courses/CoursesList';

const Courses = () => {
    const [ courses, setCourses ] = useState([]);
    const [ reloadCourses, setReloadCourses ] = useState(false);

    useEffect(() => {
        getCoursesApi()
            .then(response => {
                setCourses(response.cursos);
            });
        setReloadCourses(false)
    }, [reloadCourses]);

    return ( 
    <div className="courses">
        <CoursesList courses={courses} setReloadCourses={setReloadCourses} />
    </div> 
    );
}

export default Courses;