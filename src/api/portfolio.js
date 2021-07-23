import { basePath } from './config';

export function getProyectsApi() {
    const url = `${basePath}/portfolio/get-proyects`;

    return fetch(url)
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

export function addProyectApi(token, proyect) {
    const url = `${basePath}/portfolio/add-proyect`;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(proyect)
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

export function updateProyectApi(token, id, data) {
    const url = `${basePath}/portfolio/update-proyect/${id}`;

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

export function deleteProyectApi(token, id) {
    const url = `${basePath}/portfolio/delete-proyect/${id}`;

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