import {Link} from 'react-router-dom'
import Edit from '../../../../../img/Edit.png'
import Delete from '../../../../../img/Delete.png'
import Korish from '../../../../../img/Korish.png'
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
import {Box, TablePagination} from "@mui/material";
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";
import XodimReducer, {getUserForFiltering, getUserForFilteringBusiness} from "../../Hodimlar/reducer/XodimReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Svg/MainHeaderText";
import SelectAnt, {ButtonAnt} from "../../../../Svg/SelectAnt";
import CardBody from "../../../../Svg/CardBody";

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
    const [mainBranchId, setMainBranchId] = useState(null)
    const [paymentStatus, setPaymentStatus] = useState(null)
    const [supplierId, setSupplierId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [saveModal, setSaveModal] = useState(false)

    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setPage(0)
        setLimit(parseInt(event.target.value));
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
        setTimeout(() => {
            setLoading(true)
        }, 500)
    }, [XaridReducer.getBoolean])


    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div>
            <div className={'d-flex col-md-12 mb-5 align-items-center justify-content-between'}>
                <MainHeaderText text={t('ol.1')}/>
                {
                    users.addTrade ? <Link to={'/main/addPurchase'}>
                        <ButtonAnt text={t('ol.2')} type={'primary'}/>
                    </Link> : ''
                }
            </div>

            {
                users.getPurchaseAdmin || users.getPurchase ?
                    <CardBody>
                        <div className="col-md-12 d-flex flex-wrap">
                            <div className="col-md-3">
                                <SelectAnt
                                    name={t('ol.3')}
                                    onChange={(e) => setMainBranchId(e === "" ? null : e)}
                                    permission={users.getPurchaseAdmin}
                                    selectList={users.branches}/>
                            </div>
                            <div className="col-md-3">
                                <SelectAnt
                                    name={t('ol.4')}
                                    onChange={(e) => setSupplierId(e === "" ? null : e)}
                                    permission={true}
                                    selectList={TaminotReducer.AllSupplier}/>
                            </div>
                            <div className="col-md-3">
                                <SelectAnt
                                    name={t('ol.5')}
                                    onChange={(e) => setPaymentStatus(e === "" ? null : e)}
                                    permission={true}
                                    selectList={[
                                        {id:'TOLANGAN',name:(t('ol.6'))},
                                        {id:'TOLANMAGAN',name:(t('ol.7'))},
                                        {id:'QISMAN_TOLANGAN',name:(t('ol.'))},
                                    ]}/>
                            </div>
                            <div className="col-md-3">
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
            <div className="rowStyleBH">
                {
                    users.getPurchaseAdmin || users.getPurchase ?
                        loading ?
                            XaridReducer.purchase?.list?.length > 0 ?
                                <div>
                                    <div className="izlashBH">
                                        {/*<div >*/}
                                        {/*    <button><img src={Excel} alt=""/> Export Excel</button>*/}
                                        {/*</div>*/}
                                    </div>
                                    <div className="table-responsive table-wrapper-scroll-y">
                                        <table className='table table-hover table-striped table-bordered mt-4'>
                                            <thead>
                                            <tr>
                                                <th>T/R</th>
                                                <th>{t('ol.10')}</th>
                                                <th>{t('ol.11')}</th>
                                                <th>{t('ol.12')}</th>
                                                <th>{t('ol.13')}</th>
                                                <th>{t('ol.14')}</th>
                                                <th>{t('ol.15')}</th>
                                                <th>{t('ol.16')}</th>
                                                <th>{t('ol.17')}</th>
                                                <th>{t('ol.18')}</th>
                                                <th>{t('ol.19')}</th>
                                                {/*<th>Eslatma</th>*/}
                                                <th>{t('ol.20')}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                XaridReducer.purchase?.list.map((item, index) => <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.userFio}</td>
                                                    <td>{moment(new Date(item?.createdAt)).format('LLLL')}</td>
                                                    <td className={item.edit && 'bg-warning'}>{item?.invoice}</td>
                                                    <td>{item?.branchName}</td>
                                                    <td>{item?.supplierName}</td>
                                                    <td>{item?.totalSum}</td>
                                                    <td>{item?.paidSum}</td>
                                                    <td>{item?.debtSum}</td>
                                                    <td>{item?.paymentStatus}</td>
                                                    <td>{item?.paymentMethodName}</td>
                                                    {/*<td>{item?.description}</td>*/}
                                                    <td>
                                                        {users.editPurchase && item?.editable ?
                                                            <Link to={'/main/addPurchase/' + item.id}>
                                                                <button className='taxrirlash'><img src={Edit}
                                                                                                    alt=""/> {t('Buttons.1')}
                                                                </button>
                                                            </Link> : ''}
                                                        {users.getPurchase ?
                                                            <button className='korish'
                                                                    onClick={() => getOneById(item.id)}><img
                                                                src={Korish}
                                                                alt=""/> {t('Buttons.4')}
                                                            </button>
                                                            : ''}
                                                        {users.deletePurchase && item?.editable ?
                                                            <button className='ochirish'
                                                                    onClick={() => deletePurchaseById(item.id)}><img
                                                                src={Delete} alt=""/> {t('Buttons.3')}
                                                            </button> : ''}
                                                    </td>
                                                </tr>)
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    <Box p={2}>
                                        <TablePagination
                                            component="div"
                                            count={XaridReducer.purchase?.totalItem}
                                            onPageChange={handlePageChange}
                                            onRowsPerPageChange={handleLimitChange}
                                            page={page}
                                            rowsPerPageOptions={[5, 10, 15]}
                                            rowsPerPage={limit}
                                        />
                                    </Box>
                                </div> : <div className={'border border-2'}>
                                    <h4 className={'text-center'}>{XaridReducer.message || 'NOT FOUND'}</h4>
                                </div> : <Loading/> : ''
                }
            </div>


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
                                                <div className="col-md-4"><p>{t('ol.26')} <strong> {moment(new Date(item?.createdAt)).format('LLLL')}</strong>
                                                </p>
                                                </div>
                                                <div className="col-md-4"><p>{t('ol.27')} <strong>{item?.paymentMethodName}</strong></p>
                                                </div>
                                                <div className="col-md-4"><p>{t('ol.28')} <strong>{item?.paymentStatus}</strong></p>
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
                                                    <p className={''}>{t('ol.31')} <strong>{item?.totalSum} {t('ol.32')}</strong>
                                                    </p>
                                                </div>
                                                <div className="col-md-5">
                                                    <p className={''}>{t('ol.33')} <strong>{item?.paidSum} {t('ol.34')}</strong>
                                                    </p>
                                                </div>
                                                <div className="col-md-5">
                                                    <p className={''}>{t('ol.35')} <strong>{item.debtSum} {t('ol.34')}</strong>
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
                    <button className={'btn btn-danger'} onClick={() => setViewOnePurchase(!viewOnePurchase)}>{t('ol.44')}
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
