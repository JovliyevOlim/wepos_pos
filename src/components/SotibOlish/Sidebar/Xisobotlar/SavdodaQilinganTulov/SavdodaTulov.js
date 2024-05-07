import {useState, useEffect} from "react";
import {connect} from 'react-redux'
import {useTranslation} from "react-i18next";
import moment from "moment";
import 'moment/locale/uz-latn'

import users from "../../../../../reducer/users";
import SavdodagiTulovReducer, {getTradeReportByBranch, getTradeReportByBusiness} from '../reducer/SavdodagiTulovReducer'
import CustomerReducer, {
    getCustomersForTrade,
    getCustomersForTradeBusiness
} from "../../Hamkorlar/reducer/CustomerReducer";
import XodimReducer, {getUserForFilteringBusiness, getUserForFiltering} from "../../Hodimlar/reducer/XodimReducer";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import Loading from "../../../../Loading";
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt, {SearchAnt} from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";

import './savdoqilingantulov.css'

function SavdodaTulov({
                          users,
                          SavdodagiTulovReducer,
                          getBarcodeAndName,
                          MaxsulotlarRoyxariReducer,
                          CustomerReducer,
                          XodimReducer,
                          getCustomersForTrade, getCustomersForTradeBusiness,
                          getUserForFilteringBusiness, getUserForFiltering,
                          getTradeReportByBranch, getTradeReportByBusiness
                      }) {

    const {t} = useTranslation()
    const [mainBranchId, setMainBranchId] = useState(null)
    const [customerId, setCustomerId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [productId, setProductId] = useState(null)
    const [backing, setBacking] = useState(false)
    const [backingString, setBackingString] = useState('')
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [search, setSearch] = useState('')
    const [isView, setIsView] = useState(false)
    const [loading, setLoading] = useState(false)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: '2%',
        },
        {
            title: 'Chek',
            dataIndex: 'invoice',
            key: 'invoice',
            width: '100px'
        },
        {
            title: 'Mahsulot',
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
            title: 'Mijoz',
            dataIndex: 'customerName',
            key: 'customerName',
            width: '100px'
        },
        {
            title: t('ol.11'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>,
            width: '100px'
        },
        {
            title: 'Miqdor',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '100px',
        },
        {
            title: 'Qaytgan miqdor',
            dataIndex: 'backing',
            key: 'backing',
            width: '150px'
        },
        {
            title: 'Summa',
            dataIndex: 'totalSalePrice',
            key: 'totalSalePrice',
            width: '150px',
            render: (item) => <p className={'m-0'}>{item.toFixed(2)} so'm</p>
        },
        {
            title: 'Foyda',
            dataIndex: 'profit',
            key: 'profit',
            width: '150px',
            render: (item) => <p className={'m-0'}>{item.toFixed(2)} so'm</p>

        },
    ];


    function changeSearch(e) {
        setSearch(e.target.value)
        setIsView(true)
        if(e.target.value === ''){
            setProductId(null)
            setIsView(false)
        }
        else{
            getBarcodeAndName({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    search: e.target.value,
                    isPurchase: false,
                }
            })
        }
    }

    const handlePageChange = (newPage) => {
        setPage(newPage-1);
    };
    const handleLimitChange = (event,size) => {
        setPage(0)
        setSize(size);
    };

    function changeBacking(e) {
        if (e === "true") {
            setBackingString(e);
            setBacking(true)
        } else {
            setBacking(false)
            setBackingString(e);
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
            getTradeReportByBusiness({
                businessId: users.businessId,
                params: {
                    page, size, backing,
                    customerId,
                    userId, productId
                }
            })
        } else {
            getTradeReportByBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    page, size, backing,
                    customerId,
                    userId, productId
                }
            })
        }
    }, [page, size, backing, customerId, userId, productId, mainBranchId])

    useEffect(() => {
        setPage(0)
    }, [size, backing, customerId, userId, productId, mainBranchId])

    useEffect(() => {
        if (users.getUserAdmin && !mainBranchId) {
            getUserForFilteringBusiness(users.businessId)
        } else {
            getUserForFiltering(mainBranchId ? mainBranchId : users.branchId)
        }
        if (users.getCustomerAdmin && !mainBranchId) {
            getCustomersForTradeBusiness(users.businessId)
        } else {
            getCustomersForTrade(mainBranchId ? mainBranchId : users.branchId)
        }
    }, [mainBranchId])


    useEffect(() => {
            setLoading(true)
    }, [SavdodagiTulovReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div>
            <div className="col-md-12 d-flex mb-3">
               <MainHeaderText text={'Savdolar hisoboti'}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex row-gap-4 flex-wrap">
                    <div className="col-12 col-sm-6 col-lg-3 p-2">
                        <SelectAnt selectList={users?.branches} permission={users.getInfoAdmin} name={'Filiallar'} onChange={(e) => setMainBranchId(e === '' ? null : e)}/>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 p-2">
                        <SelectAnt selectList={CustomerReducer.customersTrade} permission={true}
                                   name={'Mijozlar'} onChange={(e) => setCustomerId(e === "" ? null : e)}/>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 p-2">
                        <SelectAnt selectList={XodimReducer.usersFiltering?.map((item) => ({
                            id: item.id,
                            name: item.fio
                        }))} permission={true}
                                   name={'Hodimlar'} onChange={(e) => setUserId(e === '' ? null : e)}/>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 p-2">
                        <SelectAnt selectList={[{id:'true',name:'Qaytarilgan'}]} permission={true}
                                   name={'Mahsulotlar'} onChange={changeBacking}/>
                    </div>
                    {
                        mainBranchId &&
                        <div className="col-md-6 position-relative z-3 p-0">
                            <SearchAnt onChange={changeSearch} name={'Mahsulotni qidirish'}/>
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
                            SavdodagiTulovReducer.tradeReports?.list?.length > 0 ?
                                <div className="table-responsive">
                                    <CommonTable size={size} page={page} total={SavdodagiTulovReducer.tradeReports?.totalItem}
                                                 handleLimitChange={handleLimitChange} columns={columns} data={SavdodagiTulovReducer.tradeReports?.list}
                                                 handlePageChange={handlePageChange} pagination={true}/>
                                </div>
                                : <div>
                                    <h4 className={'text-center'}>{SavdodagiTulovReducer.message}</h4>
                                </div>
                    }
                </Loading>
            </CardBody>
        </div>
    )
}

export default connect((users, SavdodagiTulovReducer, CustomerReducer, XodimReducer, MaxsulotlarRoyxariReducer),
    {
        getCustomersForTrade, getCustomersForTradeBusiness,
        getUserForFilteringBusiness, getUserForFiltering,
        getTradeReportByBranch, getTradeReportByBusiness, getBarcodeAndName
    })(SavdodaTulov)
