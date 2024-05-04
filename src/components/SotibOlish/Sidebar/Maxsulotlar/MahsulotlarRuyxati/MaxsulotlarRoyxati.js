import {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom"
import {connect} from 'react-redux'
import {useTranslation} from "react-i18next";
import axios from "axios";
import {FileExcelOutlined} from "@ant-design/icons";
import {Button, Tag} from "antd";

import users from "../../../../../reducer/users";
import MaxsulotlarRoyxariReducer, {
    deleteMaxsulotRuyxati,
    getMaxsulotById, deleteMaxsulotRuyxatiByIds,
    getProductTableSearch, getProductTableSearchBranch
} from '../reducer/MaxsulotlarRoyxariReducer'
import FirmaReducer, {getFirma} from "../reducer/FirmaReducer";
import BolimReducer, {getBolim} from "../reducer/BolimReducer";
import branchreducer, {getbranch} from "../../../../../reducer/branchreducer";
import MeasurementReducer, {getMeasurement} from "../../../../../reducer/MeasurementReducer";
import {BaseUrl} from "../../../../../middleware";
import KorishM from "./Taxrirlash/Korish";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";
import MainHeaderText from "../../../../Components/MainHeaderText";
import SelectAnt, {ButtonAnt, SearchAnt} from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";
import {AddButton, DeleteButton, EditButton, ViewButton} from "../../../../Components/Buttons";
import CardBody from "../../../../Components/CardBody";
import {prettify} from "../../../../../util";
import storeProduct from "../../../../../img/storeProduct.svg"
import cartProduct from "../../../../../img/cartProduct.svg"
import moneyBagProduct from "../../../../../img/money bag coinProduct.svg"
import percentProduct from "../../../../../img/invoice.svg"
import defaultProduct from "../../../../../img/image 3.jpg"

import "./maxsulotlarRoyxati.css"

function MaxsulotlarRoyxati({
                                getBolim,
                                getMeasurement,
                                MeasurementReducer,
                                BolimReducer,
                                users,
                                getFirma,
                                FirmaReducer,
                                MaxsulotlarRoyxariReducer,
                                deleteMaxsulotRuyxati,
                                deleteMaxsulotRuyxatiByIds,
                                getProductTableSearch,
                                getProductTableSearchBranch,
                            }) {


    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState('')
    const [active, setActive] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState(null);
    const [ascend, setAscend] = useState(false)
    const [mainBranchId, setMainBranchId] = useState(null)
    const [brandId, setbranId] = useState(null)
    const [categoryId, setCategoryId] = useState(null)
    const [measurementId, setMeasurementId] = useState(null)
    const [search, setSearch] = useState('')
    const [saveModal, setSaveModal] = useState(false)
    const history = useHistory()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: '5px',
        },
        {
            title: 'Maxsulotlar',
            width: '250px',
            dataIndex: 'name',
            key: 'name',
            render: (item, values) =>
                <div className={'d-flex gap-3 align-items-center'}>
                    <div className={'productList-Card'}>
                        <img className={'w-100'}
                             src={values.photoId ? `${BaseUrl}/attachment/download/${values.photoId}` : defaultProduct}
                             alt=""/>
                    </div>
                    <div className={'d-flex gap-2  justify-content-center align-items-start flex-column'}>
                        <p className={'productList-Name'}>{item}</p>
                        <p className={'productList-Quantity'}>Miqdori: <small
                            style={
                                values.amount > values.minQuantity ? {backgroundColor: '#EEF0FF', color: '#377DFF'} :
                                    values.amount >= values.minQuantity ? {
                                            backgroundColor: '#fff6e8',
                                            color: '#ffb736'
                                        } :
                                        {backgroundColor: '#ffe8ec', color: '#ff1943'}
                            }
                            className={'productList-Amount'}>{values.amount} {values.measurementName}</small>
                        </p>
                    </div>
                </div>,
        },
        {
            title: 'Filial',
            dataIndex: 'branches',
            key: 'branches',
            width: 50,
            render: (item) => <div>
                {
                    item.map(name =>
                        <p>{name}</p>
                    )}
            </div>
        },
        {
            title: 'Info',
            dataIndex: 'info',
            key: 'info',
            width: '100px',
            render: (item, values) => <div>
                <p className={'m-1'}>{values.barcode}</p>
                <p className={'m-1'}>{values.code}</p>
                <p className={'m-1'}>{values.many ? (t('as.63')) : (t('as.62'))}</p>
                <p className={'m-1'}>{values.brandName} {values.categoryName && `,${values.categoryName}`}</p>
            </div>
        },
        {
            title: 'Sotib olish',
            dataIndex: 'buyPrice',
            key: 'buyPrice',
            width: '100px',
            sorter: true,
            render: (item) => <p>{item} so'm</p>,
        },
        {
            title: 'Sotish',
            dataIndex: 'salePrice',
            key: 'salePrice',
            render: (item) => <p>{item} so'm</p>,
            sorter: true,
            width: '80px'
        },
        {
            title: 'Optom',
            dataIndex: 'grossPrice',
            key: 'grossPrice',
            render: (item) => <p>{item} so'm</p>,
            sorter: true,
            width: '80px'
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-center gap-3'}>

                {
                    users.getProduct && <ViewButton onClick={() => {korishsh(item?.id)}} size="big" />
                }
                {
                    users.editProduct && <EditButton
                        onClick={() => {history.push('/main/addProduct/' + values.id)}}
                        size="big"
                    />
                }
                {
                    users.deleteProduct && <DeleteButton onClick={() => {deleteProductById(values.id)}} size="big" />
                }
            </div>,
        },
    ];

    useEffect(() => {
        getFirma(users.businessId)
        getBolim(users.businessId)
        getMeasurement(users.businessId)
    }, [])

    useEffect(() => {
        setLoading(false)
        if (users.getProductAdmin && !mainBranchId) {
            getProductTableSearch({
                businessId: users.businessId,
                params: {
                    brandId,
                    categoryId,
                    measurementId,
                    page,
                    size: rowsPerPage,
                    search,
                    filter, ascend
                }
            })
        } else if (users.getProduct) {
            getProductTableSearchBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    brandId,
                    categoryId,
                    measurementId,
                    page,
                    size: rowsPerPage,
                    search,
                    filter, ascend
                }
            })
        }

    }, [brandId, mainBranchId, categoryId, search, rowsPerPage, page, measurementId, MaxsulotlarRoyxariReducer.current, filter, ascend])

    function tableFilter(pagination, filter, sorter) {
        console.log(sorter)
        if (sorter.order) {
            setFilter(sorter.columnKey)
            setAscend(sorter.order === 'ascend' ? true : false)
        } else {
            setFilter(null)
            setAscend(false)

        }
    }

    const [productId, setProductId] = useState(null)

    function korishsh(id) {
        setProductId(id)
        toggle()
    }

    function toggle() {
        setActive(!active)
    }

    function deleteFunc() {
        deleteMaxsulotRuyxati(deleteID)
        setSaveModal(true)
    }

    function deleteProductById(item) {
        setdeletemodal(true)
        setdeletID(item)
    }

    useEffect(() => {
        setLoading(true)
    }, [MaxsulotlarRoyxariReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    const handleChangePage = (newPage) => {
        setPage(newPage - 1);
    };

    const handleChangeRowsPerPage = (event, size) => {
        setPage(0);
        setRowsPerPage(size);
    };

    const togglePush = () => {
        history.push('/main/addProduct')
    }

    useEffect(() => {
        if (MaxsulotlarRoyxariReducer.saveBoolean) {
            setSelectedRowKeys([])
            setdeletemodal(false)
            setdeletID(null)
            setLoading(true)
        }
        setTimeout(() => {
            setSaveModal(false)
        }, 200)
    }, [MaxsulotlarRoyxariReducer.current])

    function getFilesById() {
        axios.get(`${BaseUrl}/excel/${mainBranchId ? mainBranchId : users.businessId}`, {
            method: 'GET',
            responseType: 'blob',
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('tokenname') || sessionStorage.getItem('tokenname')}`
            },
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Products of ${
                users.branches.some(item => item.id === mainBranchId) ? users.branches.find(item => item.id === mainBranchId).name : 'business'}.xlsx`);
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <div>
            <div className="d-flex col-md-12 align-items-center mb-5 justify-content-between">
                <MainHeaderText text={t('sidebar.product')}/>
                {
                    users.addProduct ? <AddButton onClick={togglePush} text={t('button.add')} /> : null
                }
            </div>
            <>
                {
                    MaxsulotlarRoyxariReducer.productTableSearch?.profitDto &&
                    <CardBody>
                        <div className="col-md-12 gap-2 gap-sm-0 d-flex flex-wrap align-items-center flex-wrap">
                            <div className="col-12 col-sm-6 p-sm-2 col-md-12 col-lg-6 col-xl-3">
                                <Tag className={'productStatistic'} color={'none'}>
                                    <div className={'d-flex align-items-center gap-1 mb-3'}>
                                        <img src={storeProduct} alt="store"/>
                                        <p className={'p-0 m-2'}>{t('as.104')}</p>
                                    </div>
                                    <h5 style={{color: '#377DFF'}}>{prettify(MaxsulotlarRoyxariReducer.productTableSearch?.profitDto?.buyPrice)} {t('as.21')}</h5>
                                </Tag>
                            </div>
                            <div className="col-12 col-sm-6 p-sm-2 col-md-12 col-lg-6 col-xl-3">
                                <Tag className={'productStatistic'} color="none">
                                    <div className={'d-flex align-items-center gap-1 mb-3'}>
                                        <img src={cartProduct} alt="cart"/>
                                        <p className={'p-0 m-2'}>{t('as.105')}</p>
                                    </div>
                                    <h5 style={{color: '#8962F8'}}>{prettify(MaxsulotlarRoyxariReducer.productTableSearch?.profitDto?.salePrice)} {t('as.21')}</h5>
                                </Tag>
                            </div>
                            <div className="col-12 col-sm-6 p-sm-2 col-md-12 col-lg-6 col-xl-3">
                                <Tag className={'productStatistic'} color="none">
                                    <div className={'d-flex align-items-center gap-1 mb-3'}>
                                        <img src={moneyBagProduct} alt="money"/>
                                        <p className={'p-0 m-2'}>{t('as.106')}</p>
                                    </div>
                                    <h5 style={{color: '#38CB89'}}>{prettify(MaxsulotlarRoyxariReducer.productTableSearch?.profitDto?.salePrice - MaxsulotlarRoyxariReducer.productTableSearch?.profitDto?.buyPrice)} {t('as.21')}</h5>
                                </Tag>
                            </div>
                            <div className="col-12 col-sm-6 p-sm-2 col-md-12 col-lg-6 col-xl-3">
                                <Tag className={'productStatistic'} color="none">
                                    <div className={'d-flex align-items-center gap-1 mb-3'}>
                                        <img src={percentProduct} alt="percentProduct"/>
                                        <p className={'p-0 m-2'}>{t('as.107')}</p>
                                    </div>
                                    <h5 style={{color: '#EF8234'}}>
                                        {prettify(((parseFloat(MaxsulotlarRoyxariReducer.productTableSearch?.profitDto?.salePrice / MaxsulotlarRoyxariReducer.productTableSearch?.profitDto?.buyPrice) - 1) * 100).toFixed(2))} %
                                    </h5>
                                </Tag>
                            </div>
                        </div>
                    </CardBody>
                }
                <CardBody>
                    <div className="col-md-12 d-flex align-items-end row-gap-4 flex-wrap">
                        <div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-3">
                            <SelectAnt name={t('as.98')} onChange={(e) => {
                                setPage(0)
                                setMainBranchId(e === "" ? null : e)
                            }}
                                       permission={users.getProductAdmin}
                                       selectList={users.branches}
                            />
                        </div>
                        <div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-3">
                            <SelectAnt name={t('as.99')} onChange={(e) => {
                                setPage(0)
                                setbranId(e === "" ? null : e)
                            }}
                                       permission={true}
                                       selectList={FirmaReducer.firmalar}
                            />
                        </div>
                        <div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-3">
                            <SelectAnt name={t('as.100')} onChange={(e) => {
                                setPage(0)
                                setCategoryId(e === "" ? null : e)
                            }}
                                       permission={true}
                                       selectList={BolimReducer.bolimlar}
                            />
                        </div>
                        <div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-3">
                            <SelectAnt name={t('as.101')} onChange={(e) => {
                                setPage(0)
                                setMeasurementId(e === "" ? null : e)
                            }}
                                       permission={true}
                                       selectList={MeasurementReducer.measurements}
                            />
                        </div>
                        <div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-6">
                            <SearchAnt onChange={(e) => setSearch(e.target.value)}
                                       name={t('as.102')}/>
                        </div>
                        <div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-3">
                            <ButtonAnt type={'primary'} onClick={getFilesById} bgColor={'green'}
                                       icon={<FileExcelOutlined/>} text={t('button.getExcel')}/>
                        </div>
                    </div>
                </CardBody>

            </>
            {
                users.getProductAdmin || users.getProduct ?
                    <CardBody>
                        <Loading spinning={loading}>
                            {
                                MaxsulotlarRoyxariReducer.productTableSearch?.list?.length > 0 ?
                                    <>
                                        <div
                                            style={{
                                                marginBottom: 16,
                                            }}
                                        >
                                            <Button type="primary" danger onClick={() => {
                                                deleteMaxsulotRuyxatiByIds(selectedRowKeys)
                                                setSaveModal(true)
                                            }} disabled={!hasSelected}>
                                                {t('as.115')}
                                            </Button>
                                            <span
                                                style={{
                                                    marginLeft: 8,
                                                }}
                                            >
                                        {hasSelected ? `${selectedRowKeys.length} ta tanlandi` : ''}
                                            </span>
                                        </div>
                                        <CommonTable
                                            size={rowsPerPage}
                                            page={page}
                                            onchange={tableFilter}
                                            rowSelection={rowSelection}
                                            total={MaxsulotlarRoyxariReducer?.productTableSearch?.totalItem}
                                            handlePageChange={handleChangePage}
                                            handleLimitChange={handleChangeRowsPerPage}
                                            data={MaxsulotlarRoyxariReducer.productTableSearch?.list}
                                            pagination={true}
                                            columns={columns}
                                        />
                                    </>
                                    : <div>
                                        <h4 className={'fw-bold text-center'}>{MaxsulotlarRoyxariReducer?.message}</h4>
                                    </div>
                            }
                        </Loading>
                    </CardBody> : null
            }
            {
                active ?
                    <KorishM active={active} toggle={toggle} id={mainBranchId}
                             productId={productId}/> : ''
            }
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deletemodal={deletemodal} deleteModaltoggle={() => setdeletemodal(prevState => !prevState)}
                        deleteFunc={deleteFunc}/>
        </div>
    )
}

export default connect((MaxsulotlarRoyxariReducer, users, FirmaReducer, BolimReducer, branchreducer, MeasurementReducer), {
    getBolim,
    getMeasurement,
    getbranch,
    getFirma,
    deleteMaxsulotRuyxati,
    getMaxsulotById,
    deleteMaxsulotRuyxatiByIds,
    getProductTableSearch,
    getProductTableSearchBranch,
})(MaxsulotlarRoyxati)
