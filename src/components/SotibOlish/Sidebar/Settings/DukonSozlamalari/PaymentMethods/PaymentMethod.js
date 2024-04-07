import {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { Checkbox } from 'antd';
import 'moment/locale/uz-latn'

import users from "../../../../../../reducer/users";
import PayReducer,
    {getPay, AddPaymentMethod, DeletePaymentMethod,EditPaymentMethod,EditPaymentMethodMain}
    from "../../../../../../reducer/PayReducer";
import Loading from "../../../../../Loading";
import ModalLoading from "../../../../../ModalLoading";
import AgreeModal from "../../../../../AgreeModal";
import MainHeaderText from "../../../../../Components/MainHeaderText";
import CardBody from "../../../../../Components/CardBody";
import CommonTable from "../../../../../Components/CommonTable";
import {AddButton, DeleteButton, EditButton} from "../../../../../Components/Buttons";

import './paymentMethod.css'

function PaymentMethod({
                           users,
                           PayReducer,
                           getPay, AddPaymentMethod, DeletePaymentMethod,EditPaymentMethod,EditPaymentMethodMain
                       }) {
    const [active, setActive] = useState(false)
    const [saveModal, setSaveModal] = useState(false)
    const {register, reset, setValue, handleSubmit, formState: {errors}} = useForm();
    const [editID, setEditID] = useState(null)
    const [loading, setLoading] = useState(false)
    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState('')
    const {t} = useTranslation()

    const columns = [
        {
            title: t('set.5'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title:'Asosiyligi',
            dataIndex: 'main',
            key: 'main',
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
            render: (item, values) => <div className={'d-flex justify-content-start gap-2 flex-wrap'}>
                <EditButton onClick={() => {editPaymentMethodById(values.id)}} />
                <DeleteButton onClick={() => {deletePaymentMethodById(values.id)}} />
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
                <AddButton text={t('button.add')} onClick={toggle} />
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
