import React from 'react'
import "./lavozimlar.css"
import Edit from '../../../../../img/Edit.png'
import Delete from '../../../../../img/Delete.png'
import {Link} from 'react-router-dom'
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import LavozimReducer, {getLavozim, saveLavozim, editLavozim, deleteLavozim} from "../reducer/LavozimReducer";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import {Modal, ModalBody, ModalFooter} from "reactstrap";
import Loading from "../../../../Loading";
import AgreeModal from "../../../../AgreeModal";
import ModalLoading from "../../../../ModalLoading";
import MainHeaderText from "../../../../Components/MainHeaderText";
import {ButtonAnt} from "../../../../Components/SelectAnt";

function Lavozimlar({getLavozim, users, deleteLavozim, LavozimReducer}) {


    const {t} = useTranslation()

    useEffect(() => {
        if (users.getRole) {
            getLavozim(users.businessId)
        }
    }, [LavozimReducer.current])

    const [saveModal, setSaveModal] = useState(false)
    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState(null)

    const [loading, setLoading] = useState(false)

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
                <MainHeaderText text={t('ol.102')}/>
                {
                    users.addRole ? <Link to={'/main/addRole'}>
                        <ButtonAnt text={t('ol.2')} type={'primary'}/>
                    </Link> : ''
                }
            </div>
            <div className="rowStyleL">
                {
                    users.getRole ?
                        loading ?
                            LavozimReducer.roles?.length > 0 ?
                                <div>
                                    <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
                                        <table className='table table-striped table-bordered mt-4'>
                                            <thead>
                                            <tr>
                                                <th>T/R</th>
                                                <th>{t('Roles.1')}</th>
                                                <th>{t('ol.103')}</th>
                                                <th>{t('Buttons.9')}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                LavozimReducer.roles.map((item, index) => <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        {
                                                            users.editRole ?
                                                                <Link to={'/main/addRole/' + item.id}>
                                                                    <button className='taxrirlash'><img src={Edit}
                                                                                                        alt=""/> {t('Buttons.1')}
                                                                    </button>
                                                                </Link> : ''
                                                        }
                                                        {
                                                            users.deleteRole ? <button className='ochirish'
                                                                                       onClick={() => deleteRoleById(item.id)}>
                                                                <img src={Delete} alt=""/> {t('Buttons.3')}
                                                            </button> : ''
                                                        }

                                                    </td>
                                                </tr>)
                                            }

                                            </tbody>
                                        </table>
                                    </div>

                                </div> :
                                <div>
                                    <h4 className={'text-center'}>{LavozimReducer.message}</h4>
                                </div>
                            : <Loading/> : ''
                }
            </div>
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