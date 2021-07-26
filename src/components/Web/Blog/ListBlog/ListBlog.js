import React, { useState, useEffect } from 'react';
import { Spin, List, notification, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from '../../../Pagination';
import { LoadingOutlined } from '@ant-design/icons';
import { getPostsApi } from '../../../../api/post';
import 'moment/locale/es';
import './ListBlog.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ListBlog = (props) => {
    const { location, history } = props;
    const [ posts, setPosts ] = useState(null);
    const { page = 1 } = queryString.parse(location.search); 

    useEffect(() => {
        getPostsApi(12, page)
            .then(response => {
                if(response.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    });
                } else {
                    setPosts(response.posts);
                }
            })
            .catch(() => {
                notification["error"]({
                    message: "Error en el servidor, intente de nuevo más tarde."
                });
            })
    }, [page])

    //console.log(posts)

    if(!posts) {
        return (
            <Spin indicator={antIcon} tip="Cargando" style={{ width: "100%", padding: "200px 0"}} />
        )
    }

    return ( 
        <div className="posts-list-web">
            <h1>Blog</h1>
            <List 
                dataSource={posts.docs}
                renderItem={post => <Post post={post} />}
            />
            <Pagination posts={posts} location={location} history={history} />
        </div>
    );
}

function Post(props) {
    const { post } = props;

    //const day = moment(post.date).format("DD");
    const month = moment(post.date).format("LL");

    return(
        <List.Item className="post">
            
            <div>
                <img src={`https://pwebnicoromero.herokuapp.com/api/post/get-img/${post.img}`} width={80} alt="hola" />
            </div>
                
            <div>
                <Link to={`blog/${post.url}`}>
                    <List.Item.Meta 
                        title={post.title}
                        description={post.subtitle}
                    />
                </Link>
            </div>

            <div className="post__date">
                {/* <span>{day}</span> */}
                <span>{month}</span>
            </div>

        </List.Item>
    );
}

export default ListBlog;
