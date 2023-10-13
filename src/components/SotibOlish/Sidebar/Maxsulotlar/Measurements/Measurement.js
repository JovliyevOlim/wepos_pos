import React from 'react'
import {useState, useEffect} from "react";
import {connect} from "react-redux";
import './measurement.css'
import {Modal, ModalHeader, ModalFooter, ModalBody} from "reactstrap";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import {toast} from "react-toastify";
import ModalLoading from "../../../../ModalLoading";
import MeasurementReducer, {
    saveMeasurement,
    getMeasurement,
    deleteMeasurement,
    editMeasurement
} from "../../../../../reducer/MeasurementReducer";
import AgreeModal from "../../../../AgreeModal";
import MainHeaderText from "../../../../Components/MainHeaderText";
import {ButtonAnt} from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";
import CardBody from "../../../../Components/CardBody";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
function Measurement({users, saveMeasurement, MeasurementReducer, getMeasurement, deleteMeasurement, editMeasurement}) {

    const {t} = useTranslation()
    const [addMeasureActive, setAddMeasureActive] = useState(false)
    const [name, setName] = useState('')
    const [activeModal, setActiveModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editId, setEditId] = useState(null)
    const [isCheck, setIsCheck] = useState(false)

    const columns = [
        {
            title: '№',
            dataIndex: 'index',
            rowScope: 'row',
            width: 20,
        },
        {
            title: t('as.4'),
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
                    users.measurementRoles &&
                    <ButtonAnt text={t('button.edit')} type={'primary'} onClick={() => {
                        editB(values.id)
                    }
                    } icon={<EditOutlined/>}/>
                }
                {
                    users.measurementRoles && <ButtonAnt text={t('button.delete')} danger={true} type={'primary'} onClick={() => {
                        deleteMeasureById(values.id)
                    }
                    } icon={<DeleteOutlined/>}/>
                }

            </div>,
        },
    ];

    function editB(id) {
        setEditId(id)
        setAddMeasureActive(true)
        if (MeasurementReducer.measurements) {
            MeasurementReducer.measurements.map(item => {
                if (item.id === id) {
                    setName(item.name)
                }
            })
        }
    }

    function toggle() {
        setAddMeasureActive(!addMeasureActive)
        setEditId(null)
        setName('')
        setIsCheck(false)
    }

    function saqla() {
        if (!name) {
            setIsCheck(true)
        } else {
            if (editId) {
                editMeasurement({
                    id: editId,
                    name: name,
                    businessId: users.businessId
                })
            } else {
                saveMeasurement({
                    name: name,
                    businessId: users.businessId
                })
            }
            setActiveModal(true)
        }
    }


    useEffect(() => {
        getMeasurement(users.businessId)
    }, [MeasurementReducer.current])

    useEffect(() => {
        if (MeasurementReducer.saveBoolean) {
            setAddMeasureActive(false)
            setName('')
            setLoading(false)
            setEditId(null)
        }
        setActiveModal(false)
        setDeleteModal(false)
    }, [MeasurementReducer.current])


    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteID, setdeletID] = useState('')

    function deleteFunc() {
        setLoading(false)
        deleteMeasurement(deleteID)
    }

    function deleteMeasureById(id) {
        setDeleteModal(!deleteModal)
        setdeletID(id)
    }


    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 500)
    }, [MeasurementReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div >
            <div className="col-md-12 d-flex justify-content-between align-items-center">
                <MainHeaderText text={t('sidebar.measurement')}/>
                {
                    users.measurementRoles &&
                    <ButtonAnt onClick={() => setAddMeasureActive(true)} icon={<PlusOutlined />} type={'primary'} text={t('button.add')} />
                }

            </div>
            <CardBody>

                {

                    loading ?
                        MeasurementReducer.measurements.length > 0 ?
                            <div>
                                <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar pb-4">
                                    <CommonTable data={MeasurementReducer.measurements} columns={columns} pagination={false} size={MeasurementReducer.measurements.length} page={0} />
                                </div>
                            </div> : <div>
                                <h4 className={'text-center'}>{MeasurementReducer.message}</h4>
                            </div> : <Loading/>
                }


                <Modal isOpen={addMeasureActive} toggle={toggle}>
                    <ModalHeader>
                        {
                            editId ? (t('Roles.42')) : (t('as.96'))
                        }
                    </ModalHeader>
                    <ModalBody>
                        <label htmlFor={'name'}>{t('as.41')}</label>
                        <input value={name} placeholder={t('as.41')}
                               onChange={(e) => setName(e.target.value)} type="text" id={'name'}
                               className={'form-control'}/>
                        {
                            isCheck && !name && <div>
                                <p className={"text-danger text-center m-0 p-0"}>{t('as.89')}</p>
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <button className={'btn btn-danger'} onClick={toggle}>{t('Buttons.7')}</button>
                        <button className={'btn btn-success'} onClick={saqla}>{t('Buttons.6')}</button>
                    </ModalFooter>

                </Modal>
            </CardBody>
            <ModalLoading isOpen={activeModal}/>
            <AgreeModal deleteFunc={deleteFunc} deleteModaltoggle={() => setDeleteModal(prevState => !prevState)}
                        deletemodal={deleteModal}/>
        </div>
    )
}

export default connect((users, MeasurementReducer), {
    saveMeasurement,
    getMeasurement, deleteMeasurement, editMeasurement
})(Measurement)
