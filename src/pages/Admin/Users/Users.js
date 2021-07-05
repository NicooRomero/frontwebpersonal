import React, { useState, useEffect } from 'react';
import { getAccToken } from '../../../api/auth';
import { getUserActiveApi } from '../../../api/user';
import ListUsers from '../../../components/Admin/Users/ListUsers';
import './Users.scss';

const Users = () => {
    
    const [ usersActive, setUsersActive ] = useState([]);
    const [ usersInactive, setUsersInactive ] = useState([]);
    const [ reloadUser, setReloadUser] = useState(false);
    const token = getAccToken();

    useEffect(() => {
        getUserActiveApi(token, true).then(response => {
            setUsersActive(response.users);
        });
        getUserActiveApi(token, false).then(response => {
            setUsersInactive(response.users);
        });
        setReloadUser(false);
    }, [token, reloadUser])

    return ( 
        <div className="users">
            <ListUsers usersActive={usersActive} usersInactive={usersInactive} setReloadUser={setReloadUser}/>
        </div>
    );
}

export default Users;