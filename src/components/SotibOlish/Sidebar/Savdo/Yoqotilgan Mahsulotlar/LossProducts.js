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
import {Box, TablePagination} from "@mui/material";
import Korish from "../../../../../img/Korish.png";
import XodimReducer, {getUserForFiltering, getUserForFilteringBusiness} from "../../Hodimlar/reducer/XodimReducer";
import moment from "moment";
import 'moment/locale/uz-latn'

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


    useEffect(() => {
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

    const onShowSizeChange = (event) => {
        setSizeData(parseInt(event.target.value))
    };
    const changePage = (_event, newPage) => {
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
        <div className="col-md-12 mt-2 mb-4 mt-4 ">
            <div className="textHeader">
                <h2>Yoqotilgan mahsulotlar</h2>
            </div>


            <div className="rowStyleH">
                {
                    users.getLoss || users.getLossAdmin ?
                        <div className="row cont">
                            <div className="col-md-6">
                                <h6>{t('ProductList.8')}:</h6>
                                <select name="" className={'form-control'} value={mainBranch}
                                        onChange={(e) => setMainBranch(e.target.value === "" ? null : e.target.value)}
                                        id="">
                                    {
                                        users.getLossAdmin &&
                                        <option value={''}>Barchasi</option>
                                    }
                                    {
                                        users.branches?.map(item => <option value={item.id}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="col-md-6">
                                <h6>Xodimlar:</h6>
                                <select name="" className={'form-control'} value={userId}
                                        onChange={(e) => setUserId(e.target.value === "" ? null : e.target.value)}
                                        id="">
                                    <option value={''}>Barchasi</option>
                                    {
                                        XodimReducer.usersFiltering?.map(item => <option
                                            value={item.id}>{item.fio}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        : ''
                }
            </div>

            <div className="rowStyleH2">
                {
                    users.getLoss || users.getLossAdmin ?
                        loading ?
                            lossReducer.lossProduct?.list?.length > 0 ?
                                <div>
                                    <div className="table-responsive table-wrapper-scroll-y"
                                         style={{maxHeight: '300px'}}>
                                        <table className='table table-striped table-bordered mt-4 '>
                                            <thead>
                                            <tr>
                                                <th>T/R</th>
                                                <th>Xodim</th>
                                                <th>Filial</th>
                                                <th>Summa</th>
                                                <th>Sana</th>
                                                <th>Amallar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                lossReducer.lossProduct?.list.map((item, index) => <tr key={item?.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.userFio}</td>
                                                    <td>{item?.branchName}</td>
                                                    <td>{item?.totalPrice} So'm</td>
                                                    <td>{moment(new Date(item?.createdAt)).format('LLLL')}</td>
                                                    <td>
                                                        <button className='korish' onClick={() => getOneById(item.id)}>
                                                            <img
                                                                src={Korish} alt=""/> {t('Buttons.4')}
                                                        </button>
                                                    </td>
                                                    {/*<td>*/}

                                                    {/*</td>*/}
                                                </tr>)
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-3 pagination">
                                        <Box p={2}>
                                            <TablePagination
                                                component="div"
                                                count={lossReducer.lossProduct.totalItem}
                                                onPageChange={changePage}
                                                onRowsPerPageChange={onShowSizeChange}
                                                page={pageData}
                                                rowsPerPage={sizeData}
                                                rowsPerPageOptions={[5, 8, 10]}
                                            />
                                        </Box>
                                    </div>
                                </div> :
                                <div className={'border border-2'}>
                                    <h4 className={'text-center'}>{lossReducer.message || 'NOT FOUND'}</h4>
                                </div> : <Loading/> : ''

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

            </div>

            <Modal isOpen={viewOneLoss} toggle={() => setViewOneLoss(!viewOneLoss)}>
                <ModalHeader>
                    <h4>
                        Ma'lumotlarni korish
                    </h4>
                </ModalHeader>
                <ModalBody>

                    {
                        lossReducer.oneLossProduct ?
                            lossReducer.oneLossProduct.map(item =>
                                <div>
                                    <div>
                                        <div>
                                            <p className={'p-0 m-0'}>Filial: <strong>{item?.branchName}</strong></p>
                                            <p className={'p-0 m-0'}>Xodim: <strong>{item?.userFio}</strong></p>
                                            <p className={'p-0 m-0'}>Yo'qotilgan
                                                Summa: <strong>{item?.totalPrice} so'm</strong></p>
                                        </div>
                                    </div>
                                    <table className={'table table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>Mahsulot</th>
                                            <th>Miqdori</th>
                                            <th>Jami summa</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            item?.lossProductGetDtoList?.map(item =>
                                                <tr>
                                                    <th>{item.productName}</th>
                                                    <th>{item.quantity} {item.measurementName}</th>
                                                    <th>{item.price} so'm</th>
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
                    <button className={'btn btn-danger'} onClick={() => setViewOneLoss(!viewOneLoss)}>Chiqish</button>
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
