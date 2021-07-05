import React, { useState, useEffect } from 'react';
import { Switch, List, Avatar, Button, notification, Modal as ModalAntd } from 'antd';
import { EditOutlined, StopOutlined, DeleteOutlined, CheckCircleOutlined, UserAddOutlined  } from '@ant-design/icons';
import { getAvatarApi, activeUserApi, deleteUserApi } from '../../../../api/user';
import { getAccToken } from '../../../../api/auth';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUser';
import AddUserForm from '../AddUser';
import './ListUsers.scss';

const { confirm } = ModalAntd;

const ListUsers = (props) => {

    const { usersActive, usersInactive, setReloadUser } = props;
    const [ viewUsersA, setViewUsersA ] = useState(true); 
    const [ isVisible, setIsVisible ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalContent, setModalContent ] = useState(null);

    const addUserModal = () => {
        setIsVisible(true);
        setModalTitle('Crear nuevo usuario');
        setModalContent(
            <AddUserForm setIsVisible={setIsVisible} setReloadUser={setReloadUser} />
        )
    }

    return ( 
        <div className="list-users">
            <div className="list-users__header">
                <div className="list-users__header-switch">
                    <Switch 
                        defaultChecked
                        onChange={() => setViewUsersA(!viewUsersA)}
                    />
                    <span>
                        {viewUsersA ? "Usuarios Activos" : "Usuarios Inactivos"}
                    </span>
                </div>
                <Button
                    type="primary"
                    onClick={addUserModal}
                >
                    <UserAddOutlined />Nuevo Usuario
                </Button>
            </div>

            
            {viewUsersA 
            ? 
            <UsersActive 
                usersActive={usersActive} 
                setIsVisible={setIsVisible}  
                setModalTitle={setModalTitle}
                setModalContent={setModalContent}
                setReloadUser={setReloadUser}
            />
            : 
            <UsersInactive usersInactive={usersInactive} setReloadUser={setReloadUser}/>}

            <Modal
                title={modalTitle}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            >
                {modalContent}
            </Modal>
        </div>
    );
}

function UsersActive(props) {
    const { usersActive, setIsVisible, setModalTitle, setModalContent, setReloadUser } = props;

    const editUser = user => {
        setIsVisible(true);
        setModalTitle(`Editar ${user.name  ? user.name : '...'} ${user.lastname ? user.lastname : '...'}`);
        setModalContent(<EditUserForm user={user} setIsVisible={setIsVisible} setReloadUser={setReloadUser}/>);
    }

    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser} setReloadUser={setReloadUser}/>}
        />
    )
}

function UserActive(props) {
    const { user, editUser, setReloadUser } = props;
    const [ avatar, setAvatar ] = useState(null);

    useEffect(() => {
        const accesToken = getAccToken();
        if(user.avatar) {
            getAvatarApi(user.avatar, accesToken)
                .then(response => {
                    setAvatar(response);
                })
        } else {
            setAvatar(null);
        }
    }, [user]);

    const desactiveUser = () => {
        const accesToken = getAccToken();

        activeUserApi(accesToken, user._id, false)
            .then(response => {
                notification['success']({
                    message: response.message
                });
                setReloadUser(true);
            })
            .catch(err => {
                notification['error']({
                    message: err.message
                });
            })
    };

    const showDeleteConfirm = () => {
        const accesToken = getAccToken();

        confirm({
            title: 'Eliminando usuario',
            content: `¿Estas seguro que quieres eliminar el usuario ${user.email}?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                deleteUserApi(accesToken, user._id)
                    .then(response => {
                        notification['success']({
                            message: response.message
                        });
                        setReloadUser(true);
                    })
                    .catch(err => {
                        notification['err']({
                            message: err.message
                        });
                    })
            }
        })
    };

    return (
                <List.Item
                    actions={[
                        <Button 
                            type="primary"
                            onClick={() => editUser(user)}
                        ><EditOutlined /></Button>,
                        <Button 
                            type="danger"
                            onClick={desactiveUser}
                        ><StopOutlined /></Button>,
                        <Button 
                            type="danger"
                            onClick={showDeleteConfirm}
                        ><DeleteOutlined /></Button>
                    ]}
                >
                    <List.Item.Meta 
                        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
                        title={`
                            ${user.name ? user.name : '...'} 
                            ${user.lastname ? user.lastname : '...'} 
                        `}
                        description={user.email}
                    />
                </List.Item>
    )
}

function UsersInactive(props) {
    const { usersInactive, setReloadUser} = props;
    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => <UserInactive user={user} setReloadUser={setReloadUser} />}
        />
    )
}

function UserInactive(props) {
    const { user, setReloadUser } = props;
    const [ avatar, setAvatar ] = useState(null);

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

    const activeUser = () => {
        const accesToken = getAccToken();

        activeUserApi(accesToken, user._id, true)
            .then(response => {
                notification['success']({
                    message: response.message
                });
                setReloadUser(true);
            })
            .catch(err => {
                notification['error']({
                    message: err.message
                });
            })
    }

    const showDeleteConfirm = () => {
        const accesToken = getAccToken();

        confirm({
            title: 'Eliminando usuario',
            content: `¿Estas seguro que quieres eliminar el usuario ${user.email}?`,
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                deleteUserApi(accesToken, user._id)
                    .then(response => {
                        notification['success']({
                            message: response.message
                        });
                        setReloadUser(true);
                    })
                    .catch(err => {
                        notification['err']({
                            message: err.message
                        });
                    })
            }
        })
    };

    return (
            <List.Item
            actions={[
                <Button 
                    type="primary"
                    onClick={activeUser}
                ><CheckCircleOutlined /></Button>,
                <Button 
                    type="danger"
                    onClick={showDeleteConfirm}
                ><DeleteOutlined /></Button>
            ]}
            >
                <List.Item.Meta 
                    avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
                    title={`
                        ${user.name ? user.name : '...'} 
                        ${user.lastname ? user.lastname : '...'} 
                    `}
                    description={user.email}
                />
            </List.Item>
    )
}

export default ListUsers;