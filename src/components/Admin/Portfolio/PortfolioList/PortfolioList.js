import React, { useState } from 'react';
import { List, Button, Modal as ModalAntd, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAccToken} from '../../../../api/auth';
import { deleteProyectApi } from '../../../../api/portfolio';
import PortfolioEdit from '../PortfolioEdit';
import Modal from '../../../Modal';
import './PortfolioList.scss';

const { confirm } = ModalAntd;

const PortfolioList = (props) => {
    const { proyects, setReloadProyects } = props;
    const [ isVisible, setIsVisible ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalContent, setModalContent ] = useState(null)

    const addProyectModal = () => {
        setIsVisible(true);
        setModalTitle("Creando nuevo proyecto");
        setModalContent(<PortfolioEdit setIsVisible={setIsVisible} setReloadProyects={setReloadProyects} />)
    }

    const editProyectModal = proyect => {
        setIsVisible(true);
        setModalTitle("Editando proyecto");
        setModalContent(<PortfolioEdit setIsVisible={setIsVisible} setReloadProyects={setReloadProyects} proyect={proyect} />)
    }

    const deleteProyect = proyect => {
        const accesToken = getAccToken();

        confirm({
            title: "Eliminar curso?",
            content: `¿Estas seguro de que quieres eliminar este curso?`,
            okText: "Eliminar",
            cancelText: "Cancelar",
            onOk() {
                deleteProyectApi(accesToken, proyect._id)
                    .then(response => {
                        notification['success']({
                            message: response.message
                        });
                        setReloadProyects(true);
                    })
                    .catch(() => {
                        notification["error"]({
                            message: "Error en el servidor, intente de nuevos más tarde"
                        })
                    })
            }
        })
    }

    return ( 
        <div className="proyects-list">
            <div className="proyects-list__header">
                <Button type="primary" onClick={addProyectModal}>Nuevo Proyecto</Button>
            </div>
            <div className="proyects-list__items">
                {proyects.map((proyect) => (
                    <List.Item
                    actions={[
                        <Button 
                            type="primary"
                            onClick={() => editProyectModal(proyect)}
                        ><EditOutlined /></Button>,
                        // <Button 
                        //     type="danger"
                        //     //onClick={desactiveUser}
                        // ><StopOutlined /></Button>,
                        <Button 
                            type="danger"
                            onClick={() => deleteProyect(proyect)}
                        ><DeleteOutlined /></Button>
                    ]}
                >
                    <img 
                            src={proyect.img}
                            alt={proyect.title}
                            style={{ width: "100px", marginRight: "20px"}}
                        />
                        <List.Item.Meta
                            title={proyect.title}
                            description={proyect.description}
                        />
                    </List.Item>    
                ))}
            </div>
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

export default PortfolioList;