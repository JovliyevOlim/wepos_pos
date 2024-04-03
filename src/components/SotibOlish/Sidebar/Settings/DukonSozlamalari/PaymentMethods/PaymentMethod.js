import './paymentMethod.css'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import users from "../../../../../../reducer/users";
import Loading from "../../../../../Loading";
import ModalLoading from "../../../../../ModalLoading";
import AgreeModal from "../../../../../AgreeModal";
import {useTranslation} from "react-i18next";
import MainHeaderText from "../../../../../Components/MainHeaderText";
import {ButtonAnt} from "../../../../../Components/SelectAnt";
import CardBody from "../../../../../Components/CardBody";
import CommonTable from "../../../../../Components/CommonTable";
import { Checkbox } from 'antd';
import 'moment/locale/uz-latn'
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import PayReducer, {getPay, AddPaymentMethod, DeletePaymentMethod,EditPaymentMethod,EditPaymentMethodMain} from "../../../../../../reducer/PayReducer";

function PaymentMethod({
                           users,
                           PayReducer,
                           getPay, AddPaymentMethod, DeletePaymentMethod,EditPaymentMethod,EditPaymentMethodMain
                       }) {

    const [active, setActive] = useState(false)
    const [saveModal, setSaveModal] = useState(false)
    const {register, reset, setValue, handleSubmit, formState: {errors}, resetField} = useForm();
    const [editID, setEditID] = useState(null)
    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const columns = [
        {
            title: t('set.5'),
            dataIndex: 'name',
            key: 'name',
            width: '50px'
        },
        {
            title:'Asosiyligi',
            dataIndex: 'main',
            key: 'main',
            width: '50px',
            render:(item,value)=><Checkbox checked={item} onChange={()=>{
                EditPaymentMethodMain({
                    id:value.id,
                    params:{
                        main:!item
                    }
                })
            }}></Checkbox>
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-start gap-1 flex-wrap'}>


                <ButtonAnt text={t('ol.78')} type={'primary'} onClick={() => {
                    editPaymentMethodById(values.id)
                }
                } icon={<EditOutlined/>}/>

                <ButtonAnt text={t('ol.79')} danger={true} type={'primary'} onClick={() => {
                    deletePaymentMethodById(values.id)
                }
                } icon={<DeleteOutlined/>}/>


            </div>,
        },
    ];


    function toggle() {
        setActive(!active)
        setEditID(null)
        reset('')
    }

    function editPaymentMethodById(id) {
        toggle()
        setEditID(id)
        PayReducer.paymethod.map(item => {
            if (item.id === id) {
                setValue('name', item.name)
            }
        })
    }




    useEffect(() => {
        getPay(users.businessId)
    }, [PayReducer.current])


    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState('')


    function deletePaymentMethodById(id) {
        setdeletemodal(!deletemodal)
        setdeletID(id)
    }

    function deleteFunc() {
        DeletePaymentMethod(deleteID)
        setSaveModal(true)
    }




    function onSubmit(data) {
        if (editID) {
            EditPaymentMethod({
                params:{
                    name:data.name
                },
                id:editID
            })
        } else {
            AddPaymentMethod({
                ...data, active: true, businessId: users.businessId
            })
        }
        setSaveModal(true)
    }

    useEffect(() => {
        if (PayReducer.saveBoolean) {
            setActive(false)
            setdeletemodal(false)
            setdeletID('')
            setLoading(false)
        }
        setTimeout(() => {
            setSaveModal(false)
        }, 500)

    }, [PayReducer.current])


    useEffect(() => {
        setLoading(false)
    }, [])


    useEffect(() => {
        setLoading(true)
    }, [PayReducer.getBoolean])

    return (
        <div>
            <div className={'d-flex col-md-12 mb-5 align-items-center justify-content-between'}>
                <MainHeaderText text={"To'lov turlari"}/>
                <ButtonAnt text={t('ol.2')} type={'primary'} onClick={toggle}/>
            </div>

            <CardBody>
                <Loading spinning={loading}>
                    {
                        PayReducer.paymethod.length > 0 ?
                            <div>
                                <div className="table-responsive">
                                    <CommonTable pagination={false} data={PayReducer.paymethod} columns={columns}/>
                                </div>
                            </div> : PayReducer.getMessage
                    }
                </Loading>
            </CardBody>


            <Modal isOpen={active} toggle={toggle}>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>
                        {
                            editID ? (t('mah.24')) : (t('as.96'))
                        }
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-md-12 d-flex flex-wrap px-4">
                                <div className="col-md-12">
                                    <label htmlFor={'nomi'}>{t('as.4')}</label>
                                    <input {...register('name', {required: true})}
                                           placeholder={errors.name ? errors.name.type === 'required' && (t("To'lov turi nomi")) : (t("To'lov turi nomini kiritiing"))}
                                           type="text" className={'form-control mb-3'} id={'nomi'}/>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type={'button'} className={'btn btn-danger'} onClick={toggle}>{t('set.10')}
                        </button>
                        <button type={'submit'} className={'btn btn-success'}>{t('set.11')}</button>

                    </ModalFooter>
                </form>
            </Modal>
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deletemodal={deletemodal} deleteFunc={deleteFunc}
                        deleteModaltoggle={() => setdeletemodal(prevState => !prevState)}/>
        </div>
    )
}

export default connect((users, PayReducer), {
    getPay, AddPaymentMethod, DeletePaymentMethod,EditPaymentMethod,EditPaymentMethodMain
})(PaymentMethod)
