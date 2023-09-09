import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import './supplierReport.css'
import formatDate, {camelize} from "../../../../../util";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import {IconButton, TablePagination} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import XodimReducer, {getUserForFilteringBusiness, getUserForFiltering} from "../../Hodimlar/reducer/XodimReducer";
import TaminotReducer, {getAllSupplier} from "../../Hamkorlar/reducer/TaminotReducer";
import SupplierReportReducer, {
    getSupplierReportByBusiness, getSupplierReportByBranch
} from "../reducer/SupplierReportReducer";
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt from "../../../../Components/SelectAnt";

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
        setTimeout(() => {
            setLoading(true)
        }, 200)
    }, [SupplierReportReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
        getPay()
        getAllSupplier(users.businessId)
    }, [])


    return (
        <div>
            <div className="col-md-12 mb-5">
              <MainHeaderText text={'Ta\'minotchilar xisoboti'}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex flex-wrap">
                    <div className="col-md-3">
                        <SelectAnt permission={users.getInfoAdmin} name={'Filiallar'}
                                   onChange={(e) => setMainBranchId(e === "" ? null : e)}
                                   selectList={users.branches} />
                    </div>
                    <div className="col-md-3">
                        <SelectAnt permission={true} name={'Ta\'minotchilar'}
                                   onChange={(e) => setSupplierId(e === "" ? null : e)}
                                   selectList={TaminotReducer.AllSupplier} />
                    </div>
                    <div className="col-md-3">
                        <SelectAnt permission={true} name={"To'lov turlari"}
                                   onChange={(e) => setPaymentMethodId(e === "" ? null : e)}
                                   selectList={PayReducer.paymethod} />
                    </div>
                    <div className="col-md-3">
                        <SelectAnt permission={true} name={"Hodimlar"}
                                   onChange={(e) => setUserId(e === "" ? null : e)}
                                   selectList={XodimReducer.usersFiltering?.map((item) => ({
                                       id: item.id,
                                       name: item.fio
                                   }))} />
                    </div>
                </div>
            </CardBody>
            <div className="rowStyleXH2">
                <div>
                    {loading ?
                        SupplierReportReducer.supplierReport?.list?.length > 0 ?
                            <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                <table className='table table-hover table-primary table-striped table-bordered mt-4 '>
                                    <thead>
                                    <tr>
                                        <th>T/R</th>
                                        <th>Ta'minotchi</th>
                                        <th>Filial</th>
                                        <th>Xodim</th>
                                        <th>Summa</th>
                                        <th>Status</th>
                                        <th>Sana</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        SupplierReportReducer.supplierReport?.list?.map((item, index) =>
                                            <tr key={item.id}>
                                                <td>{index + 1 + (page * size)}</td>
                                                <td>{item?.supplierName}</td>
                                                <td>{item?.branchName}</td>
                                                <td>{item?.userFio}</td>
                                                <td>{item?.sum} so'm</td>
                                                <td>{camelize(item?.paymentMethodName)}</td>
                                                <td>{moment(new Date(item?.createdAt)).format('LLLL')}</td>
                                            </tr>)
                                    }
                                    </tbody>
                                </table>
                                <TablePagination
                                    component="div"
                                    count={SupplierReportReducer.supplierReport?.totalItem}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleLimitChange}
                                    page={page}
                                    rowsPerPageOptions={[5, 10, 15]}
                                    rowsPerPage={size}
                                />
                            </div> : <div>
                                <h4 className={'text-center'}>{SupplierReportReducer.message}</h4>
                            </div> :
                        <Loading/>
                    }

                </div>
            </div>
        </div>
    )
}

export default connect((users, PayReducer, XodimReducer, TaminotReducer,SupplierReportReducer),
    {
        getPay, getUserForFilteringBusiness, getUserForFiltering, getAllSupplier,
        getSupplierReportByBusiness, getSupplierReportByBranch
    })(SupplierReport)
