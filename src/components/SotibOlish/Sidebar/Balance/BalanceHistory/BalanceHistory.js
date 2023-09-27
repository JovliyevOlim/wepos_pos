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
import SelectAnt, {ButtonAnt} from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";

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
    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: 20,
        },
        {
            title: t('bal.6'),
            width: 80,
            dataIndex: 'userFio',
            key: 'userFio',
        },
        {
            title: t('bal.7'),
            width: 80,
            dataIndex: 'branchName',
            key: 'branchName',
        },
        {
            title: t('bal.8'),
            width: 80,
            dataIndex: 'paymentMethodName',
            key: 'paymentMethodName',
            render:(item)=><p className={'m-0'}>{camelize(item)}</p>
        },
        {
            title: t('bal.9'),
            width: 100,
            dataIndex: 'createdAt',
            key: 'createdAt',
            render:(item)=><p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>
        },
        {
            title: t('bal.10'),
            width: 100,
            dataIndex: 'description',
            key: 'description',
        },
    ];


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
                <CardBody>
                    {
                        users.getBalance || users.getBalanceAdmin ?
                            loading ?
                                balanceReducer.balanceHistory.list?.length > 0 ?
                                    <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                        <CommonTable
                                            columns={columns}
                                            data={balanceReducer.balanceHistory?.list}
                                            page={page}
                                            size={size}
                                            pagination={true}
                                            handleLimitChange={handleLimitChange}
                                            handlePageChange={handlePageChange}
                                            total={balanceReducer.balanceHistory?.totalItem}
                                        />
                                    </div> : <div>
                                        <h4 className={'text-center'}>{balanceReducer.message}</h4>
                                    </div> :
                                <Loading/> : ''
                    }

                </CardBody>

        </div>
    )
}

export default connect((users, XodimReducer, PayReducer, balanceReducer),
    {
        getUserForFiltering, getPay,
        getUserForFilteringBusiness,
        getBalanceHistoryByBranch, getBalanceHistoryByBusiness,
    })(BalanceHistory)
