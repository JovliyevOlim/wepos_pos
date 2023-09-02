import {Link} from 'react-router-dom'
import Edit from '../../../../../img/Edit.png'
import Delete from '../../../../../img/Delete.png'
import Korish from '../../../../../img/Korish.png'
import './barcasavdolar.css'
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
} from "../reducer/SavdoQoshishReducer";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import formatDate, {camelize} from "../../../../../util";
import Loading from "../../../../Loading";
import {Pagination} from "antd";
import Imagecom from "../../../../Imagecom";
import {useReactToPrint} from "react-to-print";
import checkReducer, {getInvoice} from "../../../../../reducer/checkReducer";
import {AiOutlineFileText} from "react-icons/ai";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import {Box, TablePagination} from "@mui/material";
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

function BarchaSavdolar({
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
    const [backing,setBacking] = useState('true')


    function viewTradeInfoById(id) {
        setIsViewTrade(true)
        viewTradeById(id)
    }

    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setPage(0)
        setLimit(parseInt(event.target.value));
    };


    useEffect(() => {
        if (users.getTradeAdmin && !mainBranch) {
            getTradeByBusiness({
                businessId: users.businessId,
                params: {
                    page: page,
                    size: limit,
                    customerId, paymentStatus, userId,
                    invoice: search
                }
            })
        } else if (users.getTrade){
            getTradeByBranch({
                branchId: mainBranch ? mainBranch : users.branchId,
                params: {
                    page: page,
                    size: limit,
                    customerId, paymentStatus, userId,
                    invoice: search
                }
            })
        }
    }, [SavdoQoshishReducer.current, limit, page, customerId, userId, paymentStatus, mainBranch, search])


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
        setTimeout(() => {
            setLoading(true)
        }, 200)
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
                params:{
                    back:true
                }
            }
        )
        setSaveModal(true)
    }
    function deleteFuncIsCustomer() {
        deleteSavdolar( {
            deleteID,
            params:{
                back:backing === "true" ? true : false
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
        <div className="col-md-12 mt-2 mb-4 mt-4 ">
            <div className="textHeader">
                <h2>{t('Trade.1')}</h2>
            </div>
            {
                users.getTrade || users.getTradeAdmin ?
                    <div className="rowStyleH">
                        <div className="qoshish">
                            <h5>{t('Buttons.16')}</h5>
                        </div>
                        <div className="row cont">
                            <div className="col-md-3">
                                <h6>{t('ProductList.8')}:</h6>
                                <select name="" className={'form-control'} value={mainBranch}
                                        onChange={(e) => setMainBranch(e.target.value === "" ? null : e.target.value)}
                                        id="">
                                    {
                                        users.getTradeAdmin ? <option value="">Barchasi</option> : null
                                    } {
                                    users.branches?.map(item => <option value={item.id}>{item.name}</option>)
                                }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <h6>Mijozlar:</h6>
                                <select name="" className={'form-control'} value={customerId}
                                        onChange={(e) => setCustomerId(e.target.value === "" ? null : e.target.value)}
                                        id="">
                                    <option value="">Barchasi</option>
                                    {
                                        CustomerReducer.customersTrade?.map(item => <option
                                            value={item.id}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <h6>Xodimlar:</h6>
                                <select name="" className={'form-control'} value={userId}
                                        onChange={(e) => setUserId(e.target.value === "" ? null : e.target.value)}
                                        id="">
                                    <option value="">Barchasi</option>
                                    {
                                        XodimReducer.usersFiltering?.map(item => <option
                                            value={item.id}>{item?.fio}</option>)
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <h6>To'lov Holati:</h6>
                                <select name="" className={'form-control'} value={paymentStatus}
                                        onChange={(e) => setPaymentStatus(e.target.value === "" ? null : e.target.value)}
                                        id="">
                                    <option value="">Barchasi</option>
                                    <option value={'TOLANGAN'}>To'langan</option>
                                    <option value={'QISMAN_TOLANGAN'}>Qisman to'langan</option>
                                    <option value={'TOLANMAGAN'}>To'lanmagan</option>
                                </select>
                            </div>

                            <div className="col-md-12">
                                <h6>Savdo raqami bilan izlash:</h6>
                                <input type="text" value={search} placeholder="Savdo raqamini kiriting..."
                                       onChange={(e) => setSearch(e.target.value === '' ? null : e.target.value)}
                                       className={'form-control'} min={0}/>
                            </div>
                        </div>
                    </div> : ''
            }
            <div className="rowStyleH2">
                <div className="qoshish">
                    <h5>{t('Trade.1')}</h5>
                    {
                        users.addTrade ?
                            <Link to={'/shopping'}>
                                <button className='btn btn-primary'>+{t('Buttons.2')}</button>
                            </Link>
                            : ''
                    }
                </div>
                {
                    users.getTrade || users.getTradeAdmin ?
                        loading ?
                            SavdoQoshishReducer?.trades?.list?.length > 0 ?
                                <div>
                                    <div className="table-responsive table-wrapper-scroll-y">
                                        <table className='table table-striped table-bordered mt-4'>
                                            <thead>
                                            <tr>
                                                <th>T/R</th>
                                                <th>{t('Trade.4')}</th>
                                                <th>{t('Trade.5')}</th>
                                                <th>{t('Pagination.10')}</th>
                                                <th>Xodim</th>
                                                <th>{t('ProductList.8')}</th>
                                                <th>{t('Purchase.4')}</th>
                                                {/*<th>{t('Purchase.26')}</th>*/}
                                                <th>{t('Purchase.22')}</th>
                                                <th>{t('Trade.6')}</th>
                                                <th>{t('Supplier.8')}</th>
                                                <th>Amallar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                SavdoQoshishReducer.trades?.list?.map((item, index) => <tr
                                                    key={item?.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{moment(new Date(item?.date)).format('LLLL')}</td>
                                                    <td className={item.edit && 'bg-warning'}>{item?.invoice}</td>
                                                    <td>{item?.customerName}</td>
                                                    <td>{item?.userFio}</td>
                                                    <td>{item?.branchName}</td>
                                                    <td>{item?.paymentStatus}</td>
                                                    {/*<td>{item?.paymentGetDtoList?.map((item, index) =>*/}
                                                    {/*    <p>{item?.paymentMethodName}</p>)}</td>*/}
                                                    <td>
                                                        {item?.totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} So'm
                                                    </td>
                                                    <td>
                                                        {item?.paidSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} So'm
                                                    </td>
                                                    <td>
                                                        {item?.debtSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} So'm

                                                    </td>
                                                    <td>
                                                        <div className={'d-flex'}>
                                                            {
                                                                users.getTrade ?
                                                                    <button onClick={() => viewTradeInfoById(item?.id)}
                                                                            className='korish'><img src={Korish}
                                                                                                    alt=""/> {t('Buttons.4')}
                                                                    </button>
                                                                    : ''
                                                            }
                                                            {
                                                                users.editTrade && item?.editable ?
                                                                    <Link to={'/shopping/' + item?.id}>
                                                                        <button className='taxrirlash'><img src={Edit}
                                                                                                            alt=""/> {t('Buttons.1')}
                                                                        </button>
                                                                    </Link> : ''
                                                            }
                                                            {
                                                                users.editTrade &&  item?.editable ?
                                                                    <Link
                                                                        to={'/repeatProducts/' + item?.id + "/" + item?.id}>
                                                                        <button className='taxrirlash'><img src={Edit}
                                                                                                            alt=""/>Qaytarish
                                                                        </button>
                                                                    </Link> : ''
                                                            }
                                                            {
                                                                users.deleteTrade && item?.editable ?
                                                                    <button onClick={() => item?.customerName ? deleteTradeByIdIsCustomer(item.id) : deleteTradeById(item.id)}
                                                                            className='ochirish'><img
                                                                        src={Delete} alt=""/> {t('Buttons.3')}
                                                                    </button> : ''
                                                            }
                                                        </div>
                                                        {/*<button*/}
                                                        {/*    onClick={() => checkModalOpen(item.id, item?.branch?.id)}*/}
                                                        {/*    className='taxrirlash checkView'><AiOutlineFileText*/}
                                                        {/*    fontSize={18}/>Checkni ko'rish*/}
                                                        {/*</button>*/}


                                                    </td>
                                                </tr>)
                                            }
                                            </tbody>
                                        </table>
                                    </div>

                                    <Box p={2}>
                                        <TablePagination
                                            component="div"
                                            count={SavdoQoshishReducer?.trades?.totalItem}
                                            onPageChange={handlePageChange}
                                            onRowsPerPageChange={handleLimitChange}
                                            page={page}
                                            rowsPerPageOptions={[5, 10, 15]}
                                            rowsPerPage={limit}
                                        />
                                    </Box>

                                </div> :
                                <div className={'border border-2'}>
                                    <h4 className={'text-center'}>{SavdoQoshishReducer.message}</h4>
                                </div> : <Loading/>
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
                            Savdo raqami:
                        </h4>
                        <h4 style={{fontSize: 12, fontWeight: 600}}>
                            {
                                SavdoQoshishReducer?.trade?.invoice
                            }
                        </h4>
                    </div>
                    <div className={'d-flex align-items-center justify-content-between'}>
                        <h4 style={{fontSize: 12, fontWeight: 600}}>Mijoz: </h4>
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
                                        {(item.totalSalePrice / item.tradedQuantity)} So'm</h4>
                                    <h4 style={{fontSize: 12, fontWeight: 600, lineHeight: 1}}>
                                        = {item.totalSalePrice}So'm
                                    </h4>
                                </div>
                            </div>)
                        }
                    </div>
                    <div style={{borderBottom: "1px dashed #000", marginTop: 20}}></div>
                    <div className={'d-flex'}>
                        <div style={{width: "100%"}}>
                            <div className={"d-flex justify-content-between"}>
                                <h4 style={{fontSize: 14, fontWeight: 800}}>Jami: </h4>
                                <h4 style={{
                                    fontSize: 14,
                                    fontWeight: 800
                                }}>{SavdoQoshishReducer?.trade?.totalSum} So'm</h4>
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
                                            }}>{item.paidSum} So'm</h4>
                                        </div>
                                    ) : ''
                            }
                            <div className={"d-flex justify-content-between"}>
                                <h4 style={{fontSize: 13, fontWeight: 600}}>To'langan summa:</h4>
                                <h4 style={{
                                    fontSize: 13,
                                    fontWeight: 600
                                }}>{SavdoQoshishReducer?.trade?.paidSum} So'm</h4>
                            </div>
                            {
                                SavdoQoshishReducer?.trade?.customer ?
                                    <div className={"d-flex justify-content-between"}>
                                        <h4 style={{fontSize: 13, fontWeight: 600}}>Bugungi nasiya: </h4>
                                        <h4 style={{fontSize: 13, fontWeight: 600}}>
                                            {SavdoQoshishReducer?.trade?.debtSum} So'm
                                        </h4>
                                    </div> : ''
                            }
                            {
                                SavdoQoshishReducer?.trade?.customer ?
                                    <div className={"d-flex justify-content-between"}>
                                        <h4 style={{fontSize: 14, fontWeight: 800}}>Umumiy qarz: </h4>
                                        <h4 style={{
                                            fontSize: 14,
                                            fontWeight: 800
                                        }}>{SavdoQoshishReducer.trade?.customer?.debt} So'm</h4>
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
            </div>
            <Modal isOpen={isViewTrade} size={'xl'} toggle={() => setIsViewTrade(!isViewTrade)}>
                <ModalHeader>
                    <h4>
                        Savdo Ma'lumotlarini Ko'rish
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
                                                <div className="col-md-4"><p>Savdo
                                                    Raqami: <strong> {item?.invoice}</strong></p>
                                                </div>
                                                <div className="col-md-4"><p>Savdo
                                                    Sanasi: <strong> {moment(new Date(item?.createdAt)).format('LLLL')}</strong>
                                                </p>
                                                </div>
                                                <div className="col-md-4">
                                                    {
                                                        item?.paymentGetDtoList.map(item =>
                                                            <p>To'lov
                                                                turi: <strong>{camelize(item?.paymentMethodName)}:</strong>  {item?.sum} so'm
                                                            </p>
                                                        )
                                                    }

                                                </div>
                                                <div className="col-md-4"><p>To'lov
                                                    Holati: <strong>{item?.paymentStatus}</strong></p>
                                                </div>
                                                <div className="col-md-12">
                                                    <p>Xodim: <strong>{item?.userFio}</strong></p>
                                                </div>
                                            </div>
                                            <div className="col-md-12 d-flex flex-wrap">
                                                <div className="col-md-5">
                                                    {
                                                        item?.customerName &&
                                                        <div>
                                                            <p>Mijoz: <strong>{item?.customerName}</strong></p>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-md-5">
                                                    {
                                                        item?.customerPhoneNumber &&
                                                        <div>
                                                            <p>Telefon
                                                                raqami: <strong>{item?.customerPhoneNumber}</strong></p>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-md-5">
                                                    <p className={''}>Jami Summa: <strong>{item?.totalSum} So'm</strong>
                                                    </p>
                                                </div>
                                                <div className="col-md-5">
                                                    <p className={''}>To'langan
                                                        Summa: <strong>{item?.paidSum} So'm</strong>
                                                    </p>
                                                </div>
                                                <div className="col-md-5">
                                                    <p className={''}>Qarz: <strong>{item.debtSum} So'm</strong>
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div  className={'table-responsive'}>
                                        <table className={'table table-bordered'}>
                                            <thead>
                                            <tr>
                                                <th>Tr</th>
                                                <th>Mahsulot</th>
                                                <th>Miqdori</th>
                                                <th>Qaytarilgan miqdor</th>
                                                <th>Foyda</th>
                                                <th>Jami summa</th>
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
                                                            {item?.totalSalePrice}
                                                        </th>
                                                        <th>
                                                            {item?.profit} So'm
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
                    <button className={'btn btn-danger'} onClick={() => setIsViewTrade(!isViewTrade)}>Chiqish
                    </button>
                </ModalFooter>
            </Modal>
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deletemodal={deletemodal} deleteModaltoggle={() => setdeletemodal(prevState => !prevState)}
                        deleteFunc={deleteFunc}/>
            <AgreeModal deletemodal={deletemodalIsCustomer} deleteModaltoggle={() => setdeletemodalIsCustomer(prevState => !prevState)}
                        deleteFunc={deleteFuncIsCustomer}>
                    <div>
                        <div className={'d-flex align-items-center m-3'}>
                            <input type="radio" name='money' value={"true"} checked={backing === "true"} onChange={(e)=>{
                                setBacking(e.target.value);
                            }} className={'mx-2'} style={{transform:'scale(1.5)'}}/>
                            <label htmlFor="" className={'p-0 m-0'}>Pulni Mijozga qaytarish</label>
                        </div>
                        <div className={'d-flex align-items-center m-3'}>
                            <input type="radio" name='money'  value={"false"} checked={backing === "false"}  onChange={(e)=>{
                                setBacking(e.target.value);
                            }}  className={'mx-2'} style={{transform:'scale(1.5)'}}/>
                            <label htmlFor="" className={'p-0 m-0'}>Pulni Mijozni hisobiga o'tkazish</label>
                        </div>
                    </div>
            </AgreeModal>
        </div>

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
})(BarchaSavdolar)
