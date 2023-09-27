import './xaridxisobot.css'
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
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
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt, {ButtonAnt, SearchAnt} from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";

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
            width: '200px'
        },
        {
            title: t('ol.13'),
            dataIndex: 'branchName',
            key: 'branchName',
            width: '100px'
        },
        {
            title: 'Xodim',
            dataIndex: 'userFio',
            key: 'userFio',
            width: '150px'

        },
        {
            title: 'Ta\'minotchi',
            dataIndex: 'supplierName',
            key: 'supplierName',
            width: '150px'
        },
        {
            title: 'Sana',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>,
            width: '100px'
        },
        {
            title: 'Xarid miqdori',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (item,values) => <p className={'m-0'}>{item} {values.measurementName}</p>,
            width: '120px'
        },
        {
            title: 'Dona narxi',
            dataIndex: 'salePrice',
            key: 'salePrice',
            width: '100px',
            render: (item,values) => <p className={'m-0'}>{item} so'm</p>
        },
        {
            title: 'Jami summa',
            dataIndex: 'totalSum',
            key: 'totalSum',
            width: '100px',
            render: (item,values) => <p className={'m-0'}>{item} so'm</p>
        }
    ];


    const handlePageChange = (newPage) => {
        setPage(newPage-1);
    };
    const handleLimitChange = (event,size) => {
        setPage(0)
        setSize(size);
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
                    <div className="col-md-4 p-2">
                        <SelectAnt name={'Filiallar'} selectList={users.branches} permission={users.getInfoAdmin}
                                   onChange={(e) => setMainBranchId(e === "" ? null : e)}/>
                    </div>
                    <div className="col-md-4 p-2">
                        <SelectAnt name={'Ta\'minotchilar'} selectList={TaminotReducer.AllSupplier} permission={true}
                                   onChange={(e) => setSupplierId(e === "" ? null : e)}/>
                    </div>
                    <div className="col-md-4 p-2">
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

            <CardBody>
                    {loading ?
                        XaridlarXisobotiReducer.purchaseReport?.list?.length > 0 ?
                            <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                <CommonTable size={size} page={page} columns={columns} data={XaridlarXisobotiReducer.purchaseReport?.list}
                                             pagination={true} handleLimitChange={handleLimitChange} handlePageChange={handlePageChange}
                                             total={XaridlarXisobotiReducer.purchaseReport?.totalItem}/>
                            </div> : <div>
                                <h4 className={'text-center'}>{XaridlarXisobotiReducer.message}</h4>
                            </div> :
                        <Loading/>
                    }
            </CardBody>

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
