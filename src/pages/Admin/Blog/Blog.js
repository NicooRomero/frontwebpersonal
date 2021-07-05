import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import { getPostsApi } from '../../../api/post';
import PostList from '../../../components/Admin/Blog/PostsList';
import Pagination from '../../../components/Pagination';
import EditFormPost from '../../../components/Admin/Blog/EditForm';
import queryString from 'query-string';
import Modal from '../../../components/Modal';
import './Blog.scss';


const Blog = (props) => {
    const { location, history } = props;
    const [ posts, setPosts ] = useState(null);
    const [ reloadPosts, setReloadPosts ] = useState(false);
    const [ isVisible, setIsVisible ] = useState(false);
    const [ modaltitle, setModalTitle ] = useState("");
    const [ modalContent, setModalContent ] = useState(null);
    const { page = 1 } = queryString.parse(location.search);

    useEffect(() => {
        getPostsApi(12, page)
            .then(response => {
                if(response.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    });
                } else {
                    setPosts(response.posts) 
                }
            })
            .catch(() => {
                notification["error"]({
                    message: "Error en el servidor."
                });
            })
    },[page, reloadPosts]);

    if(!posts) {
        return null;
    }

    const addPost = () => {
        setIsVisible(true);
        setModalTitle("Creando nuevo post");
        setModalContent(
            <EditFormPost setIsVisible={setIsVisible} setReloadPosts={setReloadPosts} post={null} />
        )
    }

    const editPost = post => {
        setIsVisible(true);
        setModalTitle("Editar post");
        setModalContent(
            <EditFormPost setIsVisible={setIsVisible} setReloadPosts={setReloadPosts} post={post} />
        )
    }

    return ( 
        <div className="blog">
            <div className="blog__add-post">
                <Button type="primary" onClick={addPost}>Nuevo Post</Button>
            </div>

            <PostList posts={posts} setReloadPosts={setReloadPosts} editPost={editPost} />
            <Pagination posts={posts} location={location} history={history} />

            <Modal title={modaltitle} isVisible={isVisible}  setIsVisible={setIsVisible} width="75%">{modalContent}</Modal>
        </div>
    );
}

export default withRouter(Blog);