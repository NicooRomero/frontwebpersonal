import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Form, Input, Button, DatePicker, notification } from 'antd';
import { FontSizeOutlined, LinkOutlined } from '@ant-design/icons';
import { useDropzone } from 'react-dropzone';
import moment from 'moment';
import { Editor } from "@tinymce/tinymce-react";
import { getAccToken } from '../../../../api/auth';
import { addPostApi, updatePostApi } from '../../../../api/post';
import './EditFormPost.scss';

const EditFormPost = (props) => {
    const { setIsVisible, setReloadPosts, post } = props;
    const [ postData, setPostData ] = useState({});
    const [ prevImg, setPrevImg ] = useState(null)
    console.log(postData)
    useEffect(() => {
        if(post) {
            setPostData(post)
        } else {
            setPostData({});
        }
    }, [post]);

    const processPost = () => {
        const { title, url, description, date, img } = postData;

        if(!title || !url || !description || !date || !img) {
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

    useEffect(() => {
        if(prevImg) {
            setPostData({ ...postData, img: prevImg.file })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevImg]);

    const addPost = data => {
        const accessToken = getAccToken();

        const formData = new FormData();
        const title = postData.title;
        const url = postData.url;
        const description = postData.description;
        const img = postData.img;
        const date = postData.date;

        formData.append('img', img);
        formData.append('title', title);
        formData.append('url', url);
        formData.append('description', description);
        formData.append('date', date);

        addPostApi(accessToken, formData)
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

        const formData = new FormData();
        const title = postData.title;
        const url = postData.url;
        const description = postData.description;
        const img = postData.img;
        const date = postData.date;

        formData.append('img', img);
        formData.append('title', title);
        formData.append('url', url);
        formData.append('description', description);
        formData.append('date', date);

        updatePostApi(accessToken, post._id, formData)
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
            <AddForm postData={postData} setPostData={setPostData} post={post} processPost={processPost} setPrevImg={setPrevImg} />
        </div>
    );
}

function AddForm(props) {
    const { postData, setPostData, post, processPost, setPrevImg } = props;

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setPrevImg({ file, preview: URL.createObjectURL(file) });
        },
        [setPrevImg]
    );

    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        onDrop
    });

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
            {/* <Dropzone onDrop={acceptedFiles => setPostData({ ...postData, img: acceptedFiles })}> */}
                    <section>
                        <h3>Imagen Preview</h3>
                        <div className="upload-preview" {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <h1>Click para subir imagen</h1>
                            ) : (
                                <img src={`http://localhost:4000/api/post/get-img/${postData.img}`} width={80} alt="hola" />
                            )}
                        </div>
                    </section>
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