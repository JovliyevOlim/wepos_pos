import React from 'react'
import "./lavozimlar.css"
import {Link,useHistory} from 'react-router-dom'
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import LavozimReducer, {getLavozim, saveLavozim, editLavozim, deleteLavozim} from "../reducer/LavozimReducer";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import AgreeModal from "../../../../AgreeModal";
import ModalLoading from "../../../../ModalLoading";
import MainHeaderText from "../../../../Components/MainHeaderText";
import {ButtonAnt} from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import CardBody from "../../../../Components/CardBody";

function Lavozimlar({getLavozim, users, deleteLavozim, LavozimReducer}) {


    const {t} = useTranslation()
    const history = useHistory();
    useEffect(() => {
        if (users.getRole) {
            getLavozim(users.businessId)
        }
    }, [LavozimReducer.current])

    const [saveModal, setSaveModal] = useState(false)
    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState(null)

    const [loading, setLoading] = useState(false)
    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: 20,
        },
        {
            title: t('Roles.1'),
            width: 50,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('ol.103'),
            dataIndex: 'description',
            key: 'description',
            width: 50,
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-start gap-1 flex-wrap'}>
                {users.editRole &&
                    <ButtonAnt text={t('button.edit')} type={'primary'} onClick={() => {
                        history.push('/main/addRole/' + values.id)
                    }
                    } icon={<EditOutlined/>}/>
                }
                {
                    users.deleteRole && <ButtonAnt text={t('button.delete')} danger={true} type={'primary'} onClick={() => {
                        deleteRoleById(values.id)
                    }
                    } icon={<DeleteOutlined/>}/>
                }

            </div>,
        },
    ];

    function deleteRoleById(id) {
        setdeletemodal(!deletemodal)
        setdeletID(id)
    }

    function deleteFunc() {
        deleteLavozim(deleteID)
        setSaveModal(true)
    }

    useEffect(() => {
        if (LavozimReducer.saveRoleBool) {
            setdeletemodal(false)
            setdeletID(null)
            setLoading(false)
        }
        setTimeout(() => {
            setSaveModal(false)
        }, 500)
    }, [LavozimReducer.current])


    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 500)
    }, [LavozimReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <MainHeaderText text={t('sidebar.roles')}/>
                {
                    users.addRole ? <Link to={'/main/addRole'}>
                        <ButtonAnt text={t('button.add')} icon={<PlusOutlined/>} type={'primary'}/>
                    </Link> : ''
                }
            </div>
            <CardBody>
                {
                    users.getRole ?
                        loading ?
                            LavozimReducer.roles?.length > 0 ?
                                    <CommonTable pagination={false} data={LavozimReducer.roles} columns={columns} size={LavozimReducer.roles?.length} page={0}/>
                               :
                                <div>
                                    <h4 className={'text-center'}>{LavozimReducer.message}</h4>
                                </div>
                            : <Loading/> : ''
                }
            </CardBody>
            <AgreeModal deletemodal={deletemodal} deleteFunc={deleteFunc}
                        deleteModaltoggle={() => setdeletemodal(prevState => !prevState)}/>
            <ModalLoading isOpen={saveModal}/>
        </>
    )
}

export default connect((LavozimReducer, users), {
    getLavozim,
    saveLavozim,
    deleteLavozim,
    editLavozim
})(Lavozimlar)