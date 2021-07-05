import { basePath } from './config';

//creando una cuenta
export function signUpApi(data) {
    const url = `${basePath}/users/sign-up`;

    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return {
                status: result.status,
                message: result.message
            }
        })
        .catch(err => {
            return {
                status: 500,
                message: err.message
            }
        })
}

//iniciando sesion
export function signInApi(data) {
    const url = `${basePath}/users/sign-in`;

    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params)
        .then(response => { 
            return response.json()
            //console.log(response)
        })
        .then(result => {
            return result;
            
        })
        .catch(err => {
            return err.message;
        })
}

export function getUserApi(token) {
    const url = `${basePath}/users/user`;

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

export function getUserActiveApi(token, status) {
    const url = `${basePath}/users/user-active?active=${status}`;

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

export function uploadAvatarApi(token, avatar, userId) {
    const url = `${basePath}/users/upload-avatar/${userId}`;

    const formData = new FormData();
    formData.append('avatar', avatar, avatar.name);

    const params = {
        method:'PUT',
        body: formData,
        headers: {
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

export function getAvatarApi(avatarName) {
    const url = `${basePath}/users/avatar/${avatarName}`;

    return fetch(url)
        .then(response => {
            return response.url;
        })
        .catch(err => {
            return err.message;
        })
}

export function updateUserApi(token, user, userId) {
    const url = `${basePath}/users/update-user/${userId}`;


    const params = {
        method:'PUT',
        body: JSON.stringify(user),
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

export function activeUserApi(token, userId, status) {
    const url = `${basePath}/users/activate/${userId}`;

    const params = {
        method: 'PUT',
        body: JSON.stringify({
            active: status
        }),
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

export function deleteUserApi(token, userId) {
    const url = `${basePath}/users/delete/${userId}`;

    const params = {
        method: 'DELETE',
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

export function signUpAdmApi(token, data) {
    const url = `${basePath}/users/signup-admin`;

    const params = {
        method: 'POST',
        body: JSON.stringify(data),
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

export function totalUsersApi(token) {
    const url = `${basePath}/users/total-users`;

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