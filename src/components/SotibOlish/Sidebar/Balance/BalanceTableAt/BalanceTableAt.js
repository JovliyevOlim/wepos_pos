import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {camelize} from "../../../../../util";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import {Typography} from 'antd';
import balanceReducer, {getBalanceByBranch, getBalanceByBusiness,changeBalance} from "../../../../../reducer/balanceReducer";
import MainHeaderText from "../../../../Svg/MainHeaderText";
import CardBody from "../../../../Svg/CardBody";
import SelectAnt from "../../../../Svg/SelectAnt";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const {Title} = Typography;

function BalanceTableAt({users, balanceReducer, getBalanceByBranch, getBalanceByBusiness,changeBalance}) {
    const {t} = useTranslation()


    const [mainBranchId, setMainBranchId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [btnValues, setBtnValues] = useState(false)
    const [balanceId, setBalanceId] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [sum,setSum] = useState(0)


    useEffect(() => {
        setLoading(false)
        if (users.getBalanceAdmin && !mainBranchId) {
            getBalanceByBusiness(users.businessId)
        } else if (users.getBalance) {
            getBalanceByBranch(mainBranchId ? mainBranchId : users.branchId)
        }
    }, [mainBranchId,balanceReducer.current])


    function toggle() {
        setOpenModal(false)
        setBalanceId(null)
        setSum(0)
    }

    function totalSum(item) {
        let sum = 0
        item.map(val => {
            sum += val.sum
        })
        return sum
    }


    function saveBalanceChange(){
            changeBalance({
                sum,balanceId,plus:btnValues == 'true' ? true : false,
            })
    }
    function changeBalanceOpen(e, id) {
        setBtnValues(e.target.value)
        setBalanceId(id)
        setOpenModal(true)
    }

    useEffect(()=>{
        if (balanceReducer.saveBoolean){
            setLoading(false)
            toggle()
        }
    },[balanceReducer.current])

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
            <MainHeaderText text={t('bal.12')}/>
            <CardBody>
                <div className="col-md-12 d-flex flex-wrap justify-content-between align-items-center">
                    <div className="col-md-3">
                        <SelectAnt name={t('bal.13')}
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
                                            <h4>{t('bal.14')} {item[0].branchName}</h4>
                                            <h4>Jami summa : {totalSum(item)} so'm</h4>
                                            <table
                                                className='table table-hover table-primary table-striped table-bordered mt-4 '>
                                                <thead>
                                                <tr>
                                                    <th>T/R</th>
                                                    <th>{t('bal.8')}</th>
                                                    <th>{t('bal.15')}</th>
                                                    <th>Amallar</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    item?.map((val, index) =>
                                                        <tr key={val.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{camelize(val?.paymentMethodName)}</td>
                                                            <td>{val?.sum} {t('bal.16')}</td>
                                                            <td>
                                                                <div>
                                                                    <button onClick={(e) => changeBalanceOpen(e, val?.id)}
                                                                            value={false}
                                                                            className={'btn btn-danger'}>Kassadan pul
                                                                        olish
                                                                    </button>
                                                                    <button onClick={(e) => changeBalanceOpen(e, val?.id)}
                                                                            value={true}
                                                                            className={'btn btn-primary'}>Kassaga pul
                                                                        qo'yish
                                                                    </button>
                                                                </div>
                                                            </td>
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
            <Modal isOpen={openModal} toggle={() => setOpenModal(!openModal)}>
                <ModalHeader>
                    <h4>{btnValues === 'true' ? 'Kassaga pul qo\'yish' : 'Kassadan pul olish'}</h4>
                </ModalHeader>
                <ModalBody>
                    <label htmlFor="sum">Miqdorni kiriting</label>
                    <input value={sum} onChange={(e)=>setSum(e.target.value)} type="number" className={'form-control'} defaultValue={0} id={'sum'}/>
                </ModalBody>
                <ModalFooter>
                    <button onClick={toggle} className={'btn btn-danger'}>Chiqish</button>
                    <button onClick={saveBalanceChange} className={'btn btn-primary'}>Saqlash</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default connect((users, balanceReducer), {getBalanceByBranch, getBalanceByBusiness,changeBalance})(BalanceTableAt)
