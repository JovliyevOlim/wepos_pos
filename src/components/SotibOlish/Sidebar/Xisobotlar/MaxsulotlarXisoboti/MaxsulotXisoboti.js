import './maxsulotxisoboti.css'
import React, {useState, useEffect, useRef} from "react";
import {connect} from 'react-redux'
import {useTranslation} from "react-i18next";
import users from "../../../../../reducer/users";
import XodimReducer, {getUserForFilteringBusiness, getUserForFiltering} from "../../Hodimlar/reducer/XodimReducer";
import Loading from "../../../../Loading";
import {IconButton, TablePagination} from "@mui/material";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import MaxsulotxisobotReducer, {
    getProductHistoryByBusiness,
    getProductHistoryByBranch
} from "../reducer/MaxsulotxisobotReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Svg/MainHeaderText";
import CardBody from "../../../../Svg/CardBody";
import SelectAnt, {SearchAnt} from "../../../../Svg/SelectAnt";

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

    function changeSearch(e) {
        setSearch(e.target.value)
        setIsView(true)
        if (e.target.value === ''){
            setIsView(false)
            setProductId(null)
        }
        else{
            getBarcodeAndName({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                name: e.target.value
            })
        }

    }

    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setPage(0)
        setSize(parseInt(event.target.value));
    };

    function selectProduct(id, name) {
        setSearch(name)
        setProductId(id)
        setIsView(false)
    }

    function removeProduct() {
        setSearch('')
        setProductId(null)
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
    }, [page, size, userId, productId,mainBranchId])
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
        setTimeout(() => {
            setLoading(true)
        }, 200)
    }, [MaxsulotxisobotReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div>
            <div  className="col-md-12 d-flex mb-4">
                <MainHeaderText text={'Mahsulotlar xisoboti'}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex row-gap-4 flex-wrap">
                    <div className="col-md-3">
                        <SelectAnt name={'Filiallar'} onChange={(e) => setMainBranchId(e === '' ? null : e)} permission={users.getInfoAdmin}
                        selectList={users?.branches}
                        />
                    </div>
                    <div className="col-md-3">
                        <SelectAnt name={'Xodimlar'} onChange={(e) => setUserId(e === '' ? null : e)} permission={users.getInfoAdmin}
                                   selectList={XodimReducer.usersFiltering?.map((item) => ({
                                       id: item.id,
                                       name: item.fio
                                   }))} permissions={true}
                        />
                    </div>
                    {
                        mainBranchId &&
                        <div className="col-md-6">
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
                <div className="row cont">
                </div>
            </CardBody>



            <div className="rowStyleST2">

                <div className="qoshish mt-4">
                    <h5>{t('Trade.1')}</h5>
                </div>

                {
                    loading ?
                        MaxsulotxisobotReducer.productHistory?.list?.length > 0 ?
                            <div>
                                <div className="table-responsive">
                                    <table className='table table-hover table-primary table-striped table-bordered mt-4 mb-4 '>
                                        <thead>
                                        <tr>

                                            <th>T/R</th>
                                            <th>Mahsulot</th>
                                            <th>Filial</th>
                                            <th>Xodim</th>
                                            <th>Sana</th>
                                            <th>Miqdor</th>
                                            <th>Tavsif</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            MaxsulotxisobotReducer.productHistory?.list?.map((item, index) => <tr
                                                key={item.id}>
                                                <td>{index + (page * size) + 1}</td>
                                                <td>{item?.productName}</td>
                                                <td>{item?.branchName}</td>
                                                <td>{item?.userFio}</td>
                                                <td>{moment(new Date(item?.createdAt)).format('LLLL')}</td>
                                                <td>
                                                    <div>
                                                        {
                                                            item?.oldQuantity !== 0 && (
                                                                <del>{item.oldQuantity} {item?.measurementName}</del>
                                                            )
                                                        }
                                                        <p>{item?.quantity} {item?.measurementName}</p>
                                                    </div>
                                                    </td>
                                                <td>{item?.description}</td>
                                            </tr>)
                                        }
                                        </tbody>
                                    </table>
                                    <TablePagination
                                        component="div"
                                        count={MaxsulotxisobotReducer.productHistory?.totalItem}
                                        onPageChange={handlePageChange}
                                        onRowsPerPageChange={handleLimitChange}
                                        page={page}
                                        rowsPerPageOptions={[5, 10, 15]}
                                        rowsPerPage={size}
                                    />
                                </div>
                            </div> : <div>
                                <h4 className={'text-center'}>{MaxsulotxisobotReducer.message}</h4>
                            </div> : <Loading/>
                }

            </div>
        </div>
    )
}

export default connect((users, XodimReducer, MaxsulotlarRoyxariReducer, MaxsulotxisobotReducer),
    {
        getUserForFilteringBusiness, getUserForFiltering,
        getProductHistoryByBusiness, getProductHistoryByBranch,
        getBarcodeAndName
    })(MaxsulotXisoboti)
