import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, DatePicker, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Editor } from "@tinymce/tinymce-react";
import { getAccToken } from '../../../../api/auth';
import { addPostApi, updatePostApi } from '../../../../api/post';
import './EditFormPost.scss';

const EditFormPost = (props) => {
    const { setIsVisible, setReloadPosts, post } = props;
    const [ postData, setPostData ] = useState({});

    useEffect(() => {
        if(post) {
            setPostData(post)
        } else {
            setPostData({});
        }
    }, [post]);

    const processPost = () => {
        const { title, url, description, date } = postData;

        if(!title || !url || !description || !date) {
            notification["error"]({
                message: "Todos los campos son obligatorios."
            })
        } else {
            if(!post) {
                addPost();
            } else {
                updatePost();
            }
        }
        
    }

    const addPost = data => {
        const accessToken = getAccToken();

        addPostApi(accessToken, postData)
            .then(response => {
                const typeNotification = response.code === 200 ? "success" : "warning";
                notification[typeNotification]({
                    message: response.message
                })
                setIsVisible(false);
                setReloadPosts(true);
                setPostData({});
            })
            .catch(() => {
                notification["error"]({
                    message: "Error en el servidor, intente de nuevo más tarde."
                })
            })
    }

    const updatePost = () => {
        const accessToken = getAccToken();

        updatePostApi(accessToken, post._id, postData)
            .then(response => {
                const typeNotification = response.code === 200 ? "success" : "warning";
                notification[typeNotification]({
                    message: response.message
                })
                setIsVisible(false);
                setReloadPosts(true);
                setPostData({});
            })
            .catch(() => {
                notification["error"]({
                    message: "Error en el servidor, intente de nuevo más tarde."
                })
            })
    }

    return ( 
        <div className="add-edit-post-form">
            <AddForm postData={postData} setPostData={setPostData} post={post} processPost={processPost}/>
        </div>
    );
}

function AddForm(props) {
    const { postData, setPostData, post, processPost } = props;

    return (
        <Form
            className="add-edit-post-form"
            layout="inline"
            onFinish={processPost}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Input 
                        prefix={<FontSizeOutlined />}
                        placeholder="Titulo"
                        value={postData.title}
                        onChange={e => setPostData({ ...postData, title: e.target.value })}
                    />
                </Col>
                <Col span={8}>
                    <Input 
                        prefix={<LinkOutlined />}
                        placeholder="url"
                        value={postData.url}
                        onChange={e => setPostData({ ...postData, url: textUrl(e.target.value) })}
                    />
                </Col>
                <Col span={8}>
                    <DatePicker 
                        style={{ width: "100%" }}
                        format="DD/MM/YYYY HH:mm:ss"
                        placeholder="Fecha de publicación"
                        showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                        value={postData.date && moment(postData.date)}
                        onChange={(e, value) => setPostData({ ...postData, date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString() })}
                    />
                </Col>
            </Row>
            <Editor
                //onInit={(evt, editor) => editorRef.current = editor}
                initialValue={postData.description ? postData.description : "" }
                init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onBlur={e => setPostData({ ...postData, description: e.target.getContent() })}
            />
            <Button type="primary" htmlType="submit" className="btn-submit">
                {post ? "Actualizar Post" : "Crear Post"}
            </Button>
        </Form>
    )
}

function textUrl(text) {
    const url = text.replace(" ", "-");

    return url.toLowerCase();
}

export default EditFormPost;