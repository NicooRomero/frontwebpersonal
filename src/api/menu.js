import { basePath } from './config';

export function getMenuApi() {
    const url = `${basePath}/menus/get-menu`;

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

export function updateMenuApi(token, menuId, data) {
    const url = `${basePath}/menus/update-menu/${menuId}`;

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
            return response.json();
        })
        .then(result => {
            return result.message;
        })
        .catch(err => {
            return err.message;
        })
}

export function activeMenuApi(token, menuId, status) {
    const url = `${basePath}/menus/activate/${menuId}`;

    const params = {
        method: "PUT",
        body: JSON.stringify({ active: status}),
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
            return result.message;
        })
        .catch(err => {
            return err.message;
        })
}

export function addMenuApi(token, menu) {
    const url = `${basePath}/menus/add-menu`;

    const params = {
        method: "POST",
        body: JSON.stringify(menu),
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
            return result.message;
        })
        .catch(err => {
            return err.message;
        })
}

export function deleteMenuApi(token, menuId) {
    const url = `${basePath}/menus/delete/${menuId}`;

    const params = {
        method: "DELETE",
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
            return result.message;
        })
        .catch(err => {
            return err.message;
        })
}

export function totalMenuApi(token) {
    const url = `${basePath}/menus/total-menus`;

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