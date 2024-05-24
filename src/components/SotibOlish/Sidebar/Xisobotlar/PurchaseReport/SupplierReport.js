import {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import moment from "moment";
import 'moment/locale/uz-latn'

import users from "../../../../../reducer/users";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import XodimReducer, {getUserForFilteringBusiness, getUserForFiltering} from "../../Hodimlar/reducer/XodimReducer";
import TaminotReducer, {getAllSupplier} from "../../Hamkorlar/reducer/TaminotReducer";
import SupplierReportReducer, {
    getSupplierReportByBusiness, getSupplierReportByBranch
} from "../reducer/SupplierReportReducer";
import Loading from "../../../../Loading";
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";
import {prettify} from "../../../../../util";

function SupplierReport({
                            users,
                            TaminotReducer,
                            XodimReducer,
                            getUserForFilteringBusiness,
                            getUserForFiltering,
                            getAllSupplier,
                            getSupplierReportByBusiness,
                            getSupplierReportByBranch,
                            SupplierReportReducer,
                            PayReducer,
                            getPay
                        }) {
    const {t} = useTranslation()
    const [mainBranchId, setMainBranchId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [supplierId, setSupplierId] = useState(null)
    const [paymentMethodId, setPaymentMethodId] = useState(null)
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [loading, setLoading] = useState(false)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: '30px',
        },
        {
            title: 'Ta\'minotchi',
            dataIndex: 'supplierName',
            key: 'supplierName',
            width: '150px'
        },
        {
            title: t('ol.13'),
            dataIndex: 'branchName',
            key: 'branchName',
        },
        {
            title: 'Xodim',
            dataIndex: 'userFio',
            key: 'userFio',
        },
        {
            title: 'Summa',
            dataIndex: 'sum',
            key: 'sum',
            render: (item) => <p className={'m-0'}>{prettify(item, 0)} so'm</p>
        },
        {
            title: 'To\'lov turi',
            dataIndex: 'paymentMethodName',
            key: 'paymentMethodName',
        },
        {
            title: t('ol.11'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>
        },
    ];


    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };
    const handleLimitChange = (event, size) => {
        setPage(0)
        setSize(size);
    };


    useEffect(() => {
        setLoading(false)
        if (users.getInfoAdmin && !mainBranchId) {
            getSupplierReportByBusiness({
                businessId: users.businessId,
                params: {
                    page, size, paymentMethodId, userId, supplierId

                }
            })
        } else {
            getSupplierReportByBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    page, size, paymentMethodId, userId, supplierId

                }
            })
        }
    }, [mainBranchId, page, size, supplierId, paymentMethodId, userId])

    useEffect(() => {
        setPage(0)
    }, [mainBranchId, size, paymentMethodId, userId, supplierId])

    useEffect(() => {
        if (users.getUserAdmin && !mainBranchId) {
            getUserForFilteringBusiness(users.businessId)
        } else {
            getUserForFiltering(mainBranchId ? mainBranchId : users.branchId)
        }
    }, [mainBranchId])


    useEffect(() => {
        setLoading(true)
    }, [SupplierReportReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
        getPay(users.businessId)
        getAllSupplier(users.businessId)
    }, [])


    return (
        <>
            <CardBody>
                <div className="col-md-12 d-flex flex-wrap">
                    <div className="col-12 col-sm-6 col-lg-3 p-2">
                        <SelectAnt permission={users.getInfoAdmin} name={'Filiallar'}
                                   onChange={(e) => setMainBranchId(e === "" ? null : e)}
                                   selectList={users.branches}/>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 p-2">
                        <SelectAnt permission={true} name={'Ta\'minotchilar'}
                                   onChange={(e) => setSupplierId(e === "" ? null : e)}
                                   selectList={TaminotReducer.AllSupplier}/>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 p-2">
                        <SelectAnt permission={true} name={"Hodimlar"}
                                   onChange={(e) => setUserId(e === "" ? null : e)}
                                   selectList={XodimReducer.usersFiltering?.map((item) => ({
                                       id: item.id,
                                       name: item.fio
                                   }))}/>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 p-2">
                        <SelectAnt permission={true} name={"To'lov turlari"}
                                   onChange={(e) => setPaymentMethodId(e === "" ? null : e)}
                                   selectList={PayReducer.paymethod}/>
                    </div>
                </div>
            </CardBody>
            <CardBody>
                <Loading spinning={loading}>
                    {
                        SupplierReportReducer.supplierReport?.list?.length > 0 ?
                            <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                <CommonTable size={size} page={page} data={SupplierReportReducer.supplierReport?.list}
                                             columns={columns}
                                             handlePageChange={handlePageChange} pagination={true}
                                             handleLimitChange={handleLimitChange}
                                             total={SupplierReportReducer.supplierReport?.totalItem}
                                />
                            </div> : <div>
                                <h4 className={'text-center'}>{SupplierReportReducer.message}</h4>
                            </div>
                    }
                </Loading>
            </CardBody>
        </>
    )
}

export default connect((users, PayReducer, XodimReducer, TaminotReducer, SupplierReportReducer),
    {
        getPay, getUserForFilteringBusiness, getUserForFiltering, getAllSupplier,
        getSupplierReportByBusiness, getSupplierReportByBranch
    })(SupplierReport)
