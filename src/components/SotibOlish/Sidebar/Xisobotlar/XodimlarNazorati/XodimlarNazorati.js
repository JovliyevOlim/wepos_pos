import {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import moment from "moment";
import 'moment/locale/uz-latn'

import users from "../../../../../reducer/users";
import XodimReducer, {getUserForFiltering, getUserForFilteringBusiness} from "../../Hodimlar/reducer/XodimReducer";
import UserHistoryReducer,{getUserHistoryByBranch,getUserHistoryByBusiness} from "../reducer/UserHistoryReducer";
import Loading from "../../../../Loading";
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";
import {prettify} from "../../../../../util";

function XodimlarNazorati({users, XodimReducer, getUserForFiltering, getUserForFilteringBusiness,
                              UserHistoryReducer,getUserHistoryByBranch,getUserHistoryByBusiness
                          }) {
    const {t} = useTranslation()
    const [mainBranchId, setMainBranchId] = useState(null)
    const [name, setName] = useState(null)
    const [userId, setUserId] = useState(null)
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [loading, setLoading] = useState(false)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: '2%',
        },
        {
            title: t('ol.10'),
            dataIndex: 'userFio',
            key: 'userFio',
        },
        {
            title: t('ol.13'),
            dataIndex: 'branchName',
            key: 'branchName',
        },
        {
            title: 'Qilgan ishi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Summasi',
            dataIndex: 'sum',
            key: 'sum',
            render:(item,values)=><div>
                {
                    values?.oldSum !== 0 && (
                        <del>{prettify(values.oldSum,3)} so'm</del>
                    )
                }
                <p>{prettify(item,3)} so'm</p>
            </div>
        },
        {
            title: t('ol.11'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>
        },
        {
            title: 'Tavsif',
            dataIndex: 'description',
            key: 'description',
            width: '200px'
        },
    ];

    const handlePageChange = (newPage) => {
        setPage(newPage-1);
    };

    const handleLimitChange = (event,size) => {
        setPage(0)
        setSize(size);
    };



    useEffect(() => {
        setLoading(false)
        if (users.getInfoAdmin && !mainBranchId) {
            getUserHistoryByBusiness({
                businessId: users.businessId,
                params: {
                    page, size, userId, name
                }
            })
        } else {
            getUserHistoryByBranch({
                branchId: mainBranchId ? mainBranchId: users.branchId,
                params: {
                    page, size,  userId, name
                }
            })
        }
    }, [mainBranchId, page, size, userId,name])

    useEffect(() => {
        setPage(0)
    }, [mainBranchId, size,name, userId])

    useEffect(() => {
        if (users.getUserAdmin && !mainBranchId) {
            getUserForFilteringBusiness(users.businessId)
        } else {
            getUserForFiltering(mainBranchId ? mainBranchId : users.branchId)
        }
    }, [mainBranchId])

    useEffect(() => {
            setLoading(true)
    }, [UserHistoryReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div>
            <div className="col-md-12 mb-3">
                <MainHeaderText text={'Hodimlar Nazorati'}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex flex-wrap">
                    <div className="col-12 col-sm-6 col-lg-4 p-2">
                        <SelectAnt selectList={users?.branches} permission={users.getInfoAdmin} name={'Filiallar'} onChange={(e) => setMainBranchId(e === '' ? null : e)}/>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 p-2">
                        <SelectAnt selectList={XodimReducer.usersFiltering?.map((item) => ({
                            id: item.id,
                            name: item.fio
                        }))} permission={true}
                                   name={'Hodimlar'} onChange={(e) => setUserId(e === '' ? null : e)}/>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 p-2">
                        <SelectAnt selectList={[
                            {id:'SAVDO',name:'Savdo'},
                            {id:'XARID',name:'Xarid'},
                            {id:'XARAJAT',name:'Xarajat'},
                            {id:'YUQOTISH',name:'Yo\'qotish'},
                            {id:'PAYMENT',name:'To\'lov'},
                        ]} permission={true}
                                   name={'Ish bo\'yicha'} onChange={(e) => setName(e === "" ? null : e)}/>
                    </div>
                </div>
            </CardBody>
            <CardBody>
                <Loading spinning={loading}>
                    {
                        UserHistoryReducer.userHistory?.list?.length > 0 ?
                            <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                <CommonTable size={size} page={page} total={UserHistoryReducer.userHistory?.totalItem} columns={columns}
                                             handlePageChange={handlePageChange} handleLimitChange={handleLimitChange}
                                             data={UserHistoryReducer.userHistory?.list} pagination={true}/>
                            </div> : <div>
                                <h4 className={'text-center'}>{UserHistoryReducer.message}</h4>
                            </div>
                    }
                </Loading>
            </CardBody>
        </div>
    )
}

export default connect((users,XodimReducer,UserHistoryReducer),
    {
        getUserForFiltering,
        getUserForFilteringBusiness,
        getUserHistoryByBranch,
        getUserHistoryByBusiness
    })(XodimlarNazorati)
