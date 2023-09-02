import {Link} from 'react-router-dom'
import Excel from '../../../../../img/Excel.png'
import Edit from '../../../../../img/Edit.png'
import Delete from '../../../../../img/Delete.png'
import './xarajatlarRoyxati.css'
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import XarajatlarReducer, {
    deleteXarajatlar,
    getOutlayByBusiness, getOutlayByBranch
} from "../reducer/XarajatlarReducer";
import users from '../../../../../reducer/users'
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import {TablePagination} from "@mui/material";
import AgreeModal from "../../../../AgreeModal";
import XarajatTurlariReducer, {getXarajatlarTurlari} from "../reducer/XarajatTurlariReducer";
import PayReducer,{getPay} from "../../../../../reducer/PayReducer";
import XodimReducer,{getUserForFilteringBusiness,getUserForFiltering} from "../../Hodimlar/reducer/XodimReducer";
import moment from "moment";
import 'moment/locale/uz-latn'

function XarajatlarRoyxati({
                               getOutlayByBusiness,
                               getOutlayByBranch,
                               PayReducer,getPay,
                               getUserForFilteringBusiness,getUserForFiltering,
                               users,
                               XodimReducer,
                               deleteXarajatlar,
                               XarajatlarReducer,
                               XarajatTurlariReducer,
                               getXarajatlarTurlari
                           }) {

    const {t} = useTranslation()
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [mainBranchId, setMainBranchId] = useState(null)
    const [outlayCategoryId, setOutlayCategoryId] = useState(null)
    const [paymentMethodId, setPaymentMethodId] = useState(null)
    const [userId,setUserId] = useState(null)

    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setPage(0)
        setLimit(parseInt(event.target.value));
    };

    const handleBranchChange = (e) => {
        setPage(0)
        setMainBranchId(e.target.value === '' ? null:e.target.value);
    };
    const handleOutlayCategoryChange = (e) => {
        setPage(0)
        setOutlayCategoryId(e.target.value === '' ? null:e.target.value);
    };

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setPage(0)
        if (users.getOutlayAdmin && !mainBranchId) {
                getOutlayByBusiness({
                    id: users.businessId,
                    params: {
                        page: page,
                        size: limit,
                       outlayCategoryId,paymentMethodId,userId
                    }
                })
        } else if (users.getOutlay){
            getOutlayByBranch({
                id:mainBranchId ? mainBranchId: users.branchId,
                params: {
                    page: page,
                    size: limit,
                    outlayCategoryId,paymentMethodId,userId
                }
            })
        }
    }, [XarajatlarReducer.current, page, limit,outlayCategoryId,paymentMethodId,userId,mainBranchId])

    useEffect(()=>{
        if (users.getUserAdmin && !mainBranchId){
            getUserForFilteringBusiness(users.businessId)
        }
        else{
            getUserForFiltering(users.branchId)
        }
    },[mainBranchId])

    useEffect(() => {
        if (XarajatlarReducer.saveOutlaysBool) {
            setdeletemodal(false)
            setLoading(false)
            setdeletID('')
        }
    }, [XarajatlarReducer.current])

    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState('')

    function deleteFunc() {
        deleteXarajatlar(deleteID)
    }

    function deleteOutlayById(item) {
        setdeletemodal(!deletemodal)
        setdeletID(item)
    }


    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 500)
    }, [XarajatlarReducer.getOutlaysBool])

    useEffect(() => {
        setLoading(false)
        getXarajatlarTurlari(users.businessId)
        getPay()
    }, [])

    return (
        <div className="col-md-12 mt-4 mb-4">
            <div className="textHeaderHRR">
                <h2>{t('Expenses.1')}</h2>
            </div>
            {
                users.getOutlayAdmin || users.getOutlay ?
                    <div className="rowStyleHRR">
                        <div className="qoshish">
                            <h5>{t('Buttons.16')}</h5>
                        </div>
                        <div className="col-md-12 d-flex flex-wrap">
                            <div className="col-md-3 col-sm-12">
                                <h6>{t('ProductList.8')}:</h6>
                                <select  value={mainBranchId} className={'form-control'} onChange={handleBranchChange}>
                                    {
                                        users.getOutlayAdmin ? <option value="">Barchasi</option>
                                            : ''
                                    }
                                    {
                                        users.branches.map(item => <option value={item?.id}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="col-md-3 col-sm-12">
                                <h6>{t('Expenses.3')}:</h6>
                                <select name="" id="" className={'form-control'} value={outlayCategoryId}
                                        onChange={handleOutlayCategoryChange}>
                                    <option value="">Barchasi</option>
                                    {
                                        XarajatTurlariReducer.xarajatturlari.map(item =>
                                            <option value={item.id}>{item.name}</option>
                                        )}
                                </select>
                            </div>
                            <div className="col-md-3 col-sm-12">
                                <h6>To'lov turi:</h6>
                                <select name="" id="" className={'form-control'} value={paymentMethodId}
                                        onChange={(e)=>setPaymentMethodId(e.target.value === "" ? null:e.target.value)}>
                                    <option value="">Barchasi</option>
                                    {
                                        PayReducer.paymethod.map(item =>
                                            <option value={item.id}>{item.name}</option>
                                        )}
                                </select>
                            </div>
                            <div className="col-md-3 col-sm-12">
                                <h6>Xodimlar:</h6>
                                <select name="" id="" className={'form-control'} value={userId}
                                        onChange={(e)=>setUserId(e.target.value === "" ? null:e.target.value)}>
                                    <option value="">Barchasi</option>
                                    {
                                        XodimReducer.usersFiltering.map(item =>
                                            <option value={item.id}>{item.fio}</option>
                                        )}
                                </select>
                            </div>
                        </div>
                    </div> : ''

            }

            <div className="rowStyleHRR2">
                <div className="qoshish">
                    <h5>{t('Expenses.1')}</h5>
                    {
                        users.addOutlay ?
                            <Link to={'/main/addOutlay'}>
                                <button className='btn btn-primary'>+{t('Buttons.2')}</button>
                            </Link> : ''
                    }

                </div>
                {
                    users.getOutlayAdmin || users.getOutlay ?
                        loading ?
                            XarajatlarReducer.outlays?.outlayList?.length > 0 ?
                                <div>
                                    <div className="izlashHRR2">
                                        <div>
                                            <button><img src={Excel} alt=""/> Export Excel</button>
                                        </div>
                                    </div>
                                    <div className="table-responsive table-wrapper-scroll-y ">
                                        <table className='table table-striped table-bordered mt-4 '>
                                            <thead>
                                            <tr>
                                                <th>T/R</th>
                                                <th>Shaxsi</th>
                                                <th>{t('Trade.4')}</th>
                                                <th>{t('ProductList.8')}</th>
                                                <th>Xarajat turi</th>
                                                <th>To'lov turi</th>
                                                <th>{t('Expenses.6')}</th>
                                                <th>{t('Expenses.8')}</th>
                                                <th>Amallar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {

                                                XarajatlarReducer.outlays?.outlayList.map((item, index) => <tr
                                                    key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.fio}</td>
                                                    <td>{moment(new Date(item?.date)).format('LLLL')}</td>
                                                    <td>{item.branchName}</td>
                                                    <td>{item?.outlayCategoryName}</td>
                                                    <td>{item?.paymentMethodName}</td>
                                                    <td>{item.sum} so'm</td>
                                                    {/*<td>{item.spender.firstName}</td>*/}
                                                    <td>{item.description}</td>
                                                    <td>
                                                        {
                                                            users.editOutlay ?
                                                                <Link to={'/main/addOutlay/' + item.id}>
                                                                    <button className='taxrirlash'><img src={Edit}
                                                                                                        alt=""/> {t('Buttons.1')}
                                                                    </button>
                                                                </Link> : ''
                                                        }
                                                        {
                                                            users.deleteOutlay ?
                                                                <button className='ochirish'
                                                                        onClick={() => deleteOutlayById(item.id)}><img
                                                                    src={Delete} alt=""/> {t('Buttons.3')}</button>
                                                                : ''
                                                        }
                                                    </td>
                                                </tr>)

                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    <TablePagination
                                        component="div"
                                        count={XarajatlarReducer.outlays?.totalItem}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleLimitChange}
                                        page={page}
                                        rowsPerPageOptions={[5, 10, 15]}
                                        rowsPerPage={limit}
                                    />
                                </div> :
                                <div>
                                    <h4 className={'text-center'}>{XarajatlarReducer.message}</h4>
                                </div>
                            : <Loading/>
                        : ''
                }


            </div>
            <AgreeModal deletemodal={deletemodal} deleteFunc={deleteFunc}
                        deleteModaltoggle={() => setdeletemodal(prevState => !prevState)}/>
        </div>
    )
}

export default connect((XarajatlarReducer, users, XarajatTurlariReducer,PayReducer,XodimReducer), {
    getOutlayByBusiness,
    getOutlayByBranch,
    deleteXarajatlar,
    getXarajatlarTurlari,
    getUserForFilteringBusiness,getUserForFiltering,
    getPay
})(XarajatlarRoyxati)