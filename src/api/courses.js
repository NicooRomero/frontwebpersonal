import { basePath } from './config';


export function getCoursesApi() {
    const url = `${basePath}/cursos/get-cursos`;

    return fetch(url) 
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}

export function deleteCourseApi(token, id) {
    const url = `${basePath}/cursos/delete-curso/${id}`;

    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}

export function addCourseApi(token, course) {
    const url = `${basePath}/cursos/add-curso`;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(course)
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}

export function updateCourseApi(token, id, data) {
    const url = `${basePath}/cursos/update-curso/${id}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params)
        .then(response => {
            return response.json()
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}

export function totalCursosApi(token) {
    const url = `${basePath}/cursos/total-cursos`;

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        })
}