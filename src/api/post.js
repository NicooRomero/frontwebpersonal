import { basePath } from './config';

export function getPostsApi(limit, page) {
    const url = `${basePath}/post/get-posts?limit=${limit}&page=${page}`;

    return fetch(url)
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

export function deletePostApi(token, id) {
    const url = `${basePath}/post/delete-post/${id}`;

    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

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

// export function addPostApi(token, post) {
//     const url = `${basePath}/post/add-post`;

//     const params = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: token
//         },
//         body: JSON.stringify(post)
//     }

//     return fetch(url, params)
//         .then(response => {
//             return response.json()
//         })
//         .then(result => {
//             return result;
//         })
//         .catch(err => {
//             return err;
//         })
// }

export function addPostApi(token, formData) {
    const url = `${basePath}/post/add-post`;

    // const formData = new FormData();
    // const title = post.title;
    // const burl = post.url;
    // const desc = post.description;
    // const blob = post.img;
    // console.log(blob)

    // formData.append('img', blob);
    // formData.append('title', title);
    // formData.append('url', burl);
    // formData.append('description', desc);
    
    const params = {
        method: "POST",
        headers: {
            Authorization: token
        },
        body: formData
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

export function updatePostApi(token, id, data) {
    const url = `${basePath}/post/update-post/${id}`;

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

export function getPostApi(urlPost) {
    const url = `${basePath}/post/get-post/${urlPost}`;

    return fetch(url)
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

export function totalPostsApi(token) {
    const url = `${basePath}/post/total-posts`;

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