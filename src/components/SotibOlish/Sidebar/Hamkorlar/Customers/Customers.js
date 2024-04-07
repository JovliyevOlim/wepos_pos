import {useState, useEffect} from 'react'
import {connect} from "react-redux";
import {useForm} from 'react-hook-form'
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import PhoneInput from 'react-phone-number-input'
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {DeleteOutlined, DollarOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {Typography} from 'antd';

import users from "../../../../../reducer/users";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import allbusinessreducer, {getOneBusiness} from "../../SUPERADMIN/reducers/allbusinessreducer";
import CustomerReducer, {
    getCustomers,
    getCustomersByBranch,
    saveCustomer,
    editCustomer,
    deleteCustomer,
    customerGetPayment,
    customerReturnPayment
} from "../reducer/CustomerReducer";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";
import MainHeaderText, {AddOrEditText} from "../../../../Components/MainHeaderText";
import SelectAnt, {ButtonAnt, SearchAnt} from "../../../../Components/SelectAnt";
import CardBody from "../../../../Components/CardBody";
import CommonTable from "../../../../Components/CommonTable";
import {camelize, prettify} from "../../../../../util";

import './Customers.css'
import 'react-phone-number-input/style.css'
import {AddButton, CustomButton, DeleteButton, EditButton} from "../../../../Components/Buttons";

const {Text} = Typography;

function Customers({
                       getCustomers,
                       allbusinessreducer, getOneBusiness,
                       getCustomersByBranch,
                       saveCustomer,
                       editCustomer,
                       deleteCustomer,
                       customerGetPayment,
                       customerReturnPayment,
                       users,
                       CustomerReducer,
                       getPay, PayReducer,
                   }) {
    const [active, setActive] = useState(false);
    const {t} = useTranslation()
    const {register, setValue, resetField, reset, handleSubmit, formState: {errors}} = useForm()
    const {
        register: register1,
        resetField: resetField1,
        handleSubmit: handleSubmit1,
        formState: {errors: errors1}
    } = useForm()
    const [mainBranchId, setMainBranchId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('')
    const [editId, setEditId] = useState(null)
    const [debtActive, setDebtActive] = useState(false)
    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState(null)
    const [customerGetPay, setCustomerGetPay] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isCheck, setIsCheck] = useState(false)
    const [saveModal, setSaveModal] = useState(false)

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
            title: t('bal.7'),
            width: 100,
            dataIndex: 'branchName',
            key: 'branchName',
        },

        {
            title: t('bal.25'),
            width: 150,
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
            title: t('bal.26'),
            width: 100,
            dataIndex: 'percent',
            key: 'percent',
        },
        {
            title: t('bal.27'),
            key: 'operation',
            width: 200,
            render: (item, values) => <div className={'d-flex justify-content-start gap-2 flex-wrap'}>
                {users.editSupplier && <EditButton onClick={() => editM(values.id)}/>}
                {
                    users.deleteSupplier && <DeleteButton onClick={() => deleteCustomerById(values.id)} />
                }
                <CustomButton
                  text={t('button.returnMoney')}
                  icon={<DollarOutlined style={{color: "#57ca22", fontSize: 16}}/>}
                  onClick={() => customerReturnPayFunc(values.id)}
                />
                <CustomButton
                  className="yellowButton"
                  text={t('button.payDebt')}
                  icon={<DollarOutlined style={{color: "#FFB736", fontSize: 16}}/>}
                  onClick={() => customerGetPayFunc(values.id)}
                />
            </div>,

        },
    ];

    const handleChangePage = (newPage) => {
        setPage(newPage - 1);
    };
    const handleChangeRowsPerPage = (event, size) => {
        setPage(0);
        setRowsPerPage(parseInt(size));
    };

    function editM(id) {
        setActive(true)
        setEditId(id)
        let a = CustomerReducer.customers?.list.filter(item => item.id === id)
        setValue('name', a[0].name)
        setValue('percent', a[0].percent)
        setValue('branchId', a[0].branchId)
        setPhoneNumber(a[0].phoneNumber)
    }

    useEffect(() => {
        getPay(users.businessId)
    }, [])

    function toggle() {
        setActive(!active)
        setEditId(null)
        resetField('name', '')
        resetField('percent', '')
        resetField('branchId', '')
        setPhoneNumber('')
        setIsCheck(false)
    }

    function toggle2() {
        setDebtActive(!debtActive)
        setEditId(null)
        resetField1('sum', '')
        resetField1('paymentMethodId', 'all')
    }

    function deleteFunc() {
        deleteCustomer(deleteID)
        setdeletemodal(false)
    }

    function deleteCustomerById(item) {
        setdeletemodal(true)
        setdeletID(item)
    }

    function save(data) {
        saveCustomer({
            ...data, phoneNumber
        })
    }

    function customerGetPayFunc(id) {
        setEditId(id)
        setDebtActive(true)
        setCustomerGetPay(true)
    }

    function customerReturnPayFunc(id) {
        setEditId(id)
        setDebtActive(true)
        setCustomerGetPay(false)
    }

    function onSubmit(data) {
        if (!phoneNumber) {
            setIsCheck(true)
        } else {
            if (editId) {
                editCustomer({
                    ...data,
                    id: editId,
                    phoneNumber
                })
            } else {
                save(data)
            }

            setSaveModal(true)

        }
    }

    function onSubmitDebt(data) {
        if (data.paymentMethodId === 'all') {
            toast.warning(t('bal.19'))
        } else {
            if (customerGetPay) {
                customerGetPayment({
                    ...data,
                    id: editId
                })
            } else {
                customerReturnPayment({
                    ...data,
                    id: editId
                })
            }
            setSaveModal(true)
        }
    }

    useEffect(() => {
        if (CustomerReducer.saveBoolean) {
            setEditId({id: '', customerGroupId: []})
            resetField('name', '')
            resetField('percent', '')
            resetField('branchId', 'all')
            resetField1('paymentMethodId', 'all')
            resetField1('sum', '')
            setPhoneNumber('')
            setDebtActive(false)
            setActive(false)
            setLoading(false)
            setdeletemodal(false)
            setdeletID(null)
        }
        setSaveModal(false)
    }, [CustomerReducer.current])

    useEffect(() => {
        setLoading(false)
        if (users.getCustomerAdmin && !mainBranchId) {
            getCustomers({
                businessId: users.businessId,
                params: {
                    page: page,
                    size: rowsPerPage,
                    name: search
                }
            })
        } else if (users.getCustomer) {
            getCustomersByBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    page: page,
                    size: rowsPerPage,
                    name: search
                }
            })
        }
    }, [CustomerReducer.current, mainBranchId, page, rowsPerPage, search])

    useEffect(() => {
        getOneBusiness(users.businessId)
    }, [])

    useEffect(() => {
        setLoading(true)
    }, [CustomerReducer.getBoolean])
    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <>
            <div className="d-flex align-items-center mb-5 justify-content-between">
                <MainHeaderText text={t('sidebar.customer')}/>
                {
                    users.addCustomer ? <AddButton onClick={toggle} text={t('button.add')} /> : null
                }
            </div>
            {
                users.getCustomerAdmin || users.getCustomer ?
                    <CardBody>
                        <div className="col-md-12 gap-2 d-flex align-items-center flex-wrap">
                            <div className={'col-12 col-sm-3 col-md-3'}>
                                <SelectAnt name={t('bal.2')} onChange={(e) => setMainBranchId(e)}
                                           permission={users.getCustomerAdmin} selectList={users?.branches}/>
                            </div>
                            <div className={'col-12 col-sm-6 col-md-6'}>
                                <SearchAnt name={t('bal.22')} onChange={(e) => setSearch(e.target.value)}/>
                            </div>
                        </div>
                    </CardBody> : null
            }
            {
                users.getCustomerAdmin || users.getCustomer ?
                    <CardBody>
                        <Loading spinning={loading}>
                            {
                                CustomerReducer.customers?.list?.length > 0 ?
                                    <CommonTable pagination={true} total={CustomerReducer.customers?.totalItem}
                                                 page={page} size={rowsPerPage} columns={columns}
                                                 data={CustomerReducer.customers?.list}
                                                 handlePageChange={handleChangePage}
                                                 handleLimitChange={handleChangeRowsPerPage}/>
                                    :
                                    <div>
                                        <h4 className={'text-center'}>{CustomerReducer.message}</h4>
                                    </div>
                            }
                        </Loading>
                    </CardBody> : null
            }
            <Modal size={'md'} isOpen={active} toggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>
                        <AddOrEditText text={editId ? (t('bal.28')) : (t('bal.21'))}/>
                    </ModalHeader>
                    <ModalBody>
                        <div className="col-md-12 gap-2 gap-sm-0 d-flex flex-wrap">
                            <div className="col-12 p-sm-2 col-sm-6  col-md-6">
                                <label className={'global-label'} htmlFor={'nomi'}>{t('Buttons.13')}</label>
                                <input
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: (t('bal.32'))
                                        }
                                    })}
                                    placeholder={t('bal.33')}
                                    defaultValue={''}
                                    id={'nomi'} type="text"
                                    className={'form-control'}/>
                                {
                                    errors.name &&
                                    <p className={'text-danger text-center p-0 m-0'}>{t('bal.32')}</p>
                                }
                            </div>
                            <div className="col-12 p-sm-2 col-sm-6  col-md-6">
                                <label className={'global-label'} htmlFor={'filial'}>{t('CustomAll.5')}</label>
                                <select className={'form-control'}
                                        disabled={editId}  {...register('branchId', {
                                    required: {
                                        value: true,
                                        message: (t('bal.34'))
                                    }
                                })}>
                                    <option value="">{t('bal.35')}</option>
                                    {
                                        users?.branches.map(item =>
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        )
                                    }
                                </select>
                                {
                                    errors.branchId &&
                                    <p className={'text-danger text-center p-0 m-0'}>{t('bal.34')}</p>
                                }
                            </div>
                            <div className="col-12 p-sm-2 col-sm-6  col-md-6">
                                <label className={'global-label'} htmlFor={'tel'}>{t('Buttons.14')}</label>
                                <PhoneInput
                                    placeholder={t('bal.36')}
                                    value={phoneNumber}
                                    className={'form-control'}
                                    style={{display: 'flex'}}
                                    onChange={setPhoneNumber}/>
                                {isCheck && !phoneNumber && <p
                                    className={'text-danger text-center p-0 m-0'}>{t('bal.36')}</p>}
                            </div>
                            <div className="col-12 p-sm-2 col-sm-6  col-md-6">
                                <label className={'global-label'} htmlFor="">{t('bal.26')}</label>
                                <input type="number" {...register('percent',
                                    {
                                        required: {
                                            value: allbusinessreducer.onebusiness?.customer,
                                            message: (t('bal.37'))
                                        },
                                        min: {value: 0, message: (t('bal.38'))},
                                        max: {value: 50, message: (t('bal.39'))},
                                    })}
                                       placeholder={t('bal.26')}
                                       defaultValue={'0'}
                                       disabled={!allbusinessreducer.onebusiness?.customer}
                                       className={'form-control'}/>
                                {
                                    errors.percent && errors.percent.type === "required" &&
                                    <p className={'text-danger text-center p-0 m-0'}>{errors.percent.message}</p>
                                }
                                {
                                    errors.percent && errors.percent.type === "min" &&
                                    <p className={'text-danger text-center p-0 m-0'}>{errors.percent.message}</p>
                                }
                                {
                                    errors.percent && errors.percent.type === "max" &&
                                    <p className={'text-danger text-center p-0 m-0'}>{errors.percent.message}</p>
                                }
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className={'btn btn-danger'} type={"button"}
                                onClick={toggle}>{t('Buttons.7')}</button>
                        <button className={'btn btn-success'} type={"submit"}>{t('Buttons.6')}</button>
                    </ModalFooter>
                </form>
            </Modal>
            <Modal isOpen={debtActive} toggle={toggle2}>
                <form onSubmit={handleSubmit1(onSubmitDebt)}>
                    <ModalHeader>
                        <AddOrEditText text={customerGetPay ? (t('bal.40')) : (t('bal.41'))}/>
                    </ModalHeader>
                    <ModalBody>
                        <div className="col-md-12 gap-2 gap-sm-0 d-flex flex-wrap">
                            <div className="col-12 p-sm-2 col-sm-6 col-md-12">
                                <label className={'global-label'} htmlFor={'l'}>{t('bal.42')}</label>
                                <input type="number" min={0}
                                       {...register1('sum', {required: true})}
                                       placeholder={errors1.sum ? errors1.sum?.type === "required" && (t('bal.43')) : (t('bal.42'))}
                                       className={'form-control'}
                                />
                            </div>
                            <div className="col-12 p-sm-2 col-sm-6 col-md-12">
                                <label
                                    htmlFor="" className={'global-label'}> {t('Hamkorlar.tu')}
                                </label>
                                <select className={'form-control'}
                                        {...register1('paymentMethodId', {required: true})}>
                                    <option
                                        value="all">{t('Hamkorlar.tanlash')}
                                    </option>
                                    {
                                        PayReducer.paymethod ?
                                            PayReducer.paymethod.map((item) =>
                                                <option
                                                    value={item.id}
                                                    key={item.id}>{camelize(item.name)}</option>) : 'not found'
                                    }
                                </select>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button"
                                className={'btn btn-danger'}
                                onClick={toggle2}>{t('Buttons.7')}</button>
                        <button type={'submit'} className={'btn btn-success'}>{t('Buttons.6')}</button>
                    </ModalFooter>
                </form>
            </Modal>
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deleteFunc={deleteFunc} deletemodal={deletemodal}
                        deleteModaltoggle={() => setdeletemodal(prevState => !prevState)}/>
        </>
    )
}

export default connect((CustomerReducer, PayReducer, users, allbusinessreducer), {
    getCustomers,
    getCustomersByBranch,
    saveCustomer,
    editCustomer,
    deleteCustomer,
    customerGetPayment,
    customerReturnPayment,
    getPay,
    getOneBusiness
})(Customers)
