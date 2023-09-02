import {Link, Switch, Route} from 'react-router-dom'
import './savdoqilingantulov.css'
import React, {useState, useEffect, useRef} from "react";
import SavdodagiTulovReducer, {getTradeReportByBranch, getTradeReportByBusiness} from '../reducer/SavdodagiTulovReducer'
import {connect} from 'react-redux'
import {useTranslation} from "react-i18next";
import users from "../../../../../reducer/users";
import CustomerReducer, {
    getCustomersForTrade,
    getCustomersForTradeBusiness
} from "../../Hamkorlar/reducer/CustomerReducer";
import XodimReducer, {getUserForFilteringBusiness, getUserForFiltering} from "../../Hodimlar/reducer/XodimReducer";
import Loading from "../../../../Loading";
import {IconButton, TablePagination} from "@mui/material";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Svg/MainHeaderText";
import CardBody from "../../../../Svg/CardBody";
import SelectAnt, {SearchAnt} from "../../../../Svg/SelectAnt";

function SavdodaTulov({
                          users,
                          SavdodagiTulovReducer,
                          getBarcodeAndName,
                          MaxsulotlarRoyxariReducer,
                          CustomerReducer,
                          XodimReducer,
                          getCustomersForTrade, getCustomersForTradeBusiness,
                          getUserForFilteringBusiness, getUserForFiltering,
                          getTradeReportByBranch, getTradeReportByBusiness
                      }) {

    const {t} = useTranslation()


    const [mainBranchId, setMainBranchId] = useState(null)
    const [customerId, setCustomerId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [productId, setProductId] = useState(null)
    const [backing, setBacking] = useState(false)
    const [backingString, setBackingString] = useState('')
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [search, setSearch] = useState('')
    const [isView, setIsView] = useState(false)
    const [loading, setLoading] = useState(false)

    function changeSearch(e) {
        setSearch(e.target.value)
        setIsView(true)
        if(e.target.value === ''){
            setProductId(null)
            setIsView(false)
        }
        else{
            getBarcodeAndName({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                name: e.target.value
            })
        }
    }

    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setPage(0)
        setSize(parseInt(event.target.value));
    };

    function changeBacking(e) {
        if (e === "true") {
            setBackingString(e);
            setBacking(true)
        } else {
            setBacking(false)
            setBackingString(e);
        }
    }

    function selectProduct(id, name) {
        setSearch(name)
        setProductId(id)
        setIsView(false)
    }

    function removeProduct() {
        setSearch('')
        setProductId(null)
    }

    useEffect(() => {
        setLoading(false)
        if (users.getInfoAdmin && !mainBranchId) {
            setProductId(null)
            getTradeReportByBusiness({
                businessId: users.businessId,
                params: {
                    page, size, backing,
                    customerId,
                    userId, productId
                }
            })
        } else {
            getTradeReportByBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    page, size, backing,
                    customerId,
                    userId, productId
                }
            })
        }
    }, [page, size, backing, customerId, userId, productId, mainBranchId])
    useEffect(() => {
        setPage(0)
    }, [size, backing, customerId, userId, productId, mainBranchId])
    useEffect(() => {
        if (users.getUserAdmin && !mainBranchId) {
            getUserForFilteringBusiness(users.businessId)
        } else {
            getUserForFiltering(mainBranchId ? mainBranchId : users.branchId)
        }
        if (users.getCustomerAdmin && !mainBranchId) {
            getCustomersForTradeBusiness(users.businessId)
        } else {
            getCustomersForTrade(mainBranchId ? mainBranchId : users.branchId)
        }
    }, [mainBranchId])


    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 200)
    }, [SavdodagiTulovReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div>
            <div className="col-md-12 d-flex mb-3">
               <MainHeaderText text={'Savdolar hisoboti'}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex row-gap-4 flex-wrap">
                    <div className="col-md-3">
                        <SelectAnt selectList={users?.branches} permission={users.getInfoAdmin} name={'Filiallar'} onChange={(e) => setMainBranchId(e === '' ? null : e)}/>
                    </div>
                    <div className="col-md-3">
                        <SelectAnt selectList={CustomerReducer.customersTrade} permission={true}
                                   name={'Mijozlar'} onChange={(e) => setCustomerId(e === "" ? null : e)}/>
                    </div>
                    <div className="col-md-3">
                        <SelectAnt selectList={XodimReducer.usersFiltering?.map((item) => ({
                            id: item.id,
                            name: item.fio
                        }))} permission={true}
                                   name={'Hodimlar'} onChange={(e) => setUserId(e === '' ? null : e)}/>
                    </div>
                    <div className="col-md-3">
                        <SelectAnt selectList={[{id:'true',name:'Qaytarilgan'}]} permission={true}
                                   name={'Mahsulotlar'} onChange={changeBacking}/>
                    </div>
                    {
                        mainBranchId &&
                        <div className="col-md-6">
                            <SearchAnt onChange={changeSearch} name={'Mahsulotni qidirish'}/>
                            {
                                isView && MaxsulotlarRoyxariReducer.productSearch?.length > 0 ?
                                    <div className={'Combo-array'}>
                                        {
                                            MaxsulotlarRoyxariReducer.productSearch?.map(item =>
                                                <p onClick={() => selectProduct(item.id, item.name)}>
                                                    {item.name}
                                                </p>
                                            )
                                        }
                                    </div>
                                    : ''
                            }
                        </div>
                    }
                </div>
            </CardBody>
            <div className="rowStyleST2">
                {
                    loading ?
                        SavdodagiTulovReducer.tradeReports?.list?.length > 0 ?
                            <div>
                                <div className="table-responsive">
                                    <table
                                        className='table table-hover table-primary table-striped table-bordered mt-4 mb-4 '>
                                        <thead>
                                        <tr>

                                            <th>T/R</th>
                                            <th>Savdo</th>
                                            <th>Mahsulot</th>
                                            <th>Filial</th>
                                            <th>Mijoz</th>
                                            <th>Xodim</th>
                                            <th>Sana</th>
                                            <th>Miqdor</th>
                                            <th>Qaytgan Miqdor</th>
                                            <th>Jami Summa</th>
                                            <th>Foyda</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            SavdodagiTulovReducer.tradeReports?.list?.map((item, index) => <tr
                                                key={item.id}>
                                                <td>{index + (page * size) + 1}</td>
                                                <td>{item.invoice}</td>
                                                <td>{item?.productName}</td>
                                                <td>{item?.branchName}</td>
                                                <td>{item?.customerName}</td>
                                                <td>{item?.userFio}</td>
                                                <td>{moment(new Date(item?.createdAt)).format('LLLL')}</td>
                                                <td>{item?.quantity}</td>
                                                <td>{item?.backing}</td>
                                                <td>{item?.totalSalePrice} so'm</td>
                                                <td>{item?.profit} so'm</td>
                                            </tr>)
                                        }
                                        </tbody>
                                    </table>
                                    <TablePagination
                                        component="div"
                                        count={SavdodagiTulovReducer.tradeReports?.totalItem}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleLimitChange}
                                        page={page}
                                        rowsPerPageOptions={[5, 10, 15]}
                                        rowsPerPage={size}
                                    />
                                </div>
                            </div> : <div>
                                <h4 className={'text-center'}>{SavdodagiTulovReducer.message}</h4>
                            </div> : <Loading/>
                }


                {/*// <Modal isOpen={check} toggle={checktoggle} size={'xl'}>*/}
                {/*//     <ModalHeader>*/}
                {/*//         Savdo ma'lumotlari*/}
                {/*//     </ModalHeader>*/}
                {/*//     <ModalBody>*/}
                {/*//         <div className={'table-responsive'}>*/}
                {/*//             <table className={'table table-striped table-primary table-hover border border-1'}>*/}
                {/*//                 <thead>*/}
                {/*//                 <tr>*/}
                {/*//                     <th>T/R</th>*/}
                {/*//                     <th>To'lov holati</th>*/}
                {/*//                     <th>Mijoz</th>*/}
                {/*//                     <th>Mijoz qarzi</th>*/}
                {/*//                     <th>Tel raqam:</th>*/}
                {/*//                 </tr>*/}
                {/*//                 </thead>*/}
                {/*//                 <tbody>*/}
                {/*//                 {*/}
                {/*//                     SavdodagiTulovReducer.savdoOne?*/}
                {/*//                     SavdodagiTulovReducer.savdoOne.map((item, index) => <tr key={index}>*/}
                {/*//                         <td>{index + 1}</td>*/}
                {/*//                         <td> {item.paymentStatus?.status}</td>*/}
                {/*//                         <td>{item.customer?.name}</td>*/}
                {/*//                         <td>{item.customer?.debt.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}</td>*/}
                {/*//                         <td>{item.customer?.phoneNumber}</td>*/}
                {/*//                     </tr>):''*/}
                {/*//                 }*/}
                {/*//                 </tbody>*/}
                {/*//             </table>*/}
                {/*//*/}
                {/*//         </div>*/}
                {/*//         <div className={'table-responsive'}>*/}
                {/*//             <table className={'table mt-2 border border-1 table-striped table-hover'}>*/}
                {/*//                 <thead>*/}
                {/*//                 <tr>*/}
                {/*//                     <th>T/R</th>*/}
                {/*//                     <th>Mahsulot</th>*/}
                {/*//                     <th>Miqdor</th>*/}
                {/*//                     <th>Sotish narxi</th>*/}
                {/*//                     /!*<th>Chegirma</th>*!/*/}
                {/*//                     /!*<th>Soliq</th>*!/*/}
                {/*//                     <th>Jami</th>*/}
                {/*//                 </tr>*/}
                {/*//                 </thead>*/}
                {/*//                 <tbody>*/}
                {/*//                 {*/}
                {/*//                     SavdodagiTulovReducer.savdoTwo.map((item, index) => <tr key={index}>*/}
                {/*//                         <td>{index + 1}</td>*/}
                {/*//                         <td>{item.product ?  item.product?.name : item.productTypePrice?.name}</td>*/}
                {/*//                         <td>{item.tradedQuantity}</td>*/}
                {/*//                         <td>{item.product ?  item.product?.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") : item.productTypePrice?.salePrice}</td>*/}
                {/*//                         /!*<td>0</td>*!/*/}
                {/*//                         /!*<td>{item.product?.tax}</td>*!/*/}
                {/*//                         <td>{(item.tradedQuantity * (item.product ?  item.product?.salePrice : item.productTypePrice?.salePrice)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}</td>*/}
                {/*//                     </tr>)*/}
                {/*//*/}
                {/*//                 }*/}
                {/*//                 </tbody>*/}
                {/*//*/}
                {/*//             </table>*/}
                {/*//         </div>*/}
                {/*//*/}
                {/*//         {*/}
                {/*//             SavdodagiTulovReducer.savdoOne.map((item, index) => <div className={'text-end'} key={index}>*/}
                {/*//                 JAMI: {item.totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")} so'm*/}
                {/*//             </div>)*/}
                {/*//         }*/}
                {/*//*/}
                {/*//     </ModalBody>*/}
                {/*//     <ModalFooter>*/}
                {/*/!*        /!*<button className={'btn btn-outline-primary'}>Print</button>*!/*!/*/}
                {/*/!*        <button onClick={print} className={'btn btn-outline-primary'}>*!/*/}
                {/*/!*            /!*<ReactToPrint*!/*!/*/}
                {/*/!*            /!*    trigger={() => <p style={{marginBottom: 0}}>Print (Chek)</p>*!/*!/*/}
                {/*/!*            /!*    }*!/*!/*/}
                {/*/!*            /!*    content={() => componentRef.current}*!/*!/*/}
                {/*/!*            /!*//*!/*/}
                {/*/!*        </button>*!/*/}
                {/*/!*        <button onClick={checktoggle} className={'btn btn-outline-primary'}>Chiqish</button>*!/*/}
                {/*/!*    </ModalFooter>*!/*/}
                {/*/!*</Modal>*!/*/}
            </div>
        </div>
    )
}

export default connect((users, SavdodagiTulovReducer, CustomerReducer, XodimReducer, MaxsulotlarRoyxariReducer),
    {
        getCustomersForTrade, getCustomersForTradeBusiness,
        getUserForFilteringBusiness, getUserForFiltering,
        getTradeReportByBranch, getTradeReportByBusiness, getBarcodeAndName
    })(SavdodaTulov)
