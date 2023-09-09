import React from 'react'
import Excel from '../../../../../img/Excel.png'
import Edit from '../../../../../img/Edit.png'
import Delete from '../../../../../img/Delete.png'
import {useState, useEffect} from "react";
import {connect} from "react-redux";
import './firmalar.css'
import {Modal, ModalHeader, ModalFooter, ModalBody} from "reactstrap";
import FirmaReducer, {deleteFirma, editFirma, getFirma, saveFirma,} from "../reducer/FirmaReducer";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";
import MainHeaderText from "../../../../Components/MainHeaderText";
import {ButtonAnt} from "../../../../Components/SelectAnt";

function Firmalar({getFirma, users, firmalar, saveFirma, editFirma, deleteFirma, FirmaReducer,}) {

    const {t} = useTranslation()
    const [name, setName] = useState('')
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [saveModal, setSaveModal] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    function editB(id) {
        setActive(true)
        FirmaReducer.firmalar.map(item => {
            if (item.id === id) {
                setName(item.name)
                setEditId(id)
            }
        })
    }


    function saqla() {
        if (!name) {
            setIsCheck(true)
        } else {
            if (editId) {
                editFirma(
                    {
                        id: editId,
                        name,
                        businessId: users.businessId,
                    }
                )
            } else {
                saveFirma(
                    {
                        name,
                        businessId: users.businessId,
                    }
                )
            }
            setSaveModal(true)
        }
    }


    function deleteF(item) {
        deleteFirma(item.id)
    }

    const [active, setActive] = useState(false)

    function toggle() {
        setActive(!active)
        setName('')
        setEditId(null)
        setIsCheck(false)
    }


    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState('')


    function deleteFunc() {
        deleteFirma(deleteID)
    }


    function deleteBrandById(item) {
        setdeletemodal(!deletemodal)
        setdeletID(item)
    }

    useEffect(() => {
        if (FirmaReducer.saveBoolean) {
            setName('')
            setActive(false)
            setLoading(false)
            setEditId(null)
            setdeletID('')
            setdeletemodal(false)
        }
        setSaveModal(false)
    }, [FirmaReducer.current])

    useEffect(() => {
        getFirma(users.businessId)
    }, [FirmaReducer.current])

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 500)
    }, [FirmaReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div >
            <div className="col-md-12 d-flex justify-content-between align-items-center">
                <MainHeaderText text={t('as.9')}/>
                {
                    users.brandRoles ?
                        <ButtonAnt type={'primary'} text={t('ol.2')} onClick={toggle}/>: ''
                }
            </div>
            <div className="rowStyleFR">
                {
                    loading ?
                        FirmaReducer.firmalar.length > 0 ?
                            <div>
                                <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar pb-4">
                                    <table className='table table-striped table-bordered mt-4'>
                                        <thead>
                                        <tr>
                                            <th>T/R</th>
                                            <th>{t('Firms.1')}</th>
                                            <th>{t('as.6')}</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {
                                            FirmaReducer.firmalar.map((item, index) => <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    {
                                                        users.brandRoles ?

                                                            <button onClick={() => editB(item.id)}
                                                                    className='taxrirlash'><img
                                                                src={Edit} alt=""/> {t('Buttons.1')}
                                                            </button>
                                                            : ''
                                                    }
                                                    {
                                                        users.brandRoles?
                                                            <button className='ochirish'
                                                                    onClick={() => deleteBrandById(item.id)}><img
                                                                src={Delete}
                                                                alt=""/> {t('Buttons.3')}
                                                            </button>
                                                            : ''
                                                    }
                                                </td>


                                            </tr>)
                                        }

                                        </tbody>
                                    </table>
                                </div>
                            </div> : <div>
                                <h4 className={'text-center'}>{FirmaReducer.message}</h4>
                            </div> : <Loading/>
                }

                <Modal isOpen={active} toggle={toggle}>
                    <ModalHeader>
                        {t('Sections.8')}
                    </ModalHeader>
                    <ModalBody>
                        <label htmlFor={'l'}>{t('Firms.4')}</label>
                        <input value={name} placeholder={'Brand nomi'}
                               onChange={(e) => setName(e.target.value)} type="text" id={'l'}
                               className={'form-control'}/>
                        {
                            isCheck && !name &&  <div>
                                <p className={'text-danger text-center m-0 p-0'}>{t('as.10')}</p>
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <button className={'btn btn-danger'} onClick={toggle}>{t('Buttons.7')}</button>
                        <button className={'btn btn-success'} onClick={saqla}>{t('Buttons.6')}</button>
                    </ModalFooter>

                </Modal>
            </div>
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deleteModaltoggle={()=>setdeletemodal(prevState => !prevState)} deleteFunc={deleteFunc} deletemodal={deletemodal}/>
        </div>

    )
}

export default connect((FirmaReducer, users), {
    getFirma,
    saveFirma,
    editFirma,
    deleteFirma
})(Firmalar)
