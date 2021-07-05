import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Form, Input, Select, Button, Row, Col, notification } from 'antd';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import { useDropzone } from 'react-dropzone';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { getAvatarApi, uploadAvatarApi, updateUserApi } from '../../../../api/user';
import { getAccToken } from '../../../../api/auth';
import './EditUser.scss';

const EditUserForm = (props) => {
    const { user, setIsVisible, setReloadUser } = props;
    const { Option } = Select;
    const [ avatar, setAvatar ] = useState(null);
    const [ userData, setUserData ] = useState({});

    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        })
    }, [user]);

    useEffect(() => {
        if(user.avatar) {
            getAvatarApi(user.avatar)
                .then(response => {
                    setAvatar(response);
                })
        } else {
            setAvatar(null);
        }
    }, [user]);

    useEffect(() => {
        if(avatar) {
            setUserData({ ...userData, avatar: avatar.file })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar]);

    const updateUser = e => {
        const token = getAccToken();
        const userUpdate = userData;

        if(userUpdate.password || userData.rePassword) {
            if(userUpdate.password !== userData.rePassword) {
                notification['error']({
                    message: 'Las contraseñas no coincide.'
                })
                return;
            } else {
                delete userUpdate.rePassword;
            }
            
        }

        if(!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
            notification['error']({
                message: 'Nombre, Apellido & Email son obligatorios'
            })
            return;
        }

        if(typeof userUpdate.avatar === 'object') {
            uploadAvatarApi(token, userUpdate.avatar, user._id)
                .then(response => {
                    userUpdate.avatar = response.avatarName;
                    updateUserApi(token, userUpdate, user._id)
                        .then(result => {
                            notification['success']({
                                message: result.message
                            });
                        });
                });
        } else {
            updateUserApi(token, userUpdate, user._id)
                .then(result => {
                    notification['success']({
                        message: result.message
                    });
                });
        }

        setIsVisible(false);
        setReloadUser(true);
    }

    return ( 
        <div className="edit-user-form">
            <UploadAvatar 
                avatar={avatar}
                setAvatar={setAvatar}
            />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    );
}

function UploadAvatar(props) {
    const { avatar, setAvatar } = props;
    const [ avatarUrl, setAvatarUrl ] = useState(null);

    useEffect(() => {
        if(avatar) {
            if(avatar.preview) {
                setAvatarUrl(avatar.preview);
            } else {
                setAvatarUrl(avatar);
            }
        } else {
            setAvatarUrl(null);
        }
    }, [avatar]);

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) });
        },
        [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <div {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : (
                <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
            )}
        </div>
    )

}

function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { option } = Select;

    return (
        <Form className="form-edit" onFinish={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<UserOutlined />}
                            placeholder="name"
                            value={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<UserOutlined />}
                            placeholder="lastname"
                            value={userData.lastname}
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<MailOutlined />}
                            placeholder="email"
                            value={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select 
                            placeholder="Seleccionar rol"
                            value={userData.role}
                            onChange={e => setUserData({ ...userData, role: e })}
                        >
                            <Select.Option value="admin">Administrador</Select.Option>
                            <Select.Option value="editor">Editor</Select.Option>
                            <Select.Option value="review">Revisor</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<LockOutlined />}
                            placeholder="Contraseña"
                            type="password"
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<LockOutlined />}
                            placeholder="Repetir Contraseña"
                            type="password"
                            onChange={e => setUserData({ ...userData, rePassword: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-submit"
                >Actualizar Usuario</Button>
            </Form.Item>
        </Form>
    )
}

export default EditUserForm;