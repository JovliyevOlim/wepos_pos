import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {camelize} from "../../../../../util";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import XodimReducer, {getUserForFiltering, getUserForFilteringBusiness} from "../../Hodimlar/reducer/XodimReducer";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import balanceReducer, {
    getBalanceHistoryByBranch,
    getBalanceHistoryByBusiness
} from "../../../../../reducer/balanceReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt from "../../../../Components/SelectAnt";
import {Pagination} from "antd";

function BalanceHistory({
                            users,
                            getPay,
                            PayReducer,
                            balanceReducer,
                            getBalanceHistoryByBranch,
                            getBalanceHistoryByBusiness,
                            XodimReducer,
                            getUserForFiltering,
                            getUserForFilteringBusiness

                        }) {
    const {t} = useTranslation()


    const [mainBranchId, setMainBranchId] = useState(null)
    const [paymentMethodId, setPaymentMethodId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [plus, setPlus] = useState(null)
    const [plusSelect, setPlusSelect] = useState('')
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [loading, setLoading] = useState(false)

    moment.locale("uz-latn")


    function changePlus(e) {
        setPlusSelect(e)
        if (e === 'true') {
            setPlus(true)
        } else if (e === '') {
            setPlus(null)
        } else {
            setPlus(false)
        }
    }

    const handlePageChange = (page) => {
        setPage(page-1);
    };
    const handleLimitChange = (value,size) => {
        console.log(size)
        setPage(0)
        setSize(parseInt(size));
    };


    useEffect(() => {
        setLoading(false)
        if (users.getBalanceAdmin && !mainBranchId) {
            getBalanceHistoryByBusiness({
                businessId: users.businessId,
                params: {
                    page, size, paymentMethodId, userId, plus
                }
            })
        } else if (users.getBalance) {
            getBalanceHistoryByBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    page, size, paymentMethodId, userId, plus
                }
            })
        }
    }, [mainBranchId, page, size, plus, userId, paymentMethodId])

    useEffect(() => {
        setPage(0)
    }, [mainBranchId, size, plus, paymentMethodId, userId])

    useEffect(() => {
        if (users.getUserAdmin && !mainBranchId) {
            getUserForFilteringBusiness(users.businessId)
        } else {
            getUserForFiltering(mainBranchId ? mainBranchId : users.branchId)
        }
    }, [mainBranchId])


    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 200)
    }, [balanceReducer.getBoolean])

    useEffect(() => {
        getPay()
        setLoading(false)
    }, [])


    return (
        <div className="col-md-12 mt-4 mb-4">
            <MainHeaderText text={t('bal.1')}/>
            {
                users.getBalance || users.getBalanceAdmin ?
                    <CardBody>
                        <div className="col-md-12 gap-2 gap-sm-0 d-flex flex-wrap">
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 p-sm-2">
                                <SelectAnt name={t('bal.2')}
                                           onChange={(e) => setMainBranchId(e === "" ? null : e)}
                                           selectList={users.branches} permission={users.getBalanceAdmin}/>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 p-sm-2">
                                <SelectAnt name={t('bal.3')}
                                           onChange={(e) => setPaymentMethodId(e === "" ? null : e)}
                                           selectList={PayReducer?.paymethod} permission={true}/>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 p-sm-2">
                                <SelectAnt name={t('bal.4')}
                                           onChange={(e) => setUserId(e === "" ? null : e)}
                                           selectList={XodimReducer.usersFiltering.map((item) => ({id: item.id, name: item.fio}))} permission={true}/>
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 p-sm-2">
                                <SelectAnt name={t('bal.5')}
                                           onChange={changePlus}
                                           selectList={[{id:'true',name:'Kirimlar'},{id:'false',name:'Chiqimlar'}]} permission={true}/>
                            </div>
                        </div>
                    </CardBody>

                    : ''

            }
            <div>
            </div>
            <div className="rowStyleXH2">
                <div>
                    {
                        users.getBalance || users.getBalanceAdmin ?
                            loading ?
                                balanceReducer.balanceHistory.list?.length > 0 ?
                                    <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                        <table
                                            className='table table-hover table-primary table-striped table-bordered mt-4 '>
                                            <thead>
                                            <tr>
                                                <th>T/R</th>
                                                <th>{t('bal.6')}</th>
                                                <th>{t('bal.7')}</th>
                                                <th>{t('bal.8')}</th>
                                                <th>{t('bal.9')}</th>
                                                <th>{t('bal.10')}</th>
                                                <th>{t('bal.11')}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                balanceReducer.balanceHistory?.list?.map((item, index) =>
                                                    <tr key={item.id}>
                                                        <td>{index + 1 + (page * size)}</td>
                                                        <td>{item?.userFio}</td>
                                                        <td>{item?.branchName}</td>
                                                        <td>{camelize(item?.paymentMethodName)}</td>
                                                        <td>{item?.sum} so'm</td>
                                                        {/*<td>{new Date(item?.createdAt).toLocaleDateString()}</td>*/}
                                                        <td>{moment(new Date(item?.createdAt)).format('LLLL')}</td>
                                                        {/*<td><span onClick={() => checktoggle(item?.purchaseId)}*/}
                                                        {/*          className={'sCh'}>CHECK</span></td>*/}
                                                        {/*<td>{item.debt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>*/}
                                                        <td>{item?.description}</td>
                                                    </tr>)
                                            }
                                            </tbody>
                                        </table>
                                        <div className={'d-flex justify-content-end'}>
                                            <Pagination
                                                total={balanceReducer.balanceHistory?.totalItem}
                                                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                                                pageSize={size}
                                                showSizeChanger
                                                onShowSizeChange={handleLimitChange}
                                                pageSizeOptions={[5, 10, 15]}
                                                current={page+1}
                                                onChange={handlePageChange}
                                            />
                                        </div>

                                    </div> : <div>
                                        <h4 className={'text-center'}>{balanceReducer.message}</h4>
                                    </div> :
                                <Loading/> : ''
                    }

                </div>
            </div>
        </div>
    )
}

export default connect((users, XodimReducer, PayReducer, balanceReducer),
    {
        getUserForFiltering, getPay,
        getUserForFilteringBusiness,
        getBalanceHistoryByBranch, getBalanceHistoryByBusiness,
    })(BalanceHistory)
