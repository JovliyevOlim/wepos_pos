import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {camelize} from "../../../../../util";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import {Typography} from 'antd';
import balanceReducer, {getBalanceByBranch, getBalanceByBusiness} from "../../../../../reducer/balanceReducer";
import MainHeaderText from "../../../../Svg/MainHeaderText";
import CardBody from "../../../../Svg/CardBody";
import SelectAnt from "../../../../Svg/SelectAnt";

const {Title} = Typography;

function BalanceTableAt({users, balanceReducer, getBalanceByBranch, getBalanceByBusiness}) {
    const {t} = useTranslation()


    const [mainBranchId, setMainBranchId] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(false)
        if (users.getBalanceAdmin && !mainBranchId) {
            getBalanceByBusiness(users.businessId)
        } else if (users.getBalance) {
            getBalanceByBranch(mainBranchId ? mainBranchId : users.branchId)
        }
    }, [mainBranchId])


    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 200)
    }, [balanceReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])


    return (
        <div className="balanceTable">
            <MainHeaderText text={'Kassa'}/>
            <CardBody>
                <div className="col-md-12 d-flex flex-wrap justify-content-between align-items-center">
                    <div className="col-md-3">
                        <SelectAnt name={'Filiallar'}
                                   onChange={(e) => setMainBranchId(e === "" ? null : e)}
                                   selectList={users.branches} permission={users.getBalanceAdmin}/>
                    </div>
                </div>
            </CardBody>

            <div>
            </div>
            <div className="rowStyleXH2">
                <div className={'d-flex col-md-12 flex-wrap'}>
                    {
                        users.getBalance ?
                            loading ?
                                balanceReducer.balance?.length > 0 ?
                                    balanceReducer.balance?.map(item =>
                                        <div className="table-responsive col-md-6 mb-4 table-wrapper-scroll-y">
                                            <h4>Filial nomi: {item[0].branchName}</h4>
                                            <table
                                                className='table table-hover table-primary table-striped table-bordered mt-4 '>
                                                <thead>
                                                <tr>
                                                    <th>T/R</th>
                                                    <th>To'lov turi</th>
                                                    <th>Summasi</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    item?.map((val, index) =>
                                                        <tr key={val.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{camelize(val?.paymentMethodName)}</td>
                                                            <td>{val?.sum} so'm</td>
                                                        </tr>)
                                                }
                                                </tbody>
                                            </table>

                                        </div>
                                    )
                                    : <div>
                                        <h4 className={'text-center'}>{balanceReducer.message}</h4>
                                    </div> :
                                <Loading/> : ''
                    }


                </div>
            </div>
        </div>
    )
}

export default connect((users, balanceReducer), {getBalanceByBranch, getBalanceByBusiness})(BalanceTableAt)
