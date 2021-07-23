import React, { useState, useEffect } from 'react';
import { Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getPostApi } from '../../../../api/post';
import './BlogInfo.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const BlogInfo = (props) => {
    const { url } = props;
    const [ postInfo, setPostInfo ] = useState(null);

    useEffect(() => {
        getPostApi(url)
            .then(response => {
                console.log(response)
                if(response.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    });
                } else {
                    setPostInfo(response.post)
                }
            })
            .catch(() => {
                notification["error"]({
                    message: "Error en el servidor, intente de nuevo más tarde."
                });
            })
    },[url])

    if(!postInfo) {
        return <Spin indicator={antIcon} tipe="Cargando..." style={{ width: "100%", padding: "200px 0"}} />
    };

    return ( 
        <div className="post-info">
            <h1 className="post-info__title">{postInfo.title}</h1>
            <div className="post-info__creation-date">
                {moment(postInfo.date).local("es").format("LL")}
            </div>
            <div 
                className="post-info__description"
                dangerouslySetInnerHTML={{ __html: postInfo.description }}
            />
        </div>
        );
}

export default BlogInfo;