import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import XodimReducer, {getUserForFiltering, getUserForFilteringBusiness} from "../../Hodimlar/reducer/XodimReducer";
import {IconButton, TablePagination} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import MaxsulotxisobotReducer,{getLossProductByBusiness,getLossProductByBranch} from "../reducer/MaxsulotxisobotReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt, {SearchAnt} from "../../../../Components/SelectAnt";
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


    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setPage(0)
        setSize(parseInt(event.target.value));
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
                name: e.target.value
            })
        }
    }

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
        setTimeout(() => {
            setLoading(true)
        }, 200)
    }, [MaxsulotxisobotReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])


    return (
        <div>
            <div className="col-md-12 mb-5">
                <MainHeaderText text={'Yo\'qotilgan maxsulotlar'}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex justify-content-start flex-wrap">
                    <div className="col-md-3">
                        <SelectAnt name={'Filiallar'} selectList={users.branches} permission={users.branches} onChange={(e) => setMainBranchId(e === "" ? null : e)}/>
                    </div>
                    <div className="col-md-3">
                        <SelectAnt name={'Hodimlar'} selectList={XodimReducer.usersFiltering?.map((item) => ({
                            id: item.id,
                            name: item.fio
                        }))} permission={true}
                                   onChange={(e) => setUserId(e === "" ? null : e)}/>
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
            </CardBody>
            <div className="rowStyleXH2">
                <div>
                    {loading ?
                       MaxsulotxisobotReducer.lossProducts?.list?.length > 0 ?
                            <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                <table className='table table-hover table-primary table-striped table-bordered mt-4 '>
                                    <thead>
                                    <tr>
                                        <th>T/R</th>
                                        <th>Maxsulotlar</th>
                                        <th>Filial</th>
                                        <th>Xodim</th>
                                        <th>Miqdori</th>
                                        <th>Zarar summasi</th>
                                        <th>Sana</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                       MaxsulotxisobotReducer.lossProducts?.list?.map((item, index) =>
                                            <tr key={item.id}>
                                                <td>{index + 1 + (page * size)}</td>
                                                <td>{item?.productName}</td>
                                                <td>{item?.branchName}</td>
                                                <td>{item?.userFio}</td>
                                                <td>{item?.quantity} {item?.measurementName}</td>
                                                <td>{item?.price} so'm</td>
                                                <td>{moment(new Date(item?.createdAt)).format('LLLL')}</td>
                                            </tr>)
                                    }
                                    </tbody>
                                </table>
                                <TablePagination
                                    component="div"
                                    count={MaxsulotxisobotReducer.lossProducts?.totalItem}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleLimitChange}
                                    page={page}
                                    rowsPerPageOptions={[5, 10, 15]}
                                    rowsPerPage={size}
                                />
                            </div> : <div>
                                <h4 className={'text-center'}>{MaxsulotxisobotReducer.message}</h4>
                            </div> :
                        <Loading/>
                    }
                </div>
            </div>
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
