import {Link, useHistory} from 'react-router-dom'
import './haridlarRoyxati.css'
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import XaridReducer, {
    getPurchaseByBranch,
    getPurchaseByBusiness,
    deleteXarid,
    editXarid,
    saveXarid, getPurchaseView,
} from "../reducer/XaridReducer";
import TaminotReducer, {getAllSupplier} from "../../Hamkorlar/reducer/TaminotReducer";
import users from "../../../../../reducer/users";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";
import XodimReducer, {getUserForFiltering, getUserForFilteringBusiness} from "../../Hodimlar/reducer/XodimReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Components/MainHeaderText";
import SelectAnt, {ButtonAnt} from "../../../../Components/SelectAnt";
import CardBody from "../../../../Components/CardBody";
import CommonTable from "../../../../Components/CommonTable";
import {DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined} from "@ant-design/icons";
import {prettify} from "../../../../../util";

function HaridlarRoyxati({
                             getAllSupplier,
                             getPurchaseByBranch,
                             getPurchaseByBusiness,
                             getUserForFiltering,
                             getUserForFilteringBusiness,
                             deleteXarid,
                             XodimReducer,
                             XaridReducer,
                             TaminotReducer,
                             users,
                             getPurchaseView
                         }) {

    const {t} = useTranslation()
    const history = useHistory()
    const [mainBranchId, setMainBranchId] = useState(null)
    const [paymentStatus, setPaymentStatus] = useState(null)
    const [supplierId, setSupplierId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [saveModal, setSaveModal] = useState(false)

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
            title: t('ol.11'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>
        },
        {
            title: t('ol.12'),
            dataIndex: 'invoice',
            key: 'invoice',
            width: '80px'
        },
        {
            title: t('ol.13'),
            dataIndex: 'branchName',
            key: 'branchName',
        },
        {
            title: t('ol.14'),
            dataIndex: 'supplierName',
            key: 'supplierName',
        },
        {
            title: t('ol.15'),
            dataIndex: 'totalSum',
            key: 'totalSum',
            render: (item) => <p className={'m-0'}>{prettify(item)} so'm</p>
        },
        {
            title: t('ol.16'),
            dataIndex: 'paidSum',
            key: 'paidSum',
            render: (item) => <p className={'m-0'}>{prettify(item)} so'm</p>,
            width: '100px'
        },
        {
            title: t('ol.17'),
            dataIndex: 'debtSum',
            key: 'debtSum',
            render: (item) => <p className={'m-0'}>{prettify(item)} so'm</p>
        },
        {
            title: t('ol.18'),
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
        },
        {
            title: t('ol.19'),
            dataIndex: 'paymentMethodName',
            key: 'paymentMethodName',
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-center gap-1 flex-wrap'}>
                {
                    users.getPurchase &&
                    <ButtonAnt type={'primary'} text={t('button.view')} bgColor={'aqua'} onClick={() => {
                        getOneById(values.id)
                    }
                    } icon={<EyeOutlined/>}/>
                }

                {
                    users.editPurchase && values.editable &&
                    <ButtonAnt text={t('button.edit')} type={'primary'} onClick={() => {
                        history.push('/main/addPurchase/' + values.id)
                    }
                    } icon={<EditOutlined/>}/>
                }
                {
                    users.deletePurchase && values.editable &&
                    <ButtonAnt text={t('button.delete')} danger={true} type={'primary'} onClick={() => {
                        deletePurchaseById(values.id)
                    }
                    } icon={<DeleteOutlined/>}/>
                }

            </div>,
        },
    ];

    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };
    const handleLimitChange = (page, size) => {
        setPage(0)
        setLimit(size);
    };

    useEffect(() => {
        getAllSupplier(users.businessId)
    }, [XaridReducer.current])

    useEffect(() => {
        setLoading(false)
        if (users.getPurchaseAdmin && !mainBranchId) {
            getPurchaseByBusiness({
                businessId: users.businessId,
                params: {
                    page: page,
                    size: limit,
                    paymentStatus,
                    supplierId,
                    userId
                }
            })
        } else if (users.getPurchase) {
            getPurchaseByBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    page: page,
                    size: limit,
                    paymentStatus,
                    supplierId,
                    userId
                }
            })
        }
    }, [XaridReducer.current, mainBranchId, page, limit, supplierId, userId, paymentStatus])


    useEffect(() => {
        if (users.getUserAdmin && !mainBranchId) {
            getUserForFilteringBusiness(users.businessId)
        } else {
            getUserForFiltering(users.branchId)
        }
    }, [mainBranchId])

    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState('')

    function deletePurchaseById(item) {
        setdeletemodal(!deletemodal)
        setdeletID(item)
    }

    function deleteFunc() {
        deleteXarid(deleteID)
        setSaveModal(true)
    }

    const [viewOnePurchase, setViewOnePurchase] = useState(false)


    function viewOnePurchaseToggle() {
        setViewOnePurchase(!viewOnePurchase)
    }

    function getOneById(id) {
        getPurchaseView(id)
        viewOnePurchaseToggle()
    }


    useEffect(() => {
        if (XaridReducer.saveBoolean) {
            setLoading(false)
            setdeletemodal(false)
            setdeletID('')
        }
        setSaveModal(false)
    }, [XaridReducer.current])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
            setLoading(true)
    }, [XaridReducer.getBoolean])


    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div>
            <div className={'d-flex col-md-12 mb-5 align-items-center justify-content-between'}>
                <MainHeaderText text={t('sidebar.purchases')}/>
                {
                    users.addPurchase ? <Link to={'/main/addPurchase'}>
                        <ButtonAnt text={t('button.add')} icon={<PlusOutlined/>} type={'primary'}/>
                    </Link> : ''
                }
            </div>
            {
                users.getPurchaseAdmin || users.getPurchase ?
                    <CardBody>
                        <div className="col-md-12 gap-2 gap-sm-0 d-flex flex-wrap">
                            <div className="col-12 col-sm-6 col-md-3 p-sm-2">
                                <SelectAnt
                                    name={t('ol.3')}
                                    onChange={(e) => setMainBranchId(e === "" ? null : e)}
                                    permission={users.getPurchaseAdmin}
                                    selectList={users.branches}/>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3 p-sm-2">
                                <SelectAnt
                                    name={t('ol.4')}
                                    onChange={(e) => setSupplierId(e === "" ? null : e)}
                                    permission={true}
                                    selectList={TaminotReducer.AllSupplier}/>
                            </div>
                            <div className="col-12 col-sm-6 col-md-3 p-sm-2">
                                <SelectAnt
                                    name={t('ol.5')}
                                    onChange={(e) => setPaymentStatus(e === "" ? null : e)}
                                    permission={true}
                                    selectList={[
                                        {id: 'TOLANGAN', name: (t('ol.6'))},
                                        {id: 'TOLANMAGAN', name: (t('ol.7'))},
                                        {id: 'QISMAN_TOLANGAN', name: (t('ol.'))},
                                    ]}/>
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
                    users.getPurchaseAdmin || users.getPurchase ?
                        <CardBody>
                            <Loading spinning={loading}>
                                {
                                    XaridReducer.purchase?.list?.length > 0 ?
                                        <div className="table-responsive table-wrapper-scroll-y">
                                            <CommonTable
                                                columns={columns}
                                                size={limit}
                                                page={page}
                                                pagination={true}
                                                data={XaridReducer.purchase?.list}
                                                total={XaridReducer.purchase?.totalItem}
                                                handleLimitChange={handleLimitChange}
                                                handlePageChange={handlePageChange}
                                            />
                                        </div>
                                        : <div className={'border border-2'}>
                                            <h4 className={'text-center'}>{XaridReducer.message || 'NOT FOUND'}</h4>
                                        </div>
                                }
                            </Loading>
                        </CardBody> : ''
                }
            </CardBody>


            <Modal isOpen={viewOnePurchase} size={'xl'} toggle={() => setViewOnePurchase(!viewOnePurchase)}>
                <ModalHeader>
                    <h4>
                        {t('ol.25')}
                    </h4>
                </ModalHeader>
                <ModalBody>
                    {
                        XaridReducer.purchaseOne ?
                            XaridReducer.purchaseOne.map(item =>
                                <div>
                                    <div>
                                        <div className="col-md-12 ">
                                            <div className="col-md-12 d-flex flex-wrap">
                                                <div className="col-md-4"><p>{t('ol.26')}
                                                    <strong> {moment(new Date(item?.createdAt)).format('LLLL')}</strong>
                                                </p>
                                                </div>
                                                <div className="col-md-4"><p>{t('ol.27')}
                                                    <strong>{item?.paymentMethodName}</strong></p>
                                                </div>
                                                <div className="col-md-4"><p>{t('ol.28')}
                                                    <strong>{item?.paymentStatus}</strong></p>
                                                </div>
                                                <div className="col-md-12">
                                                    <p>{t('ol.29')} <strong>{item?.description}</strong></p>
                                                </div>
                                            </div>
                                            <div className="col-md-12 d-flex flex-wrap">
                                                <div className="col-md-5">
                                                    <p>{t('ol.30')} <strong>{item?.supplierName}</strong></p>
                                                </div>
                                                <div className="col-md-5">
                                                    <p className={''}>{t('ol.31')}
                                                        <strong>{item?.totalSum} {t('ol.32')}</strong>
                                                    </p>
                                                </div>
                                                <div className="col-md-5">
                                                    <p className={''}>{t('ol.33')}
                                                        <strong>{item?.paidSum} {t('ol.34')}</strong>
                                                    </p>
                                                </div>
                                                <div className="col-md-5">
                                                    <p className={''}>{t('ol.35')}
                                                        <strong>{item.debtSum} {t('ol.34')}</strong>
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className={'table-responsive'}>
                                        <table className={'table table-bordered'}>
                                            <thead>
                                            <tr>
                                                <th>Tr</th>
                                                <th>{t('ol.36')}</th>
                                                <th>{t('ol.37')}</th>
                                                <th>{t('ol.38')}</th>
                                                <th>{t('ol.39')}</th>
                                                <th>{t('ol.40')}</th>
                                                <th>{t('ol.41')}</th>
                                                <th>{t('ol.42')}</th>
                                                <th>{t('ol.43')}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                item?.purchaseProductGetDtoList?.map((item, index) =>
                                                    <tr>
                                                        <th>{index + 1}</th>
                                                        <th>{item.productName}</th>
                                                        <th>{item.quantity} {item.measurementName}</th>
                                                        <th>{item?.soldQuantity} {item.measurementName}</th>
                                                        <th>{item.quantity - item?.soldQuantity} {item.measurementName}</th>
                                                        <th>
                                                            <div>
                                                                <h6>{item.buyPrice} {t('ol.34')}</h6>
                                                            </div>

                                                        </th>
                                                        <th>
                                                            <div>
                                                                <h6>{item.salePrice} {t('ol.34')}</h6>
                                                            </div>

                                                        </th>
                                                        {/*<th>{item?.profit}</th>*/}
                                                        <th>
                                                            <div>
                                                                <h6>{item?.profit} {t('ol.34')}</h6>
                                                            </div>

                                                        </th>

                                                        <th>
                                                            <div>
                                                                <h6>{item.totalSum} {t('ol.34')}</h6>
                                                            </div>

                                                        </th>
                                                    </tr>
                                                )
                                            }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                            : <div><h4 className={'text-center'}>{XaridReducer.message}</h4></div>
                    }
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-danger'}
                            onClick={() => setViewOnePurchase(!viewOnePurchase)}>{t('ol.44')}
                    </button>
                </ModalFooter>
            </Modal>
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deleteFunc={deleteFunc} deleteModaltoggle={() => setdeletemodal(prevState => !prevState)}
                        deletemodal={deletemodal}/>
        </div>
    )
}

export default connect((TaminotReducer, XaridReducer, users, XodimReducer), {
    getPurchaseByBranch,
    getPurchaseByBusiness,
    getUserForFiltering,
    getUserForFilteringBusiness,
    getAllSupplier,
    saveXarid,
    editXarid,
    deleteXarid,
    getPurchaseView
})
(HaridlarRoyxati)
