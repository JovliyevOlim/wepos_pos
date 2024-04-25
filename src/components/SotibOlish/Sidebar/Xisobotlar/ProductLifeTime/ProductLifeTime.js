import {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom"
import {connect} from 'react-redux'
import {useTranslation} from "react-i18next";
import axios from "axios";
import {FileExcelOutlined} from "@ant-design/icons";

import users from "../../../../../reducer/users";
import MaxsulotlarRoyxariReducer, {
    getProductTableLifeTime, getProductTableLifeTimeEndDate
} from '../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer'
import FirmaReducer, {getFirma} from "../../Maxsulotlar/reducer/FirmaReducer";
import BolimReducer, {getBolim} from "../../Maxsulotlar/reducer/BolimReducer";
import branchreducer, {getbranch} from "../../../../../reducer/branchreducer";
import {BaseUrl} from "../../../../../middleware"
import Loading from "../../../../Loading";
import MainHeaderText from "../../../../Components/MainHeaderText";
import SelectAnt from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";
import CardBody from "../../../../Components/CardBody";
import {prettify} from "../../../../../util";
import defaultProduct from "../../../../../img/image 3.jpg"
import moment from "moment";
import 'moment/locale/uz-latn'
import "./productLifeTime.css"

function ProductLifeTime({
                             getBolim,
                             getMeasurement,
                             BolimReducer,
                             users,
                             getFirma,
                             FirmaReducer,
                             MaxsulotlarRoyxariReducer,
                             getProductTableLifeTime,
                             getProductTableLifeTimeEndDate
                         }) {


    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [mainBranchId, setMainBranchId] = useState(null)
    const [productLifeBoolean, setProductLifeBoolean] = useState(false)
    const [brandId, setbranId] = useState(null)
    const [categoryId, setCategoryId] = useState(null)
    const [search, setSearch] = useState('')



    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: '5px',
        },
        {
            title: 'Mahsulot',
            width: '250px',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Xarid kuni',
            width: '250px',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>,
        },
        {
            title: 'Miqdori',
            width: '250px',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Muddati',
            width: '250px',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>,
        },
    ];

    useEffect(() => {
        getFirma(users.businessId)
        getBolim(users.businessId)
    }, [])

    useEffect(() => {
        setLoading(false)
        if (!productLifeBoolean) {
            getProductTableLifeTime(mainBranchId ? mainBranchId : users.branchId)
        } else {
            getProductTableLifeTimeEndDate(mainBranchId ? mainBranchId : users.branchId)
        }

    }, [productLifeBoolean, rowsPerPage, page, MaxsulotlarRoyxariReducer.current])


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
                <MainHeaderText text={t('Mahsulotlar muddati')}/>
            </div>
            <>
                <CardBody>
                    <div className="col-md-12 d-flex align-items-end row-gap-4 flex-wrap">
                        <div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-3">
                            <SelectAnt name={t('as.98')} onChange={(e) => {
                                setPage(0)
                                setMainBranchId(e === "" ? null : e)
                            }}
                                       permission={false}
                                       selectList={users.branches}
                            />
                        </div>
                        <div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-3">
                            <SelectAnt name={'Muddati bo\'yicha'} onChange={(e) => {
                                setPage(0)
                                setProductLifeBoolean(e)
                            }}
                                       permission={false}
                                       selectList={[
                                           {id: false, name: 'Muddati yaqinlashgan'},
                                           {id: true, name: 'Muddati o\'tgan'},
                                       ]}
                            />
                        </div>
                        {/*<div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-3">*/}
                        {/*    <SelectAnt name={t('as.99')} onChange={(e) => {*/}
                        {/*        setPage(0)*/}
                        {/*        setbranId(e === "" ? null : e)*/}
                        {/*    }}*/}
                        {/*               permission={true}*/}
                        {/*               selectList={FirmaReducer.firmalar}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-3">*/}
                        {/*    <SelectAnt name={t('as.100')} onChange={(e) => {*/}
                        {/*        setPage(0)*/}
                        {/*        setCategoryId(e === "" ? null : e)*/}
                        {/*    }}*/}
                        {/*               permission={true}*/}
                        {/*               selectList={BolimReducer.bolimlar}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-3">*/}
                        {/*    <SelectAnt name={t('as.101')} onChange={(e) => {*/}
                        {/*        setPage(0)*/}
                        {/*        setMeasurementId(e === "" ? null : e)*/}
                        {/*    }}*/}
                        {/*               permission={true}*/}
                        {/*               selectList={MeasurementReducer.measurements}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-6">*/}
                        {/*    <SearchAnt onChange={(e) => setSearch(e.target.value)}*/}
                        {/*               name={t('as.102')}/>*/}
                        {/*</div>*/}
                        {/*<div className="col-12 col-sm-6 p-sm-2 col-md-6 col-lg-3">*/}
                        {/*    <ButtonAnt type={'primary'} onClick={getFilesById} bgColor={'green'}*/}
                        {/*               icon={<FileExcelOutlined/>} text={t('button.getExcel')}/>*/}
                        {/*</div>*/}
                    </div>
                </CardBody>
            </>
            {
                users.getProductAdmin || users.getProduct ?
                    <CardBody>
                        <Loading spinning={loading}>
                            {
                                MaxsulotlarRoyxariReducer.productLifeTime?.list?.length > 0 ?
                                    <>
                                        <CommonTable
                                            size={rowsPerPage}
                                            page={page}
                                            total={MaxsulotlarRoyxariReducer?.productLifeTime?.totalItem}
                                            handlePageChange={handleChangePage}
                                            handleLimitChange={handleChangeRowsPerPage}
                                            data={MaxsulotlarRoyxariReducer.productLifeTime?.list}
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
        </div>
    )
}

export default connect((MaxsulotlarRoyxariReducer, users, FirmaReducer, BolimReducer, branchreducer), {
    getBolim,
    getbranch,
    getFirma,
    getProductTableLifeTime,
    getProductTableLifeTimeEndDate
})(ProductLifeTime)
