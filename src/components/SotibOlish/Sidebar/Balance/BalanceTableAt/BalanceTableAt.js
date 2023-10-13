import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {camelize} from "../../../../../util";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import {Typography} from 'antd';
import balanceReducer, {
    getBalanceByBranch,
    getBalanceByBusiness,
    changeBalance
} from "../../../../../reducer/balanceReducer";
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt, {ButtonAnt, TableButton} from "../../../../Components/SelectAnt";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import './BalanceTableAt.css'
import CommonTable from "../../../../Components/CommonTable";
const {Title} = Typography;

function BalanceTableAt({users, balanceReducer, getBalanceByBranch, getBalanceByBusiness, changeBalance}) {
    const {t} = useTranslation()


    const [mainBranchId, setMainBranchId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [btnValues, setBtnValues] = useState(false)
    const [balanceId, setBalanceId] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [sum, setSum] = useState(0)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: 20,
        },
        {
            title: t('bal.8'),
            width: 80,
            dataIndex: 'paymentMethodName',
            key: 'paymentMethodName',
            render:(item)=><p className={'m-0'}>{camelize(item)}</p>
        },
        {
            title: t('bal.15'),
            width: 100,
            dataIndex: 'sum',
            key: 'sum',
            render:(item)=><p className={'m-0'}>{item.toFixed(2)} {t('bal.16')}</p>
        },
        {
            title: t('bal.27'),
            key: 'operation',
            width: 200,
            render: (item, values) => <div className={'d-flex justify-content-start gap-1 flex-wrap'}>
                <ButtonAnt danger={true}  type={'primary'} text={t('button.getMoneyBalance')} onClick={() => changeBalanceOpen(false, values?.id)}/>
                <ButtonAnt danger={false}  type={'primary'} text={t('button.setMoneyBalance')} onClick={() => changeBalanceOpen(true, values?.id)}/>
            </div>,

        },
    ];



    useEffect(() => {
        setLoading(false)
        if (users.getBalanceAdmin && !mainBranchId) {
            getBalanceByBusiness(users.businessId)
        } else if (users.getBalance) {
            getBalanceByBranch(mainBranchId ? mainBranchId : users.branchId)
        }
    }, [mainBranchId, balanceReducer.current])


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


    function saveBalanceChange() {
        changeBalance({
            sum, balanceId, plus: btnValues,
        })
    }

    function changeBalanceOpen(e, id) {
        console.log(e)
        setBtnValues(e)
        setBalanceId(id)
        setOpenModal(true)
    }

    useEffect(() => {
        if (balanceReducer.saveBoolean) {
            setLoading(false)
            toggle()
        }
    }, [balanceReducer.current])

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
            <MainHeaderText text={t('sidebar.balance')}/>
            <CardBody>
                <div className="col-md-12 d-flex flex-wrap justify-content-between align-items-center">
                    <div className="col-md-3">
                        <SelectAnt name={t('select.branches')}
                                   onChange={(e) => setMainBranchId(e === "" ? null : e)}
                                   selectList={users.branches} permission={users.getBalanceAdmin}/>
                    </div>
                </div>
            </CardBody>

            <div className={'d-flex col-md-12 flex-wrap'}>
                {
                    users.getBalance ?
                        loading ?
                            balanceReducer.balance?.length > 0 ?
                                balanceReducer.balance?.map(item =>
                                    <div className="table-responsive col-lg-12 mb-2 p-2  table-wrapper-scroll-y">
                                        <CardBody>
                                            <h4 className={'balanceFilial'}>{t('bal.14')} {item[0].branchName}</h4>
                                            <h4 className={'balanceFilial'}>Jami summa : {totalSum(item).toFixed(2)} so'm</h4>
                                            <CommonTable data={item} columns={columns} size={item?.length} page={0} pagination={false}/>
                                        </CardBody>
                                    </div>
                                )
                                : <div>
                                    <h4 className={'text-center'}>{balanceReducer.message}</h4>
                                </div> :
                            <Loading/> : ''
                }


            </div>
            <Modal isOpen={openModal} toggle={() => setOpenModal(!openModal)}>
                <ModalHeader>
                    <h4>{btnValues  ? 'Kassaga pul qo\'yish' : 'Kassadan pul olish'}</h4>
                </ModalHeader>
                <ModalBody>
                    <label htmlFor="sum">Miqdorni kiriting</label>
                    <input value={sum} onChange={(e) => setSum(e.target.value)} type="number" className={'form-control'}
                           defaultValue={0} id={'sum'}/>
                </ModalBody>
                <ModalFooter>
                    <button onClick={toggle} className={'btn btn-danger'}>Chiqish</button>
                    <button onClick={saveBalanceChange} className={'btn btn-primary'}>Saqlash</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default connect((users, balanceReducer), {
    getBalanceByBranch,
    getBalanceByBusiness,
    changeBalance
})(BalanceTableAt)
