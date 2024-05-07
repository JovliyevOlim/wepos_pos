import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useTranslation} from "react-i18next";
import {ModalHeader, Modal, ModalFooter, ModalBody} from "reactstrap";
import {toast} from "react-toastify";
import moment from "moment";
import 'moment/locale/uz-latn'

import users from "../../../../../reducer/users";
import QoldiqlarxisobotiReducer, {
    getWarehouseByBranch, getWarehouseByBusiness, resetWarehouse
} from '../reducer/QoldiqlarxisobotiReducer'
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import formatDate, {prettify} from "../../../../../util";
import Loading from "../../../../Loading";
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt, {ButtonAnt, SearchAnt} from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";

import './qoldiqlarXisoboti.css'

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

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: '2%',
        },
        {
            title: 'Mahsulotlar',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: t('ol.13'),
            dataIndex: 'branchName',
            key: 'branchName',
        },
        {
            title: 'Qolgan mahsulot',
            dataIndex: 'amount',
            key: 'amount',
            render: (item, values) => <p>{item} {values?.measurementName}</p>
        },
        {
            title: 'Sotilgan miqdor',
            dataIndex: 'soldQuantity',
            key: 'soldQuantity',
            render: (item, values) => <p>{item} {values?.measurementName}</p>
        },
        {
            title: 'Sotilgan summa',
            dataIndex: 'soldPrice',
            key: 'soldPrice',
            render: (item) => <p className={'m-0'}>{prettify(item, 3)} so'm</p>
        },
        {
            title: 'Foyda',
            dataIndex: 'profit',
            key: 'profit',
            render: (item) => <p className={'m-0'}>{prettify(item, 3)} so'm</p>
        },
        {
            title: 'Oxirgi sotilgan sana',
            dataIndex: 'lastSoldDate',
            key: 'lastSoldDate',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>
        },

    ];

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
    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };
    const handleLimitChange = (event, size) => {
        setPage(0)
        setLimit(size);
    };

    function selectProduct(id, name) {
        setSearch(name)
        setProductId(id)
        setIsView(false)
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
                params: {
                    search: e.target.value,
                    isPurchase: false,
                }
            })
        }

    }

    useEffect(() => {
        setLoading(false)
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
            setLoading(true)
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
        <div className="col-md-12 mb-3">
            <MainHeaderText text={'Mahsulotlar qoldig\'i'}/>
        </div>
        <CardBody>
            <div className="col-md-12 d-flex flex-wrap row-gap-2 justify-content-start">
                <div className="col-12 col-sm-6 col-lg-4 p-2">
                    <SelectAnt name={'Filiallar'} permission={users.getInfoAdmin} selectList={users.branches}
                               onChange={(e) => setMainBranchId(e === "" ? null : e)}/>
                </div>
                <div className="col-12 col-sm-6 col-lg-4 p-2">
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
                <div className="col-12 col-sm-6 col-lg-4 p-2">
                    <SelectAnt name={'Tartibi'} onChange={ChangeIncrease} permission={false} selectList={[
                        {id: 'false', name: 'Kamayish tartibida'},
                        {id: 'true', name: 'O\'sish tartibida'}
                    ]}/>
                </div>
                {
                    mainBranchId && <div className="col-12 p-0 position-relative z-3">
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
                                : null
                        }
                    </div>
                }
            </div>
        </CardBody>
        <CardBody>
            <Loading spinning={loading}>
                {
                    QoldiqlarxisobotiReducer.warehouse?.list?.length > 0 ?
                        <>
                            <div>
                                <div className={'d-flex justify-content-end'}>
                                    <h4 className={'report-text mb-3'}>Statiskani boshlangan
                                        sanasi: {formatDate(QoldiqlarxisobotiReducer?.warehouse?.reset)}</h4>
                                </div>
                                <div className={'d-flex justify-content-end'}>
                                    <h4 className={'report-text mx-2'}>Statiskani tozalash(Foyda,Sotilgan
                                        miqdor,Sotilgan summa)</h4>
                                    <ButtonAnt onClick={() => setResetActive(true)} text={'Tozalash'} type={'primary'}/>
                                </div>
                            </div>
                            <div className="table-responsive mt-4">
                                <CommonTable size={limit} page={page} pagination={true}
                                             data={QoldiqlarxisobotiReducer.warehouse?.list}
                                             handlePageChange={handlePageChange} handleLimitChange={handleLimitChange}
                                             columns={columns} total={QoldiqlarxisobotiReducer.warehouse?.totalItem}/>
                            </div>
                        </> : <div>
                            <h4 className={'text-center'}>{QoldiqlarxisobotiReducer.message}</h4>
                        </div>
                }
            </Loading>
        </CardBody>
        <Modal isOpen={resetActive} toggle={() => setResetActive(prevState => !prevState)}>
            <ModalHeader> Statistikani tozalash</ModalHeader>
            <ModalBody>
                <div className="col-md-12 col-sm-12">
                    <h6>{t('ProductList.10')}:</h6>
                    <select className={'form-control'} value={sendBranchId}
                            onChange={(e) => setSendBranch(e.target.value)} id="">
                        <option value="">Tanlang</option>
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
