import {Link} from 'react-router-dom'
import './qoldiqlarXisoboti.css'
import {connect} from 'react-redux'
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from 'react'
import QoldiqlarxisobotiReducer, {
    getWarehouseByBranch, getWarehouseByBusiness, resetWarehouse
} from '../reducer/QoldiqlarxisobotiReducer'
import users from "../../../../../reducer/users";
import {IconButton, TablePagination} from "@mui/material";
import formatDate from "../../../../../util";
import Loading from "../../../../Loading";
import {ModalHeader, Modal, ModalFooter, ModalBody} from "reactstrap";
import {toast} from "react-toastify";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Svg/MainHeaderText";
import CardBody from "../../../../Svg/CardBody";
import SelectAnt, {SearchAnt} from "../../../../Svg/SelectAnt";

function QoldiqlarXisoboti({
                               users,
                               QoldiqlarxisobotiReducer,
                               MaxsulotlarRoyxariReducer,
                               getBarcodeAndName,
                               getWarehouseByBranch,
                               getWarehouseByBusiness,
                               resetWarehouse
                           }) {


    const {t} = useTranslation()
    const [mainBranchId, setMainBranchId] = useState(null)
    const [field, setField] = useState("price")
    const [increase, setIncrease] = useState(false)
    const [loading, setLoading] = useState(false)
    const [productId, setProductId] = useState(null)
    const [resetActive, setResetActive] = useState(false)
    const [sendBranchId, setSendBranch] = useState(null)

    function ChangeIncrease(e) {
        if (e === 'true') {
            setIncrease(true)
        } else {
            setIncrease(false)
        }
    }

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState('')
    const [isView, setIsView] = useState(false)
    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setPage(0)
        setLimit(parseInt(event.target.value));
    };

    function selectProduct(id, name) {
        setSearch(name)
        setProductId(id)
        setIsView(false)
    }

    function removeProduct() {
        setSearch('')
        setProductId(null)
    }

    function changeSearch(e) {
        setSearch(e.target.value)
        setIsView(true)
        if (e.target.value === '') {
            setIsView(false)
            setProductId(null)
        } else {
            getBarcodeAndName({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                name: e.target.value
            })
        }

    }

    useEffect(() => {
        if (users.getInfoAdmin && !mainBranchId) {
            setProductId(null)
            getWarehouseByBusiness({
                businessId: users.businessId, params: {
                    page, size: limit, field, increase, productId
                }
            })
        } else {
            getWarehouseByBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId, params: {
                    page, size: limit, field, increase, productId
                }
            })
        }
        setLoading(false)
    }, [page, limit, field, increase, productId, mainBranchId, QoldiqlarxisobotiReducer.current])

    useEffect(() => {
        setPage(0)
    }, [limit, field, increase, productId, mainBranchId, QoldiqlarxisobotiReducer.current])

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 200)
    }, [QoldiqlarxisobotiReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    useEffect(() => {
        if (QoldiqlarxisobotiReducer.saveBoolean) {
            setResetActive(false)
            setLoading(false)
        }
    }, [QoldiqlarxisobotiReducer.current])


    return (<div>
        <div className="col-md-12 mb-4">
            <MainHeaderText text={'Mahsulotlar qoldig\'i'}/>
        </div>
        <CardBody>
            <div className="col-md-12 d-flex flex-wrap row-gap-4 justify-content-start ">
                <div className="col-md-3 col-sm-12">
                    <SelectAnt name={'Filiallar'} permission={users.getInfoAdmin} selectList={users.branches}
                               onChange={(e) => setMainBranchId(e === "" ? null : e)}/>
                </div>
                <div className="col-md-3 col-sm-12">
                    <SelectAnt name={'Ma\'lumot'} permission={false}
                               selectList={[
                                   {id: 'price', name: 'Narx'},
                                   {id: "quantity", name: 'Sotilgan miqdor'},
                                   {id: "amount", name: 'Qolgan miqdor'},
                                   {id: "profit", name: 'Foyda'},
                                   {id: 'date', name: 'Oxirgi sotilgan sana'},
                               ]}
                               onChange={(e) => setField(e)}/>
                </div>
                <div className="col-md-3 col-sm-12">
                    <SelectAnt name={'Tartibi'} onChange={ChangeIncrease} permission={false} selectList={[
                        {id: 'false', name: 'Kamayish tartibida'},
                        {id: 'true', name: 'O\'sish tartibida'}
                    ]}/>
                </div>
                {
                    mainBranchId && <div className="col-md-6">
                        <SearchAnt name={'Mahsulotni qidirish'} onChange={changeSearch}/>
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


        {loading ? QoldiqlarxisobotiReducer.warehouse?.list?.length > 0 ? <div>
            <div className="styleContener">
                <div>
                    <div className={'d-flex justify-content-end'}>
                        <h4>Statiskani boshlangan
                            sanasi: {formatDate(QoldiqlarxisobotiReducer?.warehouse?.reset)}</h4>
                    </div>
                    <div className={'d-flex justify-content-end'}>
                        <h4>Statiskani tozalash(Foyda,Sotilgan miqdor,Sotilgan summa)</h4>
                        <button onClick={() => setResetActive(true)}
                                className={'btn btn-info mx-2'}>Tozalash
                        </button>
                    </div>
                </div>
                <div className="table-responsive mb-4">
                    <table className='table table-hover table-primary table-striped table-bordered mt-4 '>
                        <thead>
                        <tr>
                            <th>T/R</th>
                            <th>Maxsulot</th>
                            <th>Baza</th>
                            <th>Qolgan maxsulot</th>
                            <th>Sotilgan Miqdor</th>
                            <th>Sotilgan Summa</th>
                            <th>Foyda</th>
                            <th>Oxirgi sotilgan sana</th>
                        </tr>
                        </thead>
                        <tbody>
                        {QoldiqlarxisobotiReducer.warehouse?.list?.map((item, index) => <tr
                            key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.productName}</td>
                            <td>{item?.branchName}</td>
                            <td>{item?.amount} {item?.measurementName}</td>
                            <td>{item?.soldQuantity} {item?.measurementName}</td>
                            <td>{item?.soldPrice} so'm</td>
                            <td>{item?.profit} so'm</td>
                            <td>{moment(new Date(item?.lastSoldDate)).format('LLLL')}</td>
                        </tr>)}
                        </tbody>
                    </table>
                </div>
                <TablePagination
                    component="div"
                    count={QoldiqlarxisobotiReducer.warehouse?.totalItem}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPageOptions={[5, 10, 15]}
                    rowsPerPage={limit}
                />
            </div>
        </div> : <div>
            <h4 className={'text-center'}>{QoldiqlarxisobotiReducer.message}</h4>
        </div> : <Loading/>}


        <Modal isOpen={resetActive} toggle={() => setResetActive(prevState => !prevState)}>
            <ModalHeader> Statistikani tozalash</ModalHeader>
            <ModalBody>
                <div className="col-md-12 col-sm-12">
                    <h6>{t('ProductList.10')}:</h6>
                    <select className={'form-control'} value={sendBranchId}
                            onChange={(e) => setSendBranch(e.target.value)} id="">
                        <option value="">Tanlang</option>

                        }
                        {users.branches.map((item, index) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
            </ModalBody>
            <ModalFooter>
                <button onClick={() => setResetActive(prevState => !prevState)} className={'btn btn-danger'}>Chiqish
                </button>
                <button onClick={() => {
                    sendBranchId ? resetWarehouse(sendBranchId) : toast.warning('Filial Tanlang')
                }} className={'btn btn-success'}>Saqlash
                </button>
            </ModalFooter>
        </Modal>
    </div>)
}

export default connect((QoldiqlarxisobotiReducer, users, MaxsulotlarRoyxariReducer), {
    getWarehouseByBranch, getWarehouseByBusiness, resetWarehouse, getBarcodeAndName
})(QoldiqlarXisoboti)
