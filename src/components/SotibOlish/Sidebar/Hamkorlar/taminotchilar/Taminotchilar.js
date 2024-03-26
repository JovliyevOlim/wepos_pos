import "./taminotchilar.css"
import React, {useEffect} from "react";
import {connect} from "react-redux";
import TaminotReducer, {
    getTaminot,
    saveTaminot,
    editTaminot,
    deleteTaminot,
    debtSupplier
} from "../reducer/TaminotReducer";
import users from "../../../../../reducer/users";
import {useState} from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import branchreducer, {getbranch} from "../../../../../reducer/branchreducer";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import AgreeModal from "../../../../AgreeModal";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import MainHeaderText, {AddOrEditText} from "../../../../Components/MainHeaderText";
import {ButtonAnt, SearchAnt, TableButton} from "../../../../Components/SelectAnt";
import CardBody from "../../../../Components/CardBody";
import {camelize, prettify} from "../../../../../util";
import {DeleteOutlined, DollarOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import CommonTable from "../../../../Components/CommonTable";
import {Space, Typography} from 'antd';

const {Text, Link} = Typography;

function Taminotchilar({
                           getTaminot,
                           saveTaminot,
                           editTaminot, PayReducer, getPay,
                           deleteTaminot,
                           users,
                           TaminotReducer,
                           debtSupplier
                       }) {


    const [active, setActive] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const {
        register: register1,
        setValue: setValue1,
        reset: reset1,
        handleSubmit: handleSubmit1,
        resetField: resetField1,
        formState: {errors: errors1}
    } = useForm()
    const [editId, setEditId] = useState(null);
    const [deletemodal, setdeletemodal] = useState(false);
    const [deleteID, setdeletID] = useState(null);
    const [search, setSearch] = useState('');
    const [qarz, setqarz] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [isCheck, setIsCheck] = useState(false)
    const {t} = useTranslation()


    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: 20,
        },
        {
            title: t('bal.47'),
            width: 80,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('bal.48'),
            width: 100,
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: t('bal.25'),
            width: 100,
            dataIndex: 'debt',
            key: 'debt',
            render: (item) => <div>
                {
                    item >= 0 ? <Text type="success" style={{fontWeight: '800'}}>{prettify(item)} so'm</Text>
                        : <Text type="danger" style={{fontWeight: '800'}}>{prettify(item)} so'm</Text>
                }
            </div>
        },
        {
            title: t('bal.27'),
            key: 'operation',
            width: 200,
            render: (item, values) => <div className={'d-flex justify-content-start gap-1 flex-wrap'}>
                {users.editSupplier &&
                    <ButtonAnt type={'primary'} onClick={() => editt(values.id)} text={t('button.edit')}
                               icon={<EditOutlined/>}/>
                }

                <ButtonAnt color={'white'} bgColor={'green'} type={'primary'} text={t('button.payDebt')}
                           onClick={() => debt2(values.id)}
                           icon={<DollarOutlined/>}/>
                {
                    users.deleteSupplier && <ButtonAnt danger={true} type={'primary'} text={t('ol.79')}
                                                       onClick={() => deleteSupplierById(values.id)}
                                                       icon={<DeleteOutlined/>}/>
                }
            </div>,

        },
    ];


    function toggle() {
        setActive(!active)
        setName('')
        setPhoneNumber('')
        setEditId(null)
        setIsCheck(false)
    }

    function editt(id) {
        setActive(true)
        setEditId(id)
        TaminotReducer.supplier?.list.map(item => {
            if (item.id === id) {
                setName(item.name)
                setPhoneNumber(item.phoneNumber)
            }
        })

    }


    function debt2(id) {
        setqarz(true)
        setEditId(id)
        TaminotReducer.supplier?.list.map(item => {
            if (item.id === id) {
                setValue1('sum', item.debt)
            }
        })
    }

    function toggle3() {
        setqarz(!qarz)
        resetField1('sum', '')
        resetField1('paymentMethodId', '')
        setEditId(null)
    }


    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };

    const handleLimitChange = (event, size) => {
        setLimit(parseInt(size));
    };


    const [saveModal, setSaveModal] = useState(false)

    function deleteFunc() {
        deleteTaminot(deleteID)
        setSaveModal(true)
    }

    function deleteSupplierById(item) {
        setdeletemodal(!deletemodal)
        setdeletID(item)
    }

    function onSubmit() {
        if (name === "" || phoneNumber === "") {
            setIsCheck(true)
        } else {
            if (editId) {
                editTaminot({
                    name, phoneNumber, businessId: users.businessId, id: editId
                })
            } else {
                save()
            }
            setSaveModal(true)
        }

    }

    function onSubmitDebt(data) {
        debtSupplier({
            ...data, id: editId,
        })
    }

    useEffect(() => {
        if (TaminotReducer.saveBoolean) {
            setActive(false)
            setName('')
            setPhoneNumber('')
            setEditId('')
            setLoading(false)
            setqarz(false)
            setdeletemodal(false)
            setdeletID(null)
        }
        setSaveModal(false)
    }, [TaminotReducer.current])

    function save() {
        saveTaminot(
            {
                name, phoneNumber, businessId: users.businessId
            }
        )
    }


    useEffect(() => {
        setLoading(false)
        if (users.getSupplier) {
            getTaminot({
                id: users.businessId,
                params: {
                    page: page,
                    size: limit,
                    name: search
                }
            })
        }
    }, [TaminotReducer.current, page, limit, search])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
            setLoading(true)
    }, [TaminotReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
        getPay(users.businessId)
    }, [])


    return (
        <>
            <div className={'d-flex align-items-center justify-content-between mb-5'}>
                <MainHeaderText text={t('sidebar.supplier')}/>

                {
                    users.addSupplier ?
                        <ButtonAnt onClick={() => setActive(true)} icon={<PlusOutlined/>} text={t('button.add')}
                                   type={'primary'}/> : ''
                }
            </div>

            {
                users.getSupplier &&
                <CardBody>
                    <div className="col-md-12">
                        <SearchAnt name={t('bal.46')} onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                </CardBody>
            }
            {
                users.getSupplier ?
                    <CardBody>
                        <Loading spinning={loading}>
                            {
                                TaminotReducer.supplier?.list?.length > 0 ?

                                    <CommonTable columns={columns} page={page} size={limit}
                                                 handleLimitChange={handleLimitChange}
                                                 handlePageChange={handlePageChange}
                                                 total={TaminotReducer.supplier?.totalItem}
                                                 pagination={true}
                                                 data={TaminotReducer.supplier?.list}/>
                                    :
                                    <div>
                                        <h4 className={'text-center mt-4'}>{TaminotReducer.message}</h4>
                                    </div>}
                        </Loading>
                    </CardBody>
                    : ''
            }
            <Modal isOpen={qarz} toggle={toggle3}>
                <form onSubmit={handleSubmit1(onSubmitDebt)}>
                    <ModalHeader>
                        <AddOrEditText text={t('Buttons.11')}/>
                    </ModalHeader>
                    <ModalBody>
                        <div className="col-md-12 d-flex gap-2 gap-sm-0 flex-wrap">
                            <div className="col-12 col-sm-12 p-sm-2 col-md-12">
                                <label className={'global-label'} htmlFor="sum">{t('bal.42')}</label>
                                <input type="number" className={'form-control'}
                                       {...register1('sum', {
                                           required: {
                                               value: true,
                                               message: (t('bal.43'))
                                           },
                                           min: {
                                               value: true,
                                               message: (t('bal.49'))
                                           }
                                       })} id={'sum'} min={0}/>
                                {
                                    errors1.sum && errors1.sum.type === "required" &&
                                    <p className={'text-danger text-center p-0 m-0'}>{errors1.sum.message}</p>
                                }
                                {
                                    errors1.sum && errors1.sum.type === "min" &&
                                    <p className={'text-danger text-center p-0 m-0'}>{errors1.sum.message}</p>
                                }
                            </div>
                            <div className="col-12 col-sm-6 p-sm-2 col-md-6">
                                <label className={'global-label'} htmlFor="">{t('bal.34')}</label>
                                <select className={'form-control'}
                                        {...register1('branchId', {
                                            required: {
                                                value: true,
                                                message: (t('bal.34'))
                                            }
                                        })} >
                                    <option value="">{t('bal.35')}
                                    </option>
                                    {
                                        users.branches ?
                                            users.branches.map(item =>
                                                <option
                                                    value={item.id}>{item.name}</option>) : 'not'
                                    }
                                </select>
                                {
                                    errors1.branchId &&
                                    <p className={'text-danger text-center p-0 m-0'}>{errors1.branchId.message}</p>
                                }
                            </div>
                            <div className="col-12 col-sm-6 p-sm-2 col-md-6">
                                <label className={'global-label'} htmlFor="">{t('bal.50')}</label>
                                <select className={'form-control'}
                                        {...register1('paymentMethodId', {
                                            required: {
                                                value: true,
                                                message: (t('bal.51'))
                                            }
                                        })} >
                                    <option value="">{t('bal.35')}
                                    </option>
                                    {
                                        PayReducer.paymethod ?
                                            PayReducer.paymethod.map(item =>
                                                <option
                                                    value={item.id}>{camelize(item.name)}</option>) : 'not'
                                    }
                                </select>
                                {
                                    errors1.paymentMethodId &&
                                    <p className={'text-danger text-center p-0 m-0'}>{errors1.paymentMethodId.message}</p>
                                }
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type={'button'} className={'btn btn-danger'}
                                onClick={toggle3}>{t('Buttons.7')}</button>
                        <button type="submit"
                                className={'btn btn-success'}
                        >{t('Buttons.6')}</button>
                    </ModalFooter>
                </form>
            </Modal>
            <Modal isOpen={active} toggle={toggle}>
                <ModalHeader>
                    <AddOrEditText text={t('Supplier.4')}/>
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className={'col-md-12 d-flex gap-2 gap-sm-0 flex-wrap'}>
                            <div className={'col-12 p-sm-2 col-md-6 col-sm-12'}>
                                <label className={'global-label'} htmlFor={'name'}>{t('Employ.8')}</label>
                                <input type="text" id={'name'}
                                       value={name} onChange={(e) => setName(e.target.value)}
                                       className={'form-control'} placeholder={'Ismni kiriting!'}/>
                                {isCheck && name === "" && <p
                                    className={'text-danger text-center p-0 m-0'}>{t('bal.32')}</p>}
                            </div>
                            <div className={'col-12 p-sm-2 col-md-6 col-sm-12'}>
                                <label className={'global-label'} htmlFor={'phoneNumber'}>{t('Supplier.7')}</label>
                                <PhoneInput
                                    placeholder={t('bal.36')}
                                    value={phoneNumber}
                                    className={'form-control'}
                                    style={{display: 'flex'}}
                                    onChange={setPhoneNumber}/>
                                {isCheck && phoneNumber === "" && <p
                                    className={'text-danger text-center p-0 m-0'}>{t('bal.36')}</p>}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type={"button"} className={'btn btn-danger'}
                            onClick={toggle}>{t('Buttons.7')}</button>
                    <button className={'btn btn-success'}
                            type={"button"} onClick={onSubmit}> {t('bal.52')}
                    </button>
                </ModalFooter>
            </Modal>
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deleteModaltoggle={() => setdeletemodal(prevState => !prevState)} deleteFunc={deleteFunc}
                        deletemodal={deletemodal}/>
        </>
    )
}

export default connect((TaminotReducer, branchreducer, PayReducer, users), {
    getTaminot,
    getbranch,
    getPay,
    debtSupplier,
    saveTaminot,
    editTaminot,
    deleteTaminot
})(Taminotchilar)
