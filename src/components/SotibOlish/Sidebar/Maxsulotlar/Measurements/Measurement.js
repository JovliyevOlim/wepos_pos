import React from 'react'
import Excel from '../../../../../img/Excel.png'
import Edit from '../../../../../img/Edit.png'
import Delete from '../../../../../img/Delete.png'
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
import MainHeaderText from "../../../../Svg/MainHeaderText";
import {ButtonAnt} from "../../../../Svg/SelectAnt";

function Measurement({users, saveMeasurement, MeasurementReducer, getMeasurement, deleteMeasurement, editMeasurement}) {

    const {t} = useTranslation()
    const [addMeasureActive, setAddMeasureActive] = useState(false)
    const [name, setName] = useState('')
    const [activeModal, setActiveModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editId, setEditId] = useState(null)
    const [isCheck, setIsCheck] = useState(false)


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
                <MainHeaderText text={t('mah.3')}/>
                {
                    users.measurementRoles && <ButtonAnt onClick={() => setAddMeasureActive(true)} type={'primary'} text={t('as.96')} />
                }

            </div>
            <div className="rowStyleFR">

                {

                    loading ?
                        MeasurementReducer.measurements.length > 0 ?
                            <div>
                                <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar pb-4">
                                    <table className='table table-striped table-bordered mt-4'>
                                        <thead>
                                        <tr>
                                            <th>T/R</th>
                                            <th>{t('as.4')}</th>
                                            <th>{t('as.6')}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            MeasurementReducer.measurements.map((item, index) => <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    {
                                                        users.measurementRoles && <button onClick={() => editB(item.id)}
                                                                                         className='taxrirlash'><img
                                                            src={Edit} alt=""/> {t('Buttons.1')}
                                                        </button>
                                                    }
                                                    {
                                                        users.measurementRoles && <button className='ochirish'
                                                                                           onClick={() => deleteMeasureById(item.id)}>
                                                            <img
                                                                src={Delete}
                                                                alt=""/> {t('Buttons.3')}
                                                        </button>
                                                    }


                                                </td>
                                            </tr>)
                                        }

                                        </tbody>
                                    </table>
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
            </div>
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
