import React from 'react';
import { Card, Space } from 'antd';
import { IdcardTwoTone, FileAddTwoTone, BookTwoTone, ProfileTwoTone } from '@ant-design/icons';
import './Dashboard.scss';
const { Meta } = Card;

const Dashboard = (props) => {
    const { usersT, postsT, cursosT, menuT } = props;

    return ( 
        <div className="dashboard-list">
            <Space size="middle">
                <Card
                    className="dashboard-list__card"
                    title="Usuarios Registrados"
                >
                    <Meta
                        avatar={
                            <IdcardTwoTone twoToneColor="#52c41a" style={{ fontSize: '95px' }}/>
                        }
                        title={usersT}
                        description="Vea el panel de usuarios para más información"
                    />
                </Card>

                <Card
                    className="dashboard-list__card"
                    title="Entradas del blog"
                >
                    <Meta
                        avatar={
                            <FileAddTwoTone twoToneColor="#eb2f96" style={{ fontSize: '100px' }}/>
                        }
                        title={postsT}
                        description="Vea el panel del blog para más información"
                    />
                </Card>
            </Space>
            <Space size="middle">
                <Card
                    className="dashboard-list__card"
                    title="Cursos realizados"
                >
                    <Meta
                        avatar={
                            <BookTwoTone twoToneColor="#ed3b65" style={{ fontSize: '100px' }}/>
                        }
                        title={cursosT}
                        description="Vea el panel del cursos para más información"
                    />
                </Card>

                <Card
                    className="dashboard-list__card"
                    title="Menú totales"
                >
                    <Meta
                        avatar={
                            <ProfileTwoTone style={{ fontSize: '100px' }}/>
                        }
                        title={menuT}
                        description="Vea el panel del menu para más información"
                    />
                </Card>
                
            </Space>
        </div>
    );
}

export default Dashboard;