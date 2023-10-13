import './mijozlarxisoboti.css'
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import MijozHisobotiReducer, {
    getCustomerReportByBusiness,
    getCustomerReportByBranch
} from "../reducer/MijozHisobotiReducer";
import CustomerReducer, {
    getCustomersForTrade,
    getCustomersForTradeBusiness
} from "../../Hamkorlar/reducer/CustomerReducer";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";
function MijozlarXisoboti({
                              users, CustomerReducer, getCustomersForTrade, getCustomersForTradeBusiness,
                              MijozHisobotiReducer, getCustomerReportByBusiness, getCustomerReportByBranch,
                              PayReducer, getPay
                          }) {
    const {t} = useTranslation()

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: '2%',
        },
        {
            title: 'Mijoz',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: t('ol.13'),
            dataIndex: 'branchName',
            key: 'branchName',
        },
        {
            title: 'Summa',
            dataIndex: 'sum',
            key: 'sum',
            render: (item) => <p className={'m-0'}>{item} so'm</p>
        },

        {
            title: 'To\'lov turi',
            dataIndex: 'paymentMethodName',
            key: 'paymentMethodName',
            width: '120px'
        },

        {
            title: 'Tavsif',
            dataIndex: 'description',
            key: 'description',
            width: '200px'
        },
        {
            title: t('ol.11'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>
        },
    ];


    const [mainBranchId, setMainBranchId] = useState(null)
    const [customerId, setCustomerId] = useState(null)
    const [paymentMethodId, setPaymentMethodId] = useState(null)
    const [plus, setPlus] = useState(false)
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [loading, setLoading] = useState(false)


    const handlePageChange = (newPage) => {
        setPage(newPage-1);
    };
    const handleLimitChange = (event,size) => {
        setPage(0)
        setSize(size);
    };


    useEffect(() => {
        setLoading(false)
        if (users.getInfoAdmin && !mainBranchId) {
            getCustomerReportByBusiness({
                businessId: users.businessId,
                params: {
                    page, size, paymentMethodId, customerId,
                    plus: plus === "true" ? true  :  plus === 'false' ? false : null
                }
            })
        } else {
            getCustomerReportByBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    page, size, paymentMethodId, customerId,
                    plus: plus === "true" ? true  : plus === 'false' ? false : null

                }
            })
        }
    }, [mainBranchId, page, size, customerId,paymentMethodId,plus])

    useEffect(() => {
        setPage(0)
    }, [mainBranchId, size, paymentMethodId, customerId, plus])

    useEffect(() => {
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
    }, [MijozHisobotiReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
        getPay()
    }, [])


    return (
        <div>
            <div className="col-md-12 d-flex justify-content-between align-items-end mb-5">
                <MainHeaderText text={'Mijozlar xisoboti'}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex flex-wrap">
                    <div className="col-md-3 p-2">
                        <SelectAnt name={'Filiallar'} selectList={users.branches}
                                   onChange={(e) => setMainBranchId(e === "" ? null : e)}
                                permission={users.getInfoAdmin}
                        />
                    </div>
                    <div className="col-md-3 p-2">
                        <SelectAnt name={'Mijozlar'} selectList={CustomerReducer.customersTrade}
                                   onChange={(e) => setCustomerId(e === "" ? null : e)}
                                   permission={true}
                        />
                    </div>
                    <div className="col-md-3 p-2">
                        <SelectAnt name={'To\'lov turlari'} selectList={PayReducer.paymethod}
                                   onChange={(e) => setPaymentMethodId(e === "" ? null : e)}
                                   permission={true}
                        />
                    </div>
                    <div className="col-md-3 p-2">
                        <SelectAnt name={'Kirim-Chiqim'} selectList={[{id:'true',name:'Kirim'},{id:'false',name:'Chiqim'}]}
                                   onChange={(e) => setPlus(e === "" ? null : e)}
                                   permission={true}
                        />
                    </div>
                </div>
            </CardBody>
            <CardBody>
                <div>
                    {loading ?
                        MijozHisobotiReducer.customerReport?.list?.length > 0 ?
                            <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                <CommonTable size={size} page={page} total={MijozHisobotiReducer.customerReport?.totalItem}
                                             handlePageChange={handlePageChange}
                                             handleLimitChange={handleLimitChange} pagination={true} data={MijozHisobotiReducer.customerReport?.list}
                                             columns={columns}
                                />
                            </div> : <div>
                                <h4 className={'text-center'}>{MijozHisobotiReducer.message}</h4>
                            </div> :
                        <Loading/>
                    }

                </div>
            </CardBody>
        </div>
    )
}

export default connect((users, CustomerReducer, PayReducer, MijozHisobotiReducer),
    {
        getPay,
        getCustomersForTrade,
        getCustomersForTradeBusiness,
        getCustomerReportByBusiness,
        getCustomerReportByBranch
    })(MijozlarXisoboti)
