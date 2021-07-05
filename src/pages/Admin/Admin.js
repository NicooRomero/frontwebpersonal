import React, { useState, useEffect } from 'react';
import { totalUsersApi } from '../../api/user';
import { totalPostsApi } from '../../api/post';
import { totalCursosApi } from '../../api/courses';
import { totalMenuApi } from '../../api/menu';
import { getAccToken } from '../../api/auth';
import Dashboard from '../../components/Admin/Dashboard';

const Admin = () => {
    const [ usersT, setUserT ] = useState();
    const [ postsT, setPostsT ] = useState();
    const [ cursosT, setCursosT ] = useState();
    const [ menuT, setMenuT ] = useState();

    useEffect(() => {
        const accessToken = getAccToken();
        totalUsersApi(accessToken)
            .then(response => {
                setUserT(response.count)
            });
    }, [usersT]);

    useEffect(() => {
        const accessToken = getAccToken();
        totalPostsApi(accessToken)
            .then(response => {
                setPostsT(response.count)
            });
    }, [postsT]);

    useEffect(() => {
        const accessToken = getAccToken();
        totalCursosApi(accessToken)
            .then(response => {
                setCursosT(response.count)
            });
    }, [cursosT]);

    useEffect(() => {
        const accessToken = getAccToken();
        totalMenuApi(accessToken)
            .then(response => {
                setMenuT(response.count)
            });
    }, [cursosT]);
    
    return ( 
    <div className="admin">
        <Dashboard usersT={usersT} postsT={postsT} cursosT={cursosT} menuT={menuT}/>
    </div>
    );
}

export default Admin;