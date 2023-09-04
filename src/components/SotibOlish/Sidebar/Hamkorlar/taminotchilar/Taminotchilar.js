import "./taminotchilar.css"
import Excel from '../../../../../img/Excel.png'
import Edit from '../../../../../img/Edit.png'
import Delete from '../../../../../img/Delete.png'
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
import {TablePagination} from "@mui/material";
import AgreeModal from "../../../../AgreeModal";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import MainHeaderText from "../../../../Svg/MainHeaderText";
import {ButtonAnt} from "../../../../Svg/SelectAnt";

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


    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value));
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
        setTimeout(() => {
            setLoading(true)
        }, 500)
    }, [TaminotReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
        getPay()
    }, [])


    return (
        <div>
            <div className={'d-flex align-items-center justify-content-between mb-5'}>
                <MainHeaderText text={t('bal.44')}/>

                {
                    users.addSupplier ?
                        <ButtonAnt onClick={toggle} text={t('bal.21')} type={'primary'}/> : ''
                }
            </div>
            <div className="col-md-12 pt-4 pb-4 mt-2 ">
                <div className="rowStyleTM">
                    <div className="qoshishTM">
                        <h5>{t('Supplier.2')}</h5>

                    </div>
                    {
                        users.getSupplier && <div className="izlashTM">
                            <div>
                                <button><img src={Excel} alt=""/> {t('bal.45')}</button>
                            </div>
                            <div className="izlashBox2">
                                <input type="text"

                                       value={search} onChange={(e) => setSearch(e.target.value)}
                                       placeholder={t('bal.46')}/>
                            </div>

                        </div>
                    }
                    {
                        users.getSupplier ?
                            loading ?
                                TaminotReducer.supplier?.list?.length > 0 ?
                                    <div className={'mt-4'}>
                                        <div className="table-responsive table-wrapper-scroll-y">
                                            <table
                                                className='table table-striped table-hover table-condensed  table-bordered mt-4'>
                                                <thead className={'fix'}>
                                                <tr>
                                                    <th>T/R</th>
                                                    <th>{t('bal.47')}</th>
                                                    <th>{t('bal.48')}</th>
                                                    <th>{t('bal.25')}</th>
                                                    <th>{t('bal.27')}</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {
                                                    TaminotReducer.supplier?.list.map((item, index) => <tr
                                                        key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.phoneNumber}</td>
                                                        <td>
                                                            {
                                                                item.debt > 0 ?
                                                                    <div className={'bg-danger form-control'}
                                                                         style={{width: '100%', height: '100%'}}>
                                                                        <td>{item.debt}</td>
                                                                    </div> :
                                                                    <div className={'bg-success form-control'}
                                                                         style={{width: '100%', height: '100%'}}>
                                                                        <td>{item.debt}</td>
                                                                    </div>
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                users.editSupplier ?
                                                                    <button onClick={() => editt(item.id)}
                                                                            className='taxrirlash'><img
                                                                        src={Edit}
                                                                        alt=""/> {t('Buttons.1')}
                                                                    </button> : ''
                                                            }

                                                            {

                                                                users.deleteSupplier ?
                                                                    <button
                                                                        onClick={() => deleteSupplierById(item.id)}
                                                                        className='ochirish'><img
                                                                        src={Delete} alt=""/> {t('Buttons.3')}
                                                                    </button> : ''
                                                            }


                                                            <button className={'btnB2'}
                                                                    onClick={() => debt2(item.id)}>{t('Buttons.11')}</button>


                                                        </td>

                                                    </tr>)
                                                }
                                                </tbody>
                                            </table>

                                        </div>


                                        <TablePagination
                                            component="div"
                                            count={TaminotReducer.supplier?.totalItem}
                                            onPageChange={handlePageChange}
                                            onRowsPerPageChange={handleLimitChange}
                                            page={page}
                                            rowsPerPageOptions={[5, 10, 15]}
                                            rowsPerPage={limit}
                                        />
                                    </div>
                                    :
                                    <div>
                                        <h4 className={'text-center mt-4'}>{TaminotReducer.message}</h4>
                                    </div>
                                : <Loading/> : ''
                    }

                </div>
                <Modal isOpen={qarz} toggle={toggle3}>
                    <form onSubmit={handleSubmit1(onSubmitDebt)}>
                        <ModalHeader>
                            {t('Buttons.11')}
                        </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="sum">{t('bal.42')}</label>
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
                                <div className="col-md-6">
                                    <label htmlFor="">{t('bal.34')}</label>
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
                                <div className="col-md-6">
                                    <label htmlFor="">{t('bal.50')}</label>
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
                                                        value={item.id}>{item.name}</option>) : 'not'
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
                    <form>
                        <ModalHeader>
                            {t('Supplier.4')}
                        </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className={'col-md-12 d-flex'}>
                                    <div className={'col-md-6 col-sm-12'}>
                                        <label htmlFor={'name'}>{t('Employ.8')}</label>
                                        <input type="text" id={'name'}
                                               value={name} onChange={(e) => setName(e.target.value)}
                                               className={'form-control'}/>
                                        {isCheck && name === "" && <p
                                            className={'text-danger text-center p-0 m-0'}>{t('bal.32')}</p>}
                                    </div>
                                    <div className={'col-md-6 col-sm-12'}>
                                        <label htmlFor={'phoneNumber'}>{t('Supplier.7')}</label>
                                        <PhoneInput
                                            placeholder={t('bal.36')}
                                            value={phoneNumber}
                                            className={'form-control'}
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
                    </form>
                </Modal>
            </div>
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deleteModaltoggle={() => setdeletemodal(prevState => !prevState)} deleteFunc={deleteFunc}
                        deletemodal={deletemodal}/>
        </div>
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
