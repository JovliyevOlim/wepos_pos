import {Link, useHistory} from 'react-router-dom'
import React, {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import formatDate, {camelize} from "../../../../../util";
import Loading from "../../../../Loading";
import Imagecom from "../../../../Imagecom";
import {useReactToPrint} from "react-to-print";
import checkReducer, {getInvoice} from "../../../../../reducer/checkReducer";
import PayReducer, {getPay} from "../../../../../reducer/PayReducer";
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";
import CustomerReducer, {
    getCustomersForTrade,
    getCustomersForTradeBusiness
} from "../../Hamkorlar/reducer/CustomerReducer";
import XodimReducer, {getUserForFiltering, getUserForFilteringBusiness} from "../../Hodimlar/reducer/XodimReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import MainHeaderText from "../../../../Components/MainHeaderText";
import SelectAnt, {ButtonAnt, SearchAnt} from "../../../../Components/SelectAnt";
import CardBody from "../../../../Components/CardBody";
import CommonTable from "../../../../Components/CommonTable";
import {DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined} from "@ant-design/icons";
import {DatePicker} from "antd";
import dayjs from "dayjs";
import {CustomButton, DeleteButton, EditButton, ViewButton} from "../../../../Components/Buttons";

import edit from "../../../../../img/pencil.svg"
import exchangeReducer, {
    getExchangeByBranch,
    getExchangeByBusiness,
    getExchangeOne
} from "../../../../../reducer/exchangeReducer";

function ExchangeReportAll({
                               XodimReducer,
                               CustomerReducer,
                               getExchangeByBranch, getExchangeByBusiness,
                               exchangeReducer,
                               getCustomersForTrade,
                               getUserForFiltering,
                               getUserForFilteringBusiness,
                               getCustomersForTradeBusiness,
                               getPay,
                               getExchangeOne,
                               users,
                               checkReducer,
                               PayReducer
                           }) {

    const {t} = useTranslation()
    const history = useHistory()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [printDisplay, setPrintDisplay] = useState('none')
    const [mainBranch, setMainBranch] = useState(null)
    const [saveModal, setSaveModal] = useState(false)
    const [isViewExchange, setIsViewExchange] = useState(false)

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState(null)
    const [customerId, setCustomerId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [paymentStatus, setPaymentStatus] = useState(null)
    const [backing, setBacking] = useState('true')
    const [startDate, setStartDate] = useState(null)

    const columns = [
        // {
        //     title: 'Chek',
        //     dataIndex: 'invoice',
        //     key: 'invoice',
        //     width: '5%',
        // },
        {
            title: t('ol.11'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>,
            width: '8%',
        },
        {
            title: t('ol.10'),
            dataIndex: 'senderName',
            key: 'senderName',
            width: '7%',
        },
        {
            title: "1-filial",
            dataIndex: 'firstBranchName',
            key: 'firstBranchName',
            width: '8%',
        },
        {
            title: "Xarajat",
            dataIndex: 'outlaySumma',
            key: 'outlaySumma',
            width: '10%',
            render: (item) => <p className={'m-0'}>{item}</p>,
        },
        {
            title: "2-filial",
            dataIndex: 'secondBranchName',
            key: 'secondBranchName',
            width: '10%',
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: '10%',
            render: (item, values) => <div className={'d-flex justify-content-start gap-1 flex-wrap'}>
                {
                    users.getTrade && <ViewButton onClick={() => {
                        viewExchangeInfoById(item?.id)
                    }
                    }/>
                }
            </div>,
        },
    ];


    function viewExchangeInfoById(id) {
        setIsViewExchange(true)
        getExchangeOne(id)
    }

    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };
    const handleLimitChange = (event, size) => {
        setPage(0)
        setLimit(size);
    };


    useEffect(() => {
        setLoading(false)
        if (users.getTradeAdmin && !mainBranch) {
            getExchangeByBusiness({
                businessId: users.businessId,
                params: {
                    page: page,
                    size: limit,
                    customerId, paymentStatus, userId,
                    invoice: search,
                    startDate: startDate ? dayjs(startDate).format("YYYY/MM/DD") : null
                }
            })
        } else if (users.getTrade) {
            getExchangeByBranch({
                branchId: mainBranch ? mainBranch : users.branchId,
                params: {
                    page: page,
                    size: limit,
                    customerId, paymentStatus, userId,
                    invoice: search,
                    startDate: startDate ? dayjs(startDate).format("YYYY/MM/DD") : null
                }
            })
        }
    }, [exchangeReducer.current, limit, page, customerId, userId, paymentStatus, mainBranch, search, startDate])


    useEffect(() => {
        if (users.getUserAdmin && !mainBranch) {
            getUserForFilteringBusiness(users.businessId)
        } else {
            getUserForFiltering(mainBranch ? mainBranch : users.branchId)
        }
        if (users.getCustomerAdmin && !mainBranch) {
            getCustomersForTradeBusiness(users.businessId)
        } else {
            getCustomersForTrade(mainBranch ? mainBranch : users.branchId)
        }
    }, [mainBranch])


    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [exchangeReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
        getPay(users.businessId)
    }, [])



    const columnOneExchange = [
        // {
        //     title: 'Chek',
        //     dataIndex: 'invoice',
        //     key: 'invoice',
        //     width: '5%',
        // },
        {
            title: "Mahsulot",
            dataIndex: 'name',
            key: 'name',
            width: '7%',
        },
        {
            title: "Miqdori",
            dataIndex: 'amount',
            key: 'amount',
            width: '10%',
            render: (item,value) => <p className={'m-0'}>{item} {value.measurementName}</p>,
        },
    ];


    return (
        <>
            <div className="col-md-12 mb-3">
                <MainHeaderText text={"O'tkazmalar xisoboti"}/>
            </div>
            {/*{*/}
            {/*    users.getTradeAdmin || users.getTrade ?*/}
            {/*        <CardBody>*/}
            {/*            <div className="col-md-12 d-flex flex-wrap">*/}
            {/*                <div className="col-12 col-sm-6 col-lg-3 p-2">*/}
            {/*                    <SelectAnt*/}
            {/*                        name={t('ol.3')}*/}
            {/*                        onChange={(e) => setMainBranch(e === "" ? null : e)}*/}
            {/*                        permission={users.getTradeAdmin}*/}
            {/*                        selectList={users.branches}/>*/}
            {/*                </div>*/}
            {/*                <div className="col-12 col-sm-6 col-lg-3 p-2">*/}
            {/*                    <SelectAnt*/}
            {/*                        name={'Mijozlar'}*/}
            {/*                        onChange={(e) => setCustomerId(e === "" ? null : e)}*/}
            {/*                        permission={true}*/}
            {/*                        selectList={CustomerReducer.customersTrade}/>*/}
            {/*                </div>*/}
            {/*                <div className="col-12 col-sm-6 col-lg-3 p-2">*/}
            {/*                    <SelectAnt*/}
            {/*                        name={t('ol.9')}*/}
            {/*                        onChange={(e) => setUserId(e === "" ? null : e)}*/}
            {/*                        permission={true}*/}
            {/*                        selectList={XodimReducer.usersFiltering?.map((item) => ({*/}
            {/*                            id: item.id,*/}
            {/*                            name: item.fio*/}
            {/*                        }))}/>*/}
            {/*                </div>*/}
            {/*                <div className="col-12 col-sm-6 col-lg-3 p-2">*/}
            {/*                    <SelectAnt*/}
            {/*                        name={t('ol.5')}*/}
            {/*                        onChange={(e) => setPaymentStatus(e === "" ? null : e)}*/}
            {/*                        permission={true}*/}
            {/*                        selectList={[*/}
            {/*                            {id: 'TOLANGAN', name: (t('ol.6'))},*/}
            {/*                            {id: 'TOLANMAGAN', name: (t('ol.7'))},*/}
            {/*                            {id: 'QISMAN_TOLANGAN', name: (t('ol.8'))},*/}
            {/*                        ]}/>*/}
            {/*                </div>*/}
            {/*                <div className="col-12 col-sm-6 col-lg-3 p-2">*/}
            {/*                    <h5 className={'selectLabel'}>Sana</h5>*/}
            {/*                    <DatePicker*/}
            {/*                        className="w-100"*/}
            {/*                        onChange={(e) => setStartDate(e === '' ? null : e)}/>*/}
            {/*                </div>*/}
            {/*                <div className="col-12 p-2">*/}
            {/*                    <SearchAnt name={t('mah.35')}*/}
            {/*                               onChange={(e) => setSearch(e.target.value === '' ? null : e.target.value)}/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </CardBody>*/}
            {/*        : ''*/}
            {/*}*/}
            <CardBody>
                {
                    users.getTrade || users.getTradeAdmin ?
                        <Loading spinning={loading}>
                            {
                                exchangeReducer?.exchange?.list?.length > 0 ?
                                    <div>
                                        <div className="table-responsive table-wrapper-scroll-y">
                                            <CommonTable handlePageChange={handlePageChange}
                                                         handleLimitChange={handleLimitChange} page={page} size={limit}
                                                         total={exchangeReducer?.exchange?.totalItem}
                                                         data={exchangeReducer.exchange?.list} pagination={true}
                                                         columns={columns}
                                            />
                                        </div>
                                    </div> :
                                    <div className={'border border-2'}>
                                        <h4 className={'text-center'}>{exchangeReducer.message}</h4>
                                    </div>
                            }
                        </Loading>
                        : ''
                }
            </CardBody>


            <Modal isOpen={isViewExchange} size={'md'} toggle={() => setIsViewExchange(!isViewExchange)}>
                <ModalHeader>
                    <h4>
                        {t('mah.47')}
                    </h4>
                </ModalHeader>
                <ModalBody>
                    {
                        exchangeReducer.oneExchange?.length > 0 ?
                            <CardBody>
                                <div className="table-responsive table-wrapper-scroll-y">
                                    <CommonTable total={exchangeReducer.oneExchange?.length}
                                                 data={exchangeReducer.oneExchange} pagination={false}
                                                 columns={columnOneExchange}
                                    />
                                </div>
                            </CardBody>
                            : <div><h4 className={'text-center'}>{exchangeReducer.message}</h4></div>
                    }
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-danger'}
                            onClick={() => setIsViewExchange(!isViewExchange)}>{t('mah.62')}
                    </button>
                </ModalFooter>
            </Modal>
            <ModalLoading isOpen={saveModal}/>
        </>

    )
}

export default connect((CustomerReducer, checkReducer, users, XodimReducer, PayReducer, exchangeReducer), {
    getCustomersForTrade,
    getCustomersForTradeBusiness,
    getUserForFiltering,
    getInvoice,
    getUserForFilteringBusiness,
    getPay, getExchangeByBranch, getExchangeByBusiness, getExchangeOne
})(ExchangeReportAll)
