import './xaridxisobot.css'
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import './xaridxisobot.css'
import users from "../../../../../reducer/users";
import TaminotReducer, {getAllSupplier} from "../../Hamkorlar/reducer/TaminotReducer";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import XaridlarXisobotiReducer, {
    getOneXaridXisobot, getPurchaseReportByBusiness, getPurchaseReportByBranch
} from "../reducer/XaridlarXisobotiReducer";
import Loading from "../../../../Loading";
import XodimReducer, {getUserForFiltering, getUserForFilteringBusiness} from "../../Hodimlar/reducer/XodimReducer";
import {IconButton, TablePagination} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt, {SearchAnt} from "../../../../Components/SelectAnt";

function XaridlarXisoboti({
                              users, XaridlarXisobotiReducer, TaminotReducer, getAllSupplier,
                              XodimReducer, getUserForFiltering, getUserForFilteringBusiness, MaxsulotlarRoyxariReducer,
                              getPurchaseReportByBusiness, getPurchaseReportByBranch, getBarcodeAndName
                          }) {
    const {t} = useTranslation()


    const [mainBranchId, setMainBranchId] = useState(null)
    const [supplierId, setSupplierId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [search, setSearch] = useState('')
    const [isView, setIsView] = useState(false)
    const [productId, setProductId] = useState(null)
    const [loading, setLoading] = useState(false)


    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setPage(0)
        setSize(parseInt(event.target.value));
    };

    function changeSearch(e) {
        setSearch(e.target.value)
        setIsView(true)
        if (e.target.value === '') {
            setProductId(null)
            setIsView(false)
        } else {
            getBarcodeAndName({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                name: e.target.value
            })
        }
    }

    function selectProduct(id, name) {
        setSearch(name)
        setProductId(id)
        setIsView(false)
    }


    useEffect(() => {
        setLoading(false)
        if (users.getInfoAdmin && !mainBranchId) {
            setProductId(null)
            getPurchaseReportByBusiness({
                businessId: users.businessId,
                params: {
                    page, size, supplierId, userId, productId
                }
            })
        } else {
            getPurchaseReportByBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    page, size, supplierId, userId, productId
                }
            })
        }
    }, [mainBranchId, page, size, supplierId, userId, productId])

    useEffect(() => {
        setPage(0)
    }, [mainBranchId, size, supplierId, userId])

    useEffect(() => {
        if (users.getUserAdmin && !mainBranchId) {
            getUserForFilteringBusiness(users.businessId)
        } else {
            getUserForFiltering(mainBranchId ? mainBranchId : users.branchId)
        }
    }, [mainBranchId])

    useEffect(() => {
        getAllSupplier(users.businessId)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 200)
    }, [XaridlarXisobotiReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    const [check, setCheck] = useState(false)

    function checktoggle(id) {
        setCheck(!check)
        if (!check) {
            getOneXaridXisobot(id)
        }
    }

    return (
        <div>
            <div className="col-md-12 d-flex justify-content-between align-items-center mb-5">
                <MainHeaderText text={'Xaridlar xisoboti'}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex align-items-end flex-wrap">
                    <div className="col-md-4">
                        <SelectAnt name={'Filiallar'} selectList={users.branches} permission={users.getInfoAdmin}
                                   onChange={(e) => setMainBranchId(e === "" ? null : e)}/>
                    </div>
                    <div className="col-md-4">
                        <SelectAnt name={'Ta\'minotchilar'} selectList={TaminotReducer.AllSupplier} permission={true}
                                   onChange={(e) => setSupplierId(e === "" ? null : e)}/>
                    </div>
                    <div className="col-md-4">
                        <SelectAnt name={'Hodimlar'} selectList={XodimReducer.usersFiltering?.map((item) => ({
                            id: item.id,
                            name: item.fio
                        }))} permission={true}
                                   onChange={(e) => setUserId(e === "" ? null : e)}/>
                    </div>
                    {
                        mainBranchId
                        && <div className="my-3 col-md-6">
                            <SearchAnt onChange={changeSearch} name={'Mahsulotni barcode yoki nomi orqali izlash'}/>
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

            <div className="rowStyleXH2">
                <div>
                    {loading ?
                        XaridlarXisobotiReducer.purchaseReport?.list?.length > 0 ?
                            <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                <table className='table table-hover table-primary table-striped table-bordered mt-4 '>
                                    <thead>
                                    <tr>
                                        <th>T/R</th>
                                        <th>Maxsulotlar</th>
                                        <th>Filial</th>
                                        <th>Xodim</th>
                                        <th>Diller</th>
                                        <th>Xarid sanasi</th>
                                        {/*<th>CHECK</th>*/}
                                        {/*<th>{t('Supplier.8')}</th>*/}
                                        {/*<th>{t('Buttons.11')}</th>*/}
                                        <th>Xarid miqdori</th>
                                        <th>Dona Narxi</th>
                                        <th>Jami Summa</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        XaridlarXisobotiReducer.purchaseReport?.list?.map((item, index) =>
                                            <tr key={item.id}>
                                                <td>{index + 1 + (page * size)}</td>
                                                <td>{item?.productName}</td>
                                                <td>{item?.branchName}</td>
                                                <td>{item?.userFio}</td>
                                                <td>{item?.supplierName}</td>
                                                <td>{moment(new Date(item?.createdAt)).format('LLLL')}</td>
                                                {/*<td><span onClick={() => checktoggle(item?.purchaseId)}*/}
                                                {/*          className={'sCh'}>CHECK</span></td>*/}
                                                {/*<td>{item.debt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>*/}
                                                <td>{item?.quantity} {item?.measurementName}</td>
                                                <td>{item?.salePrice} so'm</td>
                                                <td>{item?.totalSum} so'm</td>
                                            </tr>)
                                    }
                                    </tbody>
                                </table>
                                <TablePagination
                                    component="div"
                                    count={XaridlarXisobotiReducer.purchaseReport?.totalItem}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleLimitChange}
                                    page={page}
                                    rowsPerPageOptions={[5, 10, 15]}
                                    rowsPerPage={size}
                                />
                            </div> : <div>
                                <h4 className={'text-center'}>{XaridlarXisobotiReducer.message}</h4>
                            </div> :
                        <Loading/>
                    }


                    <Modal isOpen={check} toggle={checktoggle} size={'xl'}>
                        <ModalHeader>
                            Savdo ma'lumotlari
                        </ModalHeader>
                        <ModalBody>
                            <div className={'table-responsive'}>
                                <table className={'table table-striped table-primary table-hover border border-1'}>
                                    <thead>
                                    <tr>
                                        <th>T/R</th>
                                        <th>Diller</th>
                                        <th>Tel raqam</th>
                                        <th>Filial</th>
                                        <th>Sana</th>
                                        <th>Harid statusi</th>
                                        <th>To'lov holati</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        XaridlarXisobotiReducer.xaridOne ?
                                            XaridlarXisobotiReducer.xaridOne.map((item, index) =>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.supplier?.name}</td>
                                                    <td>{item.supplier?.phoneNumber}</td>
                                                    <td>{item.branch?.name}</td>
                                                    <td>{moment(new Date(item?.createdAt)).format('LLLL')}</td>
                                                    <td>{item?.purchaseStatus?.status}</td>
                                                    <td>{item?.paymentStatus?.status}</td>
                                                </tr>
                                            ) : ''
                                    }
                                    </tbody>
                                </table>

                            </div>

                            <div className={'table-responsive'}>
                                <table className={'table mt-2 border border-1 table-striped table-hover'}>
                                    <thead>
                                    <tr>
                                        <th>T/R</th>
                                        <th>Mahsulot</th>
                                        <th>Shtrix kod</th>
                                        {/*<th>Filial</th>*/}
                                        <th>Dona narxi</th>
                                        <th>Chegirma</th>
                                        <th>Sotish narxi</th>
                                        <th>Avans</th>
                                        <th>Qarz</th>
                                        <th>Jami</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        XaridlarXisobotiReducer.xaridTwo ?
                                            XaridlarXisobotiReducer.xaridTwo.map((item, index) => <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.product ? item.product?.name : item.productTypePrice?.name}</td>
                                                <td>{item.product ? item.product?.barcode : item.productTypePrice?.barcode}</td>
                                                <td>{item.buyPrice} so'm</td>
                                                <td>-</td>
                                                <td>{item.salePrice} so'm</td>
                                                <td>{item?.purchase.paidSum} so'm</td>
                                                <td>{item.purchase.debtSum} so'm</td>
                                                <td>{item?.purchase.totalSum} so'm</td>
                                            </tr>) : ''
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={checktoggle} className={'btn btn-outline-primary'}>Chiqish</button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default connect((XaridlarXisobotiReducer, users, TaminotReducer, MaxsulotlarRoyxariReducer, XodimReducer),
    {
        getPurchaseReportByBusiness, getPurchaseReportByBranch,
        getOneXaridXisobot,
        getAllSupplier,
        getUserForFiltering,
        getUserForFilteringBusiness,
        getBarcodeAndName
    })(XaridlarXisoboti)
