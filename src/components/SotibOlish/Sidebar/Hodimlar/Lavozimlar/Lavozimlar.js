import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useHistory} from 'react-router-dom'
import {useTranslation} from "react-i18next";

import LavozimReducer, {getLavozim, saveLavozim, editLavozim, deleteLavozim} from "../reducer/LavozimReducer";
import users from "../../../../../reducer/users";
import Loading from "../../../../Loading";
import AgreeModal from "../../../../AgreeModal";
import ModalLoading from "../../../../ModalLoading";
import MainHeaderText from "../../../../Components/MainHeaderText";
import CommonTable from "../../../../Components/CommonTable";
import CardBody from "../../../../Components/CardBody";
import {AddButton, DeleteButton, EditButton} from "../../../../Components/Buttons";

import "./lavozimlar.css"

function Lavozimlar({getLavozim, users, deleteLavozim, LavozimReducer}) {
    const {t} = useTranslation()
    const history = useHistory();
    const [saveModal, setSaveModal] = useState(false)
    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (users.getRole) {
            getLavozim(users.businessId)
        }
    }, [LavozimReducer.current])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: 20,
        },
        {
            title: t('Roles.1'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('ol.103'),
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: t('ol.20'),
            key: 'operation',
            render: (item, values) => <div className={'d-flex justify-content-start gap-2 flex-wrap'}>
                {
                    users.editRole && <EditButton
                        onClick={() => {history.push('/main/addRole/' + values.id)}}
                    />
                }
                {
                    users.deleteRole && <DeleteButton onClick={() => {deleteRoleById(values.id)}}/>
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
            setLoading(true)
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
                        <AddButton text={t('button.add')} />
                    </Link> : null
                }
            </div>
            {
                users.getRole ?
                    <CardBody>
                        <Loading spinning={loading}>
                            {
                                LavozimReducer.roles?.length > 0 ?
                                    <CommonTable pagination={false} data={LavozimReducer.roles} columns={columns}
                                                 size={LavozimReducer.roles?.length} page={0}/>
                                    :
                                    <div>
                                        <h4 className={'text-center'}>{LavozimReducer.message}</h4>
                                    </div>
                            }
                        </Loading>
                    </CardBody>
                    : null
            }
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