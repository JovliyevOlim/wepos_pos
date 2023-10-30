import '../BarcaSavdolar/barcasavdolar.css'
import React, {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import lossReducer, {
    getLossProductByBusiness,
    getLossProductByBranch,
    getLossProductOne
} from "../../../../../reducer/lossReducer";
import XodimReducer, {getUserForFiltering, getUserForFilteringBusiness} from "../../Hodimlar/reducer/XodimReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Components/MainHeaderText";
import {Link} from "react-router-dom";
import SelectAnt, {ButtonAnt} from "../../../../Components/SelectAnt";
import CardBody from "../../../../Components/CardBody";
import CommonTable from "../../../../Components/CommonTable";
import {EyeOutlined, PlusOutlined} from "@ant-design/icons";

function LossProducts({
                          lossReducer,
                          getLossProductOne, XodimReducer,
                          getLossProductByBusiness, getLossProductByBranch,
                          getUserForFiltering, getUserForFilteringBusiness,
                          users
                      }) {

    const {t} = useTranslation()
    const [pageData, setPageData] = useState(0)
    const [sizeData, setSizeData] = useState(5)
    const [mainBranch, setMainBranch] = useState(null)
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
            dataIndex: 'userFio',
            key: 'userFio',
        },
        {
            title: t('ol.13'),
            dataIndex: 'branchName',
            key: 'branchName',
        },
        {
            title: t('mah.113'),
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (item) => <p className={'m-0'}>{item} {t('mah.39')}</p>
        },
        {
            title: t('ol.11'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-center gap-1 flex-wrap'}>
                {
                    users.getLoss &&
                    <ButtonAnt type={'primary'} text={t('button.view')} bgColor={'aqua'} onClick={() => {
                        getOneById(values.id)
                    }
                    } icon={<EyeOutlined/>}/>
                }
            </div>,
        },
    ];


    useEffect(() => {
        setLoading(false)
        if (users.getLossAdmin && !mainBranch) {
            getLossProductByBusiness({
                businessId: users.businessId,
                params: {
                    page: pageData,
                    size: sizeData, userId
                }
            })
        } else if (users.getLoss) {
            getLossProductByBranch({
                branchId: mainBranch ? mainBranch : users.branchId,
                params: {
                    page: pageData,
                    size: sizeData, userId
                }
            })
        }

    }, [mainBranch, pageData, sizeData, userId])

    useEffect(() => {
        if (users.getUserAdmin && !mainBranch) {
            getUserForFilteringBusiness(users.businessId)
        } else {
            getUserForFiltering(mainBranch ? mainBranch : users.branchId)
        }
    }, [mainBranch])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [lossReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState('')

    function deleteFunc() {
        deleteModaltoggle('')
    }

    function deleteModaltoggle(item) {
        setdeletemodal(!deletemodal)
        setdeletID(item)
    }

    const onShowSizeChange = (event, size) => {
        setSizeData(size)
    };
    const changePage = (newPage) => {
        setPageData(newPage)
    };

    const [viewOneLoss, setViewOneLoss] = useState(false)


    function viewOneLossToggle() {
        setViewOneLoss(!viewOneLoss)
    }

    function getOneById(id) {
        getLossProductOne(id)
        viewOneLossToggle()
    }


    return (
        <div>
            <div className={'d-flex col-md-12 mb-5 align-items-center justify-content-between'}>
                <MainHeaderText text={t('sidebar.tableLossProduct')}/>
                {
                    users.addLoss ? <Link to={'/main/addLossProducts'}>
                        <ButtonAnt text={t('button.add')} icon={<PlusOutlined/>} type={'primary'}/>
                    </Link> : ''
                }
            </div>


            <CardBody>
                {
                    users.getLoss || users.getLossAdmin ?
                        <div className="col-md-12 gap-2 gap-sm-0 d-flex flex-wrap">
                            <div className="col-12 col-sm-6 col-md-3 p-sm-2">
                                <SelectAnt
                                    name={t('ol.3')}
                                    onChange={(e) => setMainBranch(e === "" ? null : e)}
                                    permission={users.getLossAdmin}
                                    selectList={users.branches}/>
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
                        : ''
                }
            </CardBody>

            {
                users.getLoss || users.getLossAdmin ?
                    <CardBody>
                        <Loading spinning={loading}>
                            {
                                lossReducer.lossProduct?.list?.length > 0 ?
                                    <div className="table-responsive table-wrapper-scroll-y">
                                        <CommonTable columns={columns} page={pageData} size={sizeData}
                                                     data={lossReducer.lossProduct?.list} pagination={true}
                                                     handleLimitChange={onShowSizeChange}
                                                     handlePageChange={changePage}
                                                     total={lossReducer.lossProduct.totalItem}
                                        />
                                    </div>
                                    :
                                    <div className={'border border-2'}>
                                        <h4 className={'text-center'}>{lossReducer.message || 'NOT FOUND'}</h4>
                                    </div>
                            }
                        </Loading>
                    </CardBody>
                    : ''

            }
            <Modal isOpen={deletemodal} toggle={deleteModaltoggle}>
                <ModalBody>
                    <h5>{t('Buttons.12')} ?</h5>
                </ModalBody>
                <ModalFooter>
                    <button onClick={deleteFunc}
                            className={'btn btn-outline-primary'}>{t('Buttons.3')}</button>
                    <button onClick={() => deleteModaltoggle('')}
                            className={'btn btn-outline-primary'}>{t('Buttons.7')}</button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={viewOneLoss} toggle={() => setViewOneLoss(!viewOneLoss)}>
                <ModalHeader>
                    <h4>
                        {t('mah.116')}
                    </h4>
                </ModalHeader>
                <ModalBody>

                    {
                        lossReducer.oneLossProduct ?
                            lossReducer.oneLossProduct.map(item =>
                                <div>
                                    <div>
                                        <div>
                                            <p className={'p-0 m-0'}>{t('mah.117')}
                                                <strong>{item?.branchName}</strong></p>
                                            <p className={'p-0 m-0'}>{t('mah.118')} <strong>{item?.userFio}</strong>
                                            </p>
                                            <p className={'p-0 m-0'}>{t('mah.119')}
                                                <strong>{item?.totalPrice} {t('mah.27')}</strong></p>
                                        </div>
                                    </div>
                                    <table className={'table table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>{t('mah.57')}</th>
                                            <th>{t('mah.58')}</th>
                                            <th>{t('mah.61')}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            item?.lossProductGetDtoList?.map(item =>
                                                <tr>
                                                    <th>{item.productName}</th>
                                                    <th>{item.quantity} {item.measurementName}</th>
                                                    <th>{item.price} {t('mah.27')}</th>
                                                </tr>
                                            )
                                        }

                                        </tbody>
                                    </table>
                                </div>
                            )
                            : <div><h4 className={'text-center'}>NOT FOUND</h4></div>
                    }
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-danger'}
                            onClick={() => setViewOneLoss(!viewOneLoss)}>{t('mah.108')}</button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

export default connect((users, lossReducer, XodimReducer),
    {
        getLossProductByBusiness,
        getLossProductByBranch,
        getUserForFiltering,
        getUserForFilteringBusiness,
        getLossProductOne
    })(LossProducts)
