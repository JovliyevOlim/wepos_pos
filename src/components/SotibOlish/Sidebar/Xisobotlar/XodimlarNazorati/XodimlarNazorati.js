import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import XodimReducer, {getUserForFiltering, getUserForFilteringBusiness} from "../../Hodimlar/reducer/XodimReducer";
import {IconButton, TablePagination} from "@mui/material";
import UserHistoryReducer,{getUserHistoryByBranch,getUserHistoryByBusiness} from "../reducer/UserHistoryReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt from "../../../../Components/SelectAnt";
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


    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setPage(0)
        setSize(parseInt(event.target.value));
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
        setTimeout(() => {
            setLoading(true)
        }, 200)
    }, [UserHistoryReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])




    return (
        <div>
            <div className="col-md-12 mb-5">
                <MainHeaderText text={'Hodimlar Nazorati'}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex flex-wrap">
                    <div className="col-md-3">
                        <SelectAnt selectList={users?.branches} permission={users.getInfoAdmin} name={'Filiallar'} onChange={(e) => setMainBranchId(e === '' ? null : e)}/>
                    </div>
                    <div className="col-md-3">
                        <SelectAnt selectList={XodimReducer.usersFiltering?.map((item) => ({
                            id: item.id,
                            name: item.fio
                        }))} permission={true}
                                   name={'Hodimlar'} onChange={(e) => setUserId(e === '' ? null : e)}/>
                    </div>
                    <div className="col-md-3">
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
            <div className="rowStyleXH2">
                <div>
                    {loading ?
                       UserHistoryReducer.userHistory?.list?.length > 0 ?
                            <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                <table className='table table-hover table-primary table-striped table-bordered mt-4 '>
                                    <thead>
                                    <tr>
                                        <th>T/R</th>
                                        <th>Xodim</th>
                                        <th>Filial</th>
                                        <th>Qilgan Ishi</th>
                                        <th>Summasi</th>
                                        <th>Sana</th>
                                        <th>Ish tavsifi</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                       UserHistoryReducer.userHistory?.list?.map((item, index) =>
                                            <tr key={item.id}>
                                                <td>{index + 1 + (page * size)}</td>
                                                <td>{item?.userFio}</td>
                                                <td>{item?.branchName}</td>
                                                <td>{item?.name}</td>
                                                <td>
                                                    {
                                                        item?.oldSum !== 0 && (
                                                            <del>{item?.oldSum} so'm</del>
                                                        )
                                                    }
                                                    <p>{item?.sum} so'm</p>
                                                </td>
                                                <td>{moment(new Date(item?.createdAt)).format('LLLL')}</td>
                                                <td>{item?.description}</td>
                                            </tr>)
                                    }
                                    </tbody>
                                </table>
                                <TablePagination
                                    component="div"
                                    count={UserHistoryReducer.userHistory?.totalItem}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleLimitChange}
                                    page={page}
                                    rowsPerPageOptions={[5, 10, 15]}
                                    rowsPerPage={size}
                                />
                            </div> : <div>
                                <h4 className={'text-center'}>{UserHistoryReducer.message}</h4>
                            </div> :
                        <Loading/>
                    }


                </div>
            </div>
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
