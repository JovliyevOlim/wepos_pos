import React from 'react'
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
import CommonTable from "../../../../Components/CommonTable";
import CardBody from "../../../../Components/CardBody";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";

function Firmalar({getFirma, users, firmalar, saveFirma, editFirma, deleteFirma, FirmaReducer,}) {

    const {t} = useTranslation()
    const [name, setName] = useState('')
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [saveModal, setSaveModal] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'index',
            rowScope: 'row',
            width: 20,
        },
        {
            title: t('Firms.1'),
            width: 50,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-start gap-1 flex-wrap'}>
                {
                    users.brandRoles &&
                    <ButtonAnt text={t('button.edit')} type={'primary'} onClick={() => {
                        editB(values.id)
                    }
                    } icon={<EditOutlined/>}/>
                }
                {
                    users.brandRoles &&
                    <ButtonAnt text={t('button.delete')} danger={true} type={'primary'} onClick={() => {
                        deleteBrandById(values.id)
                    }
                    } icon={<DeleteOutlined/>}/>
                }

            </div>,
        },
    ];


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
            setLoading(true)
    }, [FirmaReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div>
            <div className="col-md-12 d-flex justify-content-between align-items-center">
                <MainHeaderText text={t('sidebar.brand')}/>
                {
                    users.brandRoles ?
                        <ButtonAnt type={'primary'} icon={<PlusOutlined/>} text={t('button.add')}
                                   onClick={toggle}/> : ''
                }
            </div>
            <CardBody>
                <Loading spinning={loading}>
                    {
                        FirmaReducer.firmalar.length > 0 ?
                            <div>
                                <div className="table-responsive table-wrapper-scroll-y  pb-4">
                                    <CommonTable pagination={false} data={FirmaReducer.firmalar}
                                                 size={FirmaReducer.firmalar.length} page={0} columns={columns}/>
                                </div>
                            </div> : <div>
                                <h4 className={'text-center'}>{FirmaReducer.message}</h4>
                            </div>
                    }
                </Loading>
            </CardBody>
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
                        isCheck && !name && <div>
                            <p className={'text-danger text-center m-0 p-0'}>{t('as.10')}</p>
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-danger'} onClick={toggle}>{t('Buttons.7')}</button>
                    <button className={'btn btn-success'} onClick={saqla}>{t('Buttons.6')}</button>
                </ModalFooter>

            </Modal>
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deleteModaltoggle={() => setdeletemodal(prevState => !prevState)} deleteFunc={deleteFunc}
                        deletemodal={deletemodal}/>
        </div>

    )
}

export default connect((FirmaReducer, users), {
    getFirma,
    saveFirma,
    editFirma,
    deleteFirma
})(Firmalar)
