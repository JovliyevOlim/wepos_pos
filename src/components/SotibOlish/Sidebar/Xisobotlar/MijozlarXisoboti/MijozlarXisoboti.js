import './mijozlarxisoboti.css'
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import './mijozlarxisoboti.css'
import formatDate, {camelize} from "../../../../../util";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import {IconButton, TablePagination} from "@mui/material";
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
import MainHeaderText from "../../../../Svg/MainHeaderText";
import CardBody from "../../../../Svg/CardBody";
import SelectAnt from "../../../../Svg/SelectAnt";
function MijozlarXisoboti({
                              users, CustomerReducer, getCustomersForTrade, getCustomersForTradeBusiness,
                              MijozHisobotiReducer, getCustomerReportByBusiness, getCustomerReportByBranch,
                              PayReducer, getPay
                          }) {
    const {t} = useTranslation()


    const [mainBranchId, setMainBranchId] = useState(null)
    const [customerId, setCustomerId] = useState(null)
    const [paymentMethodId, setPaymentMethodId] = useState(null)
    const [plus, setPlus] = useState(false)
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [loading, setLoading] = useState(false)


    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setPage(0)
        setSize(parseInt(event.target.value));
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
                    <div className="col-md-3">
                        <SelectAnt name={'Filiallar'} selectList={users.branches}
                                   onChange={(e) => setMainBranchId(e === "" ? null : e)}
                                permission={users.getInfoAdmin}
                        />
                    </div>
                    <div className="col-md-3">
                        <SelectAnt name={'Mijozlar'} selectList={CustomerReducer.customersTrade}
                                   onChange={(e) => setCustomerId(e === "" ? null : e)}
                                   permission={true}
                        />
                    </div>
                    <div className="col-md-3">
                        <SelectAnt name={'To\'lov turlari'} selectList={PayReducer.paymethod}
                                   onChange={(e) => setPaymentMethodId(e === "" ? null : e)}
                                   permission={true}
                        />
                    </div>
                    <div className="col-md-3">
                        <SelectAnt name={'Kirim-Chiqim'} selectList={[{id:'true',name:'Kirim'},{id:'false',name:'Chiqim'}]}
                                   onChange={(e) => setPlus(e === "" ? null : e)}
                                   permission={true}
                        />
                    </div>
                </div>
            </CardBody>
            <div className="rowStyleXH2">
                <div>
                    {loading ?
                        MijozHisobotiReducer.customerReport?.list?.length > 0 ?
                            <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                <table className='table table-hover table-primary table-striped table-bordered mt-4 '>
                                    <thead>
                                    <tr>
                                        <th>T/R</th>
                                        <th>Mijoz</th>
                                        <th>Filial</th>
                                        <th>Summa</th>
                                        <th>Status</th>
                                        <th>Tavsif</th>
                                        <th>Sana</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        MijozHisobotiReducer.customerReport?.list?.map((item, index) =>
                                            <tr key={item.id}>
                                                <td>{index + 1 + (page * size)}</td>
                                                <td>{item?.customerName}</td>
                                                <td>{item?.branchName}</td>
                                                <td>{item?.sum} so'm</td>
                                                <td>{camelize(item?.paymentMethodName)}</td>
                                                <td>{item?.description}</td>
                                                <td>{moment(new Date(item?.createdAt)).format('LLLL')}</td>
                                            </tr>)
                                    }
                                    </tbody>
                                </table>
                                <TablePagination
                                    component="div"
                                    count={MijozHisobotiReducer.customerReport?.totalItem}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleLimitChange}
                                    page={page}
                                    rowsPerPageOptions={[5, 10, 15]}
                                    rowsPerPage={size}
                                />
                            </div> : <div>
                                <h4 className={'text-center'}>{MijozHisobotiReducer.message}</h4>
                            </div> :
                        <Loading/>
                    }

                </div>
            </div>
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
