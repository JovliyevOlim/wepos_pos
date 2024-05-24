import {Link, useHistory} from 'react-router-dom'
import React, {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import SavdoQoshishReducer, {
    deleteSavdolar,
    editSavdolar,
    getTradeById,
    saveSavdolar,
    getTradeByBranch,
    getTradeByBusiness,
    viewTradeById
} from "../../Savdo/reducer/SavdoQoshishReducer";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import formatDate, {camelize} from "../../../../../util";
import Loading from "../../../../Loading";
import Imagecom from "../../../../Imagecom";
import {useReactToPrint} from "react-to-print";
import checkReducer, {getInvoice} from "../../../../../reducer/checkReducer";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";
import CustomerReducer, {
    getCustomersForTrade,
    getCustomersForTradeBusiness
} from "../../Hamkorlar/reducer/CustomerReducer";
import XodimReducer, {getUserForFiltering, getUserForFilteringBusiness} from "../../Hodimlar/reducer/XodimReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import MainHeaderText from "../../../../Components/MainHeaderText";
import SelectAnt, {ButtonAnt, SearchAnt} from "../../../../Components/SelectAnt";
import CardBody from "../../../../Components/CardBody";
import CommonTable from "../../../../Components/CommonTable";
import {DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined} from "@ant-design/icons";
import {DatePicker} from "antd";
import dayjs from "dayjs";
import {CustomButton, DeleteButton, EditButton, ViewButton} from "../../../../Components/Buttons";

import edit from "../../../../../img/pencil.svg"

function TradeReportAll({
                            XodimReducer,
                            CustomerReducer,
                            getCustomersForTrade,
                            getUserForFiltering,
                            getUserForFilteringBusiness,
                            getCustomersForTradeBusiness,
                            getPay,
                            getTradeByBranch,
                            getTradeByBusiness,
                            deleteSavdolar,
                            getInvoice,
                            SavdoQoshishReducer,
                            users,
                            getTradeById,
                            viewTradeById,
                            checkReducer,
                            PayReducer
                        }) {

    const {t} = useTranslation()
    const history = useHistory()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [printDisplay, setPrintDisplay] = useState('none')
    const [mainBranch, setMainBranch] = useState(null)
    const [saveModal, setSaveModal] = useState(false)
    const [isViewTrade, setIsViewTrade] = useState(false)

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState(null)
    const [customerId, setCustomerId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [paymentStatus, setPaymentStatus] = useState(null)
    const [backing, setBacking] = useState('true')
    const [startDate, setStartDate] = useState(null)

    const columns = [
        {
            title: 'Chek',
            dataIndex: 'invoice',
            key: 'invoice',
            width: '5%',
        },
        {
            title: t('ol.11'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>,
            width: '8%',
        },
        {
            title: t('Pagination.10'),
            dataIndex: 'customerName',
            key: 'customerName',
            width: '8%',
            render: (item) => <p className={'m-0'}>{item ? item :'-----'}</p>,
        },
        {
            title: t('ol.10'),
            dataIndex: 'userFio',
            key: 'userFio',
            width: '7%',
        },
        {
            title: t('ol.13'),
            dataIndex: 'branchName',
            key: 'branchName',
            width: '8%',
        },
        {
            title: t('ol.18'),
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            width: '10%',
            render: (item) => <p className={'m-0'}>{item}</p>,
        },
        {
            title: t('ol.15'),
            dataIndex: 'totalSum',
            key: 'totalSum',
            render: (item) => <p className={'m-0'}>{item} so'm</p>,
            width: '10%',
        },
        {
            title: t('ol.16'),
            dataIndex: 'paidSum',
            key: 'paidSum',
            render: (item) => <p className={'m-0'}>{item} so'm</p>,
            width: '10%',
        },
        {
            title: t('ol.17'),
            dataIndex: 'debtSum',
            key: 'debtSum',
            render: (item) => <p className={'m-0'}>{item} so'm</p>,
            width: '10%',
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: '15%',
            render: (item, values) => <div className={'d-flex justify-content-center gap-1 flex-wrap'}>
                {
                    users.getTrade && <ViewButton onClick={() => {
                        viewTradeInfoById(item?.id)
                    }
                    }/>
                }
                {
                    users.editTrade && values.editable && <CustomButton
                        className={"editButton"}
                        img={edit}
                        text={t('button.remain')}
                        onClick={() => {
                            history.push('/repeatProducts/' + values?.id + "/" + values?.id)
                        }
                        }
                    />
                }
                {
                    users.deleteTrade && values.editable && <DeleteButton onClick={() => values?.customerName ? deleteTradeByIdIsCustomer(item.id) : deleteTradeById(item.id)} />
                }
                {/*{*/}
                {/*    users.getTrade &&*/}
                {/*    <ButtonAnt type={'primary'} text={t('button.view')} bgColor={'aqua'} onClick={() => {*/}
                {/*        viewTradeInfoById(item?.id)*/}
                {/*    }*/}
                {/*    } icon={<EyeOutlined/>}/>*/}
                {/*}*/}

                {/*{*/}
                {/*    users.editTrade && values.editable &&*/}
                {/*    <ButtonAnt text={t('button.edit')} type={'primary'} onClick={() => {*/}
                {/*        history.push('/shopping/' + values?.id)*/}
                {/*    }*/}
                {/*    } icon={<EditOutlined/>}/>*/}
                {/*}*/}
                {/*{*/}
                {/*    users.editTrade && values.editable &&*/}
                {/*    <ButtonAnt text={t('button.remain')} type={'primary'} bgColor={'green'} onClick={() => {*/}
                {/*        history.push('/repeatProducts/' + values?.id + "/" + values?.id)*/}
                {/*    }*/}
                {/*    } icon={<EditOutlined/>}/>*/}
                {/*}*/}
                {/*{*/}
                {/*    users.deleteTrade && values.editable &&*/}
                {/*    <ButtonAnt text={t('button.delete')} danger={true} type={'primary'}*/}
                {/*               onClick={() => values?.customerName ? deleteTradeByIdIsCustomer(item.id) : deleteTradeById(item.id)}*/}
                {/*               icon={<DeleteOutlined/>}/>*/}
                {/*}*/}

            </div>,
        },
    ];


    function viewTradeInfoById(id) {
        setIsViewTrade(true)
        viewTradeById(id)
    }

    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };
    const handleLimitChange = (event, size) => {
        setPage(0)
        setLimit(size);
    };


    useEffect(() => {
        setLoading(false)
        if (users.getTradeAdmin && !mainBranch) {
            getTradeByBusiness({
                businessId: users.businessId,
                params: {
                    page: page,
                    size: limit,
                    customerId, paymentStatus, userId,
                    invoice: search,
                    startDate:startDate ? dayjs(startDate).format("YYYY/MM/DD") :null
                }
            })
        } else if (users.getTrade) {
            getTradeByBranch({
                branchId: mainBranch ? mainBranch : users.branchId,
                params: {
                    page: page,
                    size: limit,
                    customerId, paymentStatus, userId,
                    invoice: search,
                    startDate: startDate ? dayjs(startDate).format("YYYY/MM/DD") :null
                }
            })
        }
    }, [SavdoQoshishReducer.current, limit, page, customerId, userId, paymentStatus, mainBranch, search, startDate])


    useEffect(() => {
        if (users.getUserAdmin && !mainBranch) {
            getUserForFilteringBusiness(users.businessId)
        } else {
            getUserForFiltering(mainBranch ? mainBranch : users.branchId)
        }
        if (users.getCustomerAdmin && !mainBranch) {
            getCustomersForTradeBusiness(users.businessId)
        } else {
            getCustomersForTrade(mainBranch ? mainBranch : users.branchId)
        }
    }, [mainBranch])


    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [SavdoQoshishReducer.getTradeBool])

    useEffect(() => {
        if (SavdoQoshishReducer.saveBoolean) {
            setLoading(false)
            setdeletemodal(false)
            setdeletID('')
            setdeletemodalIsCustomer(false)
        }
        setSaveModal(false)
    }, [SavdoQoshishReducer.current])

    useEffect(() => {
        setLoading(false)
        getPay(users.businessId)
    }, [])

    const [deletemodal, setdeletemodal] = useState(false)
    const [deletemodalIsCustomer, setdeletemodalIsCustomer] = useState(false)
    const [deleteID, setdeletID] = useState('')

    function deleteFunc() {
        deleteSavdolar(
            {
                deleteID,
                params: {
                    back: true
                }
            }
        )
        setSaveModal(true)
    }

    function deleteFuncIsCustomer() {
        deleteSavdolar({
            deleteID,
            params: {
                back: backing === "true" ? true : false
            }
        })
        setSaveModal(true)
    }

    function deleteTradeById(item) {
        setdeletemodal(!deletemodal)
        setdeletID(item)
    }

    function deleteTradeByIdIsCustomer(item) {
        setdeletemodalIsCustomer(!deletemodalIsCustomer)
        setdeletID(item)
    }

    // const checkModalOpen = (id, branchId) => {
    //     getInvoice(branchId ? branchId : (input.baza === 'barcasi' || input.baza === '') ? users.branchId : input.baza)
    //     getTradeById(id)
    //     setPrintDisplay('block')
    // }

    useEffect(() => {
        if (printDisplay === 'block') {
            handlePrint()
            setTimeout(() => {
                setPrintDisplay('none')
            }, 500)
        }
    }, [SavdoQoshishReducer.getOneBoolean]);


    return (
        <>
            {
                users.getTradeAdmin || users.getTrade ?
                    <CardBody>
                        <div className="col-md-12 d-flex flex-wrap">
                            <div className="col-12 col-sm-6 col-lg-3 p-2">
                                <SelectAnt
                                    name={t('ol.3')}
                                    onChange={(e) => setMainBranch(e === "" ? null : e)}
                                    permission={users.getTradeAdmin}
                                    selectList={users.branches}/>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3 p-2">
                                <SelectAnt
                                    name={'Mijozlar'}
                                    onChange={(e) => setCustomerId(e === "" ? null : e)}
                                    permission={true}
                                    selectList={CustomerReducer.customersTrade}/>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3 p-2">
                                <SelectAnt
                                    name={t('ol.9')}
                                    onChange={(e) => setUserId(e === "" ? null : e)}
                                    permission={true}
                                    selectList={XodimReducer.usersFiltering?.map((item) => ({
                                        id: item.id,
                                        name: item.fio
                                    }))}/>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3 p-2">
                                <SelectAnt
                                    name={t('ol.5')}
                                    onChange={(e) => setPaymentStatus(e === "" ? null : e)}
                                    permission={true}
                                    selectList={[
                                        {id: 'TOLANGAN', name: (t('ol.6'))},
                                        {id: 'TOLANMAGAN', name: (t('ol.7'))},
                                        {id: 'QISMAN_TOLANGAN', name: (t('ol.8'))},
                                    ]}/>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3 p-2">
                                <h5 className={'selectLabel'}>Sana</h5>
                                <DatePicker
                                    className="w-100"
                                    onChange={(e) => setStartDate(e === '' ? null : e)}/>
                            </div>
                            <div className="col-12 p-2">
                                <SearchAnt name={t('mah.35')}
                                           onChange={(e) => setSearch(e.target.value === '' ? null : e.target.value)}/>
                            </div>
                        </div>
                    </CardBody>
                    : ''
            }
            <CardBody>
                {
                    users.getTrade || users.getTradeAdmin ?
                        <Loading spinning={loading}>
                            {
                                SavdoQoshishReducer?.trades?.list?.length > 0 ?
                                    <div>
                                        <div className="table-responsive table-wrapper-scroll-y">
                                            <CommonTable handlePageChange={handlePageChange}
                                                         handleLimitChange={handleLimitChange} page={page} size={limit}
                                                         total={SavdoQoshishReducer?.trades?.totalItem}
                                                         data={SavdoQoshishReducer.trades?.list} pagination={true}
                                                         columns={columns}
                                            />
                                        </div>
                                    </div> :
                                    <div className={'border border-2'}>
                                        <h4 className={'text-center'}>{SavdoQoshishReducer.message}</h4>
                                    </div>
                            }
                        </Loading>
                        : ''
                }

                <div style={{display: printDisplay}} className={'shoppingmodal p-2'} ref={componentRef}>
                    <div className={'d-flex justify-content-center align-items-center'}>
                        {
                            checkReducer.check ?
                                checkReducer.check.photoId ?
                                    <Imagecom id={checkReducer.check.photoId}/> : ''
                                : ''
                        }
                    </div>
                    <h2 className={'text-center'}>{
                        checkReducer.check ?
                            checkReducer.check.name : ''
                    }
                    </h2>
                    {
                        checkReducer.check ?
                            <div dangerouslySetInnerHTML={{__html: checkReducer.check.description}}>
                            </div>
                            : ''
                    }
                    <br/>
                    <div className={'d-flex justify-content-between align-items-center'}>
                        <h4 style={{fontSize: 12, fontWeight: 600}}>
                            {
                                moment(new Date(SavdoQoshishReducer?.trade?.createdAt)).format("DD:MM:YYYY")
                            }
                        </h4>
                        <h4 style={{fontSize: 12, fontWeight: 600}}>
                            {
                                moment(new Date(SavdoQoshishReducer?.trade?.createdAt)).format("HH:mm:ss")
                            }
                        </h4>
                    </div>
                    <div className={'d-flex justify-content-between align-items-center'}>
                        <h4 style={{fontSize: 12, fontWeight: 600}}>
                            {t('mah.41')}
                        </h4>
                        <h4 style={{fontSize: 12, fontWeight: 600}}>
                            {
                                SavdoQoshishReducer?.trade?.invoice
                            }
                        </h4>
                    </div>
                    <div className={'d-flex align-items-center justify-content-between'}>
                        <h4 style={{fontSize: 12, fontWeight: 600}}>{t('mah.42')} </h4>
                        <h5 style={{fontSize: 12, fontWeight: 600}}> {SavdoQoshishReducer?.trade?.customer?.name}</h5>
                    </div>
                    <div style={{borderBottom: "1px dashed #000"}}></div>
                    <div className={'mt-3 table-responsive'}>
                        {
                            SavdoQoshishReducer?.tradeProductList?.map((item, index) => <div key={item.id}>
                                <h4 style={{
                                    fontSize: 12,
                                    fontWeight: 600
                                }}>{index + 1}{".  "}{item.productTypePrice ? item?.productTypePrice?.name : item?.product?.name}</h4>
                                <div style={{marginLeft: 20, marginTop: -7}}
                                     className={"d-flex align-items-center justify-content-between"}>
                                    <h4 style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        lineHeight: 1
                                    }}>{item.subMeasurement ? (item?.productTypePrice ? item?.productTypePrice?.product?.measurement.value : item?.product?.measurement.value) * item.tradedQuantity : item.tradedQuantity} {item.subMeasurement ? (item?.productTypePrice ? item?.productTypePrice?.product?.measurement?.subMeasurement?.name : item?.product?.measurement?.subMeasurement?.name) : item?.productTypePrice ? item?.productTypePrice?.product?.measurement.name : item?.product?.measurement.name} *
                                        {(item.totalSalePrice / item.tradedQuantity)} {t('mah.39')}</h4>
                                    <h4 style={{fontSize: 12, fontWeight: 600, lineHeight: 1}}>
                                        = {item.totalSalePrice}{t('mah.39')}
                                    </h4>
                                </div>
                            </div>)
                        }
                    </div>
                    <div style={{borderBottom: "1px dashed #000", marginTop: 20}}></div>
                    <div className={'d-flex'}>
                        <div style={{width: "100%"}}>
                            <div className={"d-flex justify-content-between"}>
                                <h4 style={{fontSize: 14, fontWeight: 800}}>{t('mah.43')} </h4>
                                <h4 style={{
                                    fontSize: 14,
                                    fontWeight: 800
                                }}>{SavdoQoshishReducer?.trade?.totalSum} {t('mah.39')}</h4>
                            </div>
                            {
                                SavdoQoshishReducer.paymentDtoList ?
                                    SavdoQoshishReducer.paymentDtoList.map(item =>
                                        <div className={"d-flex justify-content-between"}>
                                            <h4 style={{fontSize: 13, fontWeight: 600}}>{
                                                PayReducer.paymethod.filter(val => item.paymentMethodId === val.id)[0]?.type
                                            }:</h4>
                                            <h4 style={{
                                                fontSize: 13,
                                                fontWeight: 600
                                            }}>{item.paidSum} {t('mah.39')}</h4>
                                        </div>
                                    ) : ''
                            }
                            <div className={"d-flex justify-content-between"}>
                                <h4 style={{fontSize: 13, fontWeight: 600}}>{t('mah.44')}</h4>
                                <h4 style={{
                                    fontSize: 13,
                                    fontWeight: 600
                                }}>{SavdoQoshishReducer?.trade?.paidSum} {t('mah.39')}</h4>
                            </div>
                            {
                                SavdoQoshishReducer?.trade?.customer ?
                                    <div className={"d-flex justify-content-between"}>
                                        <h4 style={{fontSize: 13, fontWeight: 600}}>{t('mah.45')} </h4>
                                        <h4 style={{fontSize: 13, fontWeight: 600}}>
                                            {SavdoQoshishReducer?.trade?.debtSum} {t('mah.39')}
                                        </h4>
                                    </div> : ''
                            }
                            {
                                SavdoQoshishReducer?.trade?.customer ?
                                    <div className={"d-flex justify-content-between"}>
                                        <h4 style={{fontSize: 14, fontWeight: 800}}>{t('mah.46')} </h4>
                                        <h4 style={{
                                            fontSize: 14,
                                            fontWeight: 800
                                        }}>{SavdoQoshishReducer.trade?.customer?.debt} {t('mah.39')}</h4>
                                    </div> : ''
                            }
                        </div>
                    </div>
                    <div style={{borderBottom: "1px dashed #000"}}></div>
                    {
                        checkReducer.check ?
                            <div dangerouslySetInnerHTML={{__html: checkReducer.check.footer}}>
                            </div>
                            : ''
                    }
                </div>
            </CardBody>


            <Modal isOpen={isViewTrade} size={'xl'} toggle={() => setIsViewTrade(!isViewTrade)}>
                <ModalHeader>
                    <h4>
                        {t('mah.47')}
                    </h4>
                </ModalHeader>
                <ModalBody>
                    {
                        SavdoQoshishReducer.tradeView ?
                            SavdoQoshishReducer.tradeView.map(item =>
                                <div>
                                    <div>
                                        <div className="col-md-12 ">
                                            <div className="col-md-12 d-flex flex-wrap">
                                                <div className="col-md-4"><p>{t('mah.48')}
                                                    <strong> {item?.invoice}</strong></p>
                                                </div>
                                                <div className="col-md-4"><p>{t('mah.49')}
                                                    <strong> {moment(new Date(item?.createdAt)).format('LLLL')}</strong>
                                                </p>
                                                </div>
                                                <div className="col-md-4">
                                                    {
                                                        item?.paymentGetDtoList.map(item =>
                                                            <p>{t('mah.50')}
                                                                <strong>{camelize(item?.paymentMethodName)}:</strong> {item?.sum} so'm
                                                            </p>
                                                        )
                                                    }

                                                </div>
                                                <div className="col-md-4"><p>{t('mah.51')}
                                                    <strong>{item?.paymentStatus}</strong></p>
                                                </div>
                                                <div className="col-md-12">
                                                    <p>{t('mah.52')} <strong>{item?.userFio}</strong></p>
                                                </div>
                                            </div>
                                            <div className="col-md-12 d-flex flex-wrap">
                                                <div className="col-md-5">
                                                    {
                                                        item?.customerName &&
                                                        <div>
                                                            <p>{t('mah.42')} <strong>{item?.customerName}</strong></p>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-md-5">
                                                    {
                                                        item?.customerPhoneNumber &&
                                                        <div>
                                                            <p>{t('mah.53')}
                                                                <strong>{item?.customerPhoneNumber}</strong></p>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-md-5">
                                                    <p className={''}>{t('mah.54')}
                                                        <strong>{item?.totalSum} {t('mah.39')}</strong>
                                                    </p>
                                                </div>
                                                <div className="col-md-5">
                                                    <p className={''}>{t('mah.55')}
                                                        <strong>{item?.paidSum} {t('mah.39')}</strong>
                                                    </p>
                                                </div>
                                                <div className="col-md-5">
                                                    <p className={''}>{t('mah.56')}
                                                        <strong>{item.debtSum} {t('mah.39')}</strong>
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className={'table-responsive'}>
                                        <table className={'table table-bordered'}>
                                            <thead>
                                            <tr>
                                                <th>Tr</th>
                                                <th>{t('mah.57')}</th>
                                                <th>{t('mah.58')}</th>
                                                <th>{t('mah.59')}</th>
                                                <th>{t('mah.60')}</th>
                                                <th>{t('mah.61')}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                item?.tradeProductGetDtoList?.map((item, index) =>
                                                    <tr>
                                                        <th>{index + 1}</th>
                                                        <th>{item.productName}</th>
                                                        <th>{item.quantity} {item.measurementName}</th>
                                                        <th>{item?.backing} {item.measurementName}</th>
                                                        <th>
                                                            {item?.profit} {t('mah.39')}
                                                        </th>
                                                        <th>
                                                            {item?.totalSalePrice}
                                                        </th>


                                                    </tr>
                                                )
                                            }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                            : <div><h4 className={'text-center'}>{SavdoQoshishReducer.message}</h4></div>
                    }
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-danger'} onClick={() => setIsViewTrade(!isViewTrade)}>{t('mah.62')}
                    </button>
                </ModalFooter>
            </Modal>
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deletemodal={deletemodal} deleteModaltoggle={() => setdeletemodal(prevState => !prevState)}
                        deleteFunc={deleteFunc}/>
            <AgreeModal deletemodal={deletemodalIsCustomer}
                        deleteModaltoggle={() => setdeletemodalIsCustomer(prevState => !prevState)}
                        deleteFunc={deleteFuncIsCustomer}>
                <div>
                    <div className={'d-flex align-items-center m-3'}>
                        <input type="radio" name='money' value={"true"} checked={backing === "true"} onChange={(e) => {
                            setBacking(e.target.value);
                        }} className={'mx-2'} style={{transform: 'scale(1.5)'}}/>
                        <label htmlFor="" className={'p-0 m-0'}>{t('mah.63')}</label>
                    </div>
                    <div className={'d-flex align-items-center m-3'}>
                        <input type="radio" name='money' value={"false"} checked={backing === "false"}
                               onChange={(e) => {
                                   setBacking(e.target.value);
                               }} className={'mx-2'} style={{transform: 'scale(1.5)'}}/>
                        <label htmlFor="" className={'p-0 m-0'}>{t('mah.64')}</label>
                    </div>
                </div>
            </AgreeModal>
        </>

    )
}

export default connect((CustomerReducer, checkReducer, SavdoQoshishReducer, users, XodimReducer, PayReducer), {
    getCustomersForTrade,
    getCustomersForTradeBusiness,
    getUserForFiltering,
    getInvoice,
    getTradeById,
    viewTradeById,
    getTradeByBranch,
    getTradeByBusiness,
    getUserForFilteringBusiness,
    saveSavdolar,
    editSavdolar,
    deleteSavdolar,
    getPay
})(TradeReportAll)
