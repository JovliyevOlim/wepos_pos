import {useState, useEffect} from "react";
import {connect} from 'react-redux'
import {useTranslation} from "react-i18next";
import moment from "moment";
import 'moment/locale/uz-latn'

import users from "../../../../../reducer/users";
import XodimReducer, {getUserForFilteringBusiness, getUserForFiltering} from "../../Hodimlar/reducer/XodimReducer";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import MaxsulotxisobotReducer, {
    getProductHistoryByBusiness,
    getProductHistoryByBranch
} from "../reducer/MaxsulotxisobotReducer";
import Loading from "../../../../Loading";
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt, {SearchAnt} from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";

import './maxsulotxisoboti.css'

function MaxsulotXisoboti({
                              users,
                              getBarcodeAndName,
                              MaxsulotlarRoyxariReducer,
                              XodimReducer,
                              getUserForFilteringBusiness, getUserForFiltering,
                              MaxsulotxisobotReducer,
                              getProductHistoryByBusiness, getProductHistoryByBranch
                          }
) {

    const {t} = useTranslation()
    const [mainBranchId, setMainBranchId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [productId, setProductId] = useState(null)
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
            title: 'Mahsulot',
            dataIndex: 'productName',
            key: 'productName',
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
            title: t('ol.11'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>
        },
        {
            title: 'Miqdor',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (item, values) => <div>
                {
                    values.oldQuantity !== 0 && (
                        <del>{values.oldQuantity} {values.measurementName}</del>
                    )
                }
                <p>{item} {values.measurementName}</p>
            </div>
        },
        {
            title: 'Tavsif',
            dataIndex: 'description',
            key: 'description',
            width: '200px'
        },
    ];

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

    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };

    const handleLimitChange = (event, size) => {
        setPage(0)
        setSize(size);
    };

    function selectProduct(id, name) {
        setSearch(name)
        setProductId(id)
        setIsView(false)
    }

    useEffect(() => {
        setLoading(false)
        if (users.getInfoAdmin && !mainBranchId) {
            setProductId(null)
            getProductHistoryByBusiness({
                businessId: users.businessId,
                params: {
                    page, size,
                    userId, productId
                }
            })
        } else {
            getProductHistoryByBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    page, size,
                    userId, productId
                }
            })
        }
    }, [page, size, userId, productId, mainBranchId])

    useEffect(() => {
        setPage(0)
    }, [size, userId, productId])

    useEffect(() => {
        if (users.getUserAdmin && !mainBranchId) {
            getUserForFilteringBusiness(users.businessId)
        } else {
            getUserForFiltering(mainBranchId ? mainBranchId : users.branchId)
        }
    }, [mainBranchId])


    useEffect(() => {
            setLoading(true)
    }, [MaxsulotxisobotReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div>
            <div className="col-md-12 d-flex mb-4">
                <MainHeaderText text={'Mahsulotlar xisoboti'}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex row-gap-4 flex-wrap">
                    <div className="col-12 col-sm-6 col-lg-3 p-2">
                        <SelectAnt name={'Filiallar'} onChange={(e) => setMainBranchId(e === '' ? null : e)}
                                   permission={users.getInfoAdmin}
                                   selectList={users?.branches}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 p-2">
                        <SelectAnt name={'Xodimlar'} onChange={(e) => setUserId(e === '' ? null : e)}
                                   permission={users.getInfoAdmin}
                                   selectList={XodimReducer.usersFiltering?.map((item) => ({
                                       id: item.id,
                                       name: item.fio
                                   }))} permissions={true}
                        />
                    </div>
                    {
                        mainBranchId &&
                        <div className="col-lg-6 col-12 p-2">
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
                        MaxsulotxisobotReducer.productHistory?.list?.length > 0 ?
                            <div>
                                <div className="table-responsive">
                                    <CommonTable handlePageChange={handlePageChange} page={page} size={size}
                                                 pagination={true} data={MaxsulotxisobotReducer.productHistory?.list}
                                                 handleLimitChange={handleLimitChange} columns={columns}
                                                 total={MaxsulotxisobotReducer.productHistory?.totalItem}/>
                                </div>
                            </div> : <div>
                                <h4 className={'text-center'}>{MaxsulotxisobotReducer.message}</h4>
                            </div>
                    }
                </Loading>
            </CardBody>
        </div>
    )
}

export default connect((users, XodimReducer, MaxsulotlarRoyxariReducer, MaxsulotxisobotReducer),
    {
        getUserForFilteringBusiness, getUserForFiltering,
        getProductHistoryByBusiness, getProductHistoryByBranch,
        getBarcodeAndName
    })(MaxsulotXisoboti)
