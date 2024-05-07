import {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import moment from "moment";
import 'moment/locale/uz-latn'

import users from "../../../../../reducer/users";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import XodimReducer, {getUserForFiltering, getUserForFilteringBusiness} from "../../Hodimlar/reducer/XodimReducer";
import MaxsulotxisobotReducer,{getLossProductByBusiness,getLossProductByBranch} from "../reducer/MaxsulotxisobotReducer";
import Loading from "../../../../Loading";
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt, {SearchAnt} from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";
import {prettify} from "../../../../../util";

function MaxsulotMiqdoriQoldigi({
                                    users, XodimReducer, getUserForFiltering, getUserForFilteringBusiness,
                                    MaxsulotxisobotReducer,getLossProductByBusiness,getLossProductByBranch,
                                    MaxsulotlarRoyxariReducer, getBarcodeAndName
                                }) {
    const {t} = useTranslation();
    const [mainBranchId, setMainBranchId] = useState(null)
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
            key: 'productName'
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
            title: 'Miqdori',
            dataIndex: 'quantity',
            key: 'quantity',
            render:(item,values)=><p>{item} {values.measurementName}</p>
        },
        {
            title: 'Zarar summasi',
            dataIndex: 'price',
            key: 'price',
            render: (item) => <p className={'m-0'}>{prettify(item,3)} so'm</p>
        },
        {
            title: t('ol.11'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>
        },
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
        if (e.target.value===''){
            setIsView(false)
            setProductId(null)
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

    function selectProduct(id, name) {
        setSearch(name)
        setProductId(id)
        setIsView(false)
    }

    useEffect(() => {
        setLoading(false)
        if (users.getInfoAdmin && !mainBranchId) {
            setProductId(null)
            getLossProductByBusiness({
                businessId: users.businessId,
                params: {
                    page, size,  userId, productId
                }
            })
        } else {
            getLossProductByBranch({
                branchId: mainBranchId ? mainBranchId: users.branchId,
                params: {
                    page, size, userId, productId
                }
            })
        }
    }, [mainBranchId, page, size,  userId, productId])

    useEffect(() => {
        setPage(0)
    }, [mainBranchId, size, userId])

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
            <div className="col-md-12 mb-3">
                <MainHeaderText text={'Yo\'qotilgan maxsulotlar'}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex justify-content-start flex-wrap">
                    <div className="col-12 col-sm-6 col-lg-3 p-2">
                        <SelectAnt name={'Filiallar'} selectList={users.branches} permission={users.branches} onChange={(e) => setMainBranchId(e === "" ? null : e)}/>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 p-2">
                        <SelectAnt name={'Hodimlar'} selectList={XodimReducer.usersFiltering?.map((item) => ({
                            id: item.id,
                            name: item.fio
                        }))} permission={true}
                                   onChange={(e) => setUserId(e === "" ? null : e)}/>
                    </div>
                    {
                        mainBranchId &&
                        <div className="col-12 col-lg-6 p-2 px-0 ps-1 position-relative z-3">
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
            <CardBody>
                <Loading spinning={loading}>
                    {
                       MaxsulotxisobotReducer.lossProducts?.list?.length > 0 ?
                            <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                <CommonTable size={size} page={page} total={MaxsulotxisobotReducer.lossProducts?.totalItem}
                                             columns={columns} handleLimitChange={handleLimitChange} handlePageChange={handlePageChange}
                                             data={MaxsulotxisobotReducer.lossProducts?.list} pagination={true}/>
                            </div> : <div>
                                <h4 className={'text-center'}>{MaxsulotxisobotReducer.message}</h4>
                            </div>
                    }
                </Loading>
            </CardBody>
        </div>
    )
}

export default connect((users, MaxsulotlarRoyxariReducer, XodimReducer,MaxsulotxisobotReducer),
    {
        getUserForFiltering,
        getUserForFilteringBusiness,
        getLossProductByBusiness,
        getLossProductByBranch,
        getBarcodeAndName
    })(MaxsulotMiqdoriQoldigi)
