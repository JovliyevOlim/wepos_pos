import {Link, useHistory} from 'react-router-dom'
import './xarajatlarRoyxati.css'
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import XarajatlarReducer, {
    deleteXarajatlar,
    getOutlayByBusiness, getOutlayByBranch
} from "../reducer/XarajatlarReducer";
import users from '../../../../../reducer/users'
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import AgreeModal from "../../../../AgreeModal";
import XarajatTurlariReducer, {getXarajatlarTurlari} from "../reducer/XarajatTurlariReducer";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import XodimReducer, {getUserForFilteringBusiness, getUserForFiltering} from "../../Hodimlar/reducer/XodimReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Components/MainHeaderText";
import SelectAnt, {ButtonAnt} from "../../../../Components/SelectAnt";
import CardBody from "../../../../Components/CardBody";
import CommonTable from "../../../../Components/CommonTable";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";

function XarajatlarRoyxati({
                               getOutlayByBusiness,
                               getOutlayByBranch,
                               PayReducer, getPay,
                               getUserForFilteringBusiness, getUserForFiltering,
                               users,
                               XodimReducer,
                               deleteXarajatlar,
                               XarajatlarReducer,
                               XarajatTurlariReducer,
                               getXarajatlarTurlari
                           }) {

    const {t} = useTranslation();
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [mainBranchId, setMainBranchId] = useState(null)
    const [outlayCategoryId, setOutlayCategoryId] = useState(null)
    const [paymentMethodId, setPaymentMethodId] = useState(null)
    const [userId, setUserId] = useState(null)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: '2%',
        },
        {
            title: t('ol.10'),
            dataIndex: 'fio',
            key: 'fio',
        },
        {
            title: t('ol.11'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>
        },
        {
            title: t('ol.13'),
            dataIndex: 'branchName',
            key: 'branchName',
        },
        {
            title: 'Xarajat turi',
            dataIndex: 'outlayCategoryName',
            key: 'outlayCategoryName',
        },
        {
            title: 'To\'lov turi',
            dataIndex: 'paymentMethodName',
            key: 'paymentMethodName',
        },
        {
            title: 'Jami summa',
            dataIndex: 'sum',
            key: 'sum',
            render: (item) => <p className={'m-0'}>{item} so'm</p>
        },
        {
            title: t('Expenses.8'),
            dataIndex: 'description',
            key: 'description',
            width: '100px'
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-center gap-1 flex-wrap'}>
                {
                    users.editOutlay &&
                    <ButtonAnt text={t('button.edit')} type={'primary'} onClick={() => {
                        history.push('/main/addOutlay/' + values.id)
                    }
                    } icon={<EditOutlined/>}/>
                }
                {
                    users.deleteOutlay && <ButtonAnt text={t('button.delete')} danger={true} type={'primary'} onClick={() => {
                        deleteOutlayById(values.id)
                    }
                    } icon={<DeleteOutlined/>}/>
                }

            </div>,
        },
    ];


    const handlePageChange = (newPage) => {
        setPage(newPage-1);
    };

    const handleLimitChange = (event,size) => {
        setPage(0)
        setLimit(size);
    };

    const handleBranchChange = (e) => {
        setPage(0)
        setMainBranchId(e === '' ? null : e);
    };
    const handleOutlayCategoryChange = (e) => {
        setPage(0)
        setOutlayCategoryId(e === '' ? null : e);
    };

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setPage(0)
        if (users.getOutlayAdmin && !mainBranchId) {
            getOutlayByBusiness({
                id: users.businessId,
                params: {
                    page: page,
                    size: limit,
                    outlayCategoryId, paymentMethodId, userId
                }
            })
        } else if (users.getOutlay) {
            getOutlayByBranch({
                id: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    page: page,
                    size: limit,
                    outlayCategoryId, paymentMethodId, userId
                }
            })
        }
    }, [XarajatlarReducer.current, page, limit, outlayCategoryId, paymentMethodId, userId, mainBranchId])

    useEffect(() => {
        if (users.getUserAdmin && !mainBranchId) {
            getUserForFilteringBusiness(users.businessId)
        } else {
            getUserForFiltering(users.branchId)
        }
    }, [mainBranchId])

    useEffect(() => {
        if (XarajatlarReducer.saveOutlaysBool) {
            setdeletemodal(false)
            setLoading(false)
            setdeletID('')
        }
    }, [XarajatlarReducer.current])

    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState('')

    function deleteFunc() {
        deleteXarajatlar(deleteID)
    }

    function deleteOutlayById(item) {
        setdeletemodal(!deletemodal)
        setdeletID(item)
    }


    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 500)
    }, [XarajatlarReducer.getOutlaysBool])

    useEffect(() => {
        setLoading(false)
        getXarajatlarTurlari(users.businessId)
        getPay()
    }, [])

    return (
        <div>
            <div className={'d-flex col-md-12 mb-5 align-items-center justify-content-between'}>
                <MainHeaderText text={t('sidebar.outlay')}/>
                {
                    users.addOutlay ? <Link to={'/main/addOutlay'}>
                        <ButtonAnt text={t('button.add')} icon={<PlusOutlined />} type={'primary'}/>
                    </Link> : ''
                }
            </div>
            {
                users.getOutlayAdmin || users.getOutlay ?
                    <CardBody>
                        <div className="col-md-12 gap-2 gap-sm-0 d-flex flex-wrap">
                            <div className="col-12 col-sm-6 col-md-3 p-sm-2">
                                <SelectAnt
                                    name={t('ol.3')}
                                    onChange={handleBranchChange}
                                    permission={users.getPurchaseAdmin}
                                    selectList={users.branches}/>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3 p-sm-2">
                                <SelectAnt
                                    name={t('Expenses.3')}
                                    onChange={handleOutlayCategoryChange}
                                    permission={true}
                                    selectList={XarajatTurlariReducer.xarajatturlari}/>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3 p-sm-2">
                                <SelectAnt
                                    name={t('To\'lov turi')}
                                    onChange={(e) => setPaymentMethodId(e === "" ? null : e)}
                                    permission={true}
                                    selectList={PayReducer.paymethod}/>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3 p-sm-2">
                                <SelectAnt
                                    name={t('ol.9')}
                                    onChange={(e) => setUserId(e === "" ? null : e)}
                                    permission={true}
                                    selectList={XodimReducer.usersFiltering?.map((item) => ({
                                        id: item.id,
                                        name: item.fio
                                    }))}/>
                            </div>
                        </div>
                    </CardBody>
                    : ''
            }

            <CardBody>
                {
                    users.getOutlayAdmin || users.getOutlay ?
                        loading ?
                            XarajatlarReducer.outlays?.outlayList?.length > 0 ?
                                    <div className="table-responsive table-wrapper-scroll-y ">
                                        <CommonTable size={limit} page={page}
                                                     total={XarajatlarReducer.outlays?.totalItem}
                                                     handlePageChange={handlePageChange}
                                                     handleLimitChange={handleLimitChange} pagination={true}
                                                     data={XarajatlarReducer.outlays?.outlayList}
                                                     columns={columns}
                                        />
                                    </div> :
                                <div>
                                    <h4 className={'text-center'}>{XarajatlarReducer.message}</h4>
                                </div>
                            : <Loading/>
                        : ''
                }


            </CardBody>
            <AgreeModal deletemodal={deletemodal} deleteFunc={deleteFunc}
                        deleteModaltoggle={() => setdeletemodal(prevState => !prevState)}/>
        </div>
    )
}

export default connect((XarajatlarReducer, users, XarajatTurlariReducer, PayReducer, XodimReducer), {
    getOutlayByBusiness,
    getOutlayByBranch,
    deleteXarajatlar,
    getXarajatlarTurlari,
    getUserForFilteringBusiness, getUserForFiltering,
    getPay
})(XarajatlarRoyxati)