import React, {useEffect, useState} from 'react'
import './packagesubscription.css'
import '../all-buseness/allbusenesses.css'
import Excel from '../../../../../../img/Excel.png'
import Edit from '../../../../../../img/Edit.png'
import {connect} from "react-redux";
import users from "../../../../../../reducer/users";
import subscripreducer, {
    editSubscrip,
    getAllSubscrip,
    saveSubscrip
} from "../../reducers/subscripreducer";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import tariffReducer, {getTariffChoose} from "../../../../../../reducer/tariffReducer";
import formatDate from "../../../../../../util";
import {TablePagination} from "@mui/material";
import AgreeModal from "../../../../../AgreeModal";

function PackageSubscripton({
                                subscripreducer,
                                tariffReducer,
                                getTariffChoose,
                                editSubscrip,
                                saveSubscrip,
                                getAllSubscrip
                            }) {

    const [active, setActive] = useState(false)
    const [changeStatusTariffActive, setChangeStatusTariffActive] = useState(false)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [businessId, setBusinessId] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [tariff, setTariff] = useState('')
    const [agree,setAgree] = useState(false)


    function changeBusinessTariff(id, name,tariffId) {
        setBusinessName(name)
        setBusinessId(id)
        setTariff(tariffId)
        setActive(true)
    }

    function toggle() {
        setActive(!active)
    }

    function toggleEdit() {
        setChangeStatusTariffActive(!changeStatusTariffActive)
    }

    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    useEffect(() => {
        getAllSubscrip({
            page: page,
            size: rowsPerPage
        })
        getTariffChoose()
    }, [subscripreducer.current, page, rowsPerPage])

    const [editSubsId, setEditSubsId] = useState('')
    const [tariffStatus, setTariffStatus] = useState("")

    function edit(id, name, status) {
        setChangeStatusTariffActive(true)
        setEditSubsId(id)
        setBusinessName(name)
        setTariffStatus(status)

    }


    function saqla() {
        editSubscrip({
            params: {
                statusTariff: tariffStatus
            },
            subscriptionId: editSubsId
        })
    }

    function save() {
        saveSubscrip({
            businessId: businessId,
            tariffId: tariff
        })
        setAgree(false)
    }




    useEffect(() => {
        if (subscripreducer.saveSubsBoolean) {
            setActive(false)
            setBusinessId('')
            setBusinessName('')
            setTariff('')
            setTariffStatus('')
            setEditSubsId('')
            setChangeStatusTariffActive(false)
        }
    }, [subscripreducer.current])

    return (

        <div className="rowStylePageS">

            {
                subscripreducer.subscrip?.subscriptionList?.length > 0 ?
                    <>
                        <div className="izlashPageS">
                                <button><img src={Excel} alt=""/> Export Excel</button>
                            <div className="izlashBox2">
                                <input type="text" placeholder='Izlash...'/>
                            </div>
                        </div>
                        <div className="table-responsive table-wrapper-scroll-y ">
                            <table className='table  table-striped table-bordered mt-4'>
                                <thead>
                                <tr>
                                    <th>T/R</th>
                                    <th>Biznes</th>
                                    <th>Biznes balansi</th>
                                    <th>Tariff</th>
                                    <th>Status</th>
                                    <th>Start Date</th>
                                    <th>Tugash vaqti</th>
                                    <th>Narxi</th>
                                    <th>Active</th>
                                    <th>Amallar</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    subscripreducer.subscrip?.subscriptionList.map((item, index) => <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.businessName}</td>
                                        <td>{item.businessBalance}</td>
                                        <td>{item.tariffName}</td>
                                        <td>{item.statusTariff}</td>
                                        <td>{formatDate(item.startDay)}</td>
                                        <td>{formatDate(item.endDay)}</td>
                                        <td>{item.tariffPrice} so'm</td>
                                        <td>{(item.active).toString()}</td>
                                        <td>
                                            <button onClick={() => edit(item.id, item.businessName, item.statusTariff)}
                                                    className={`${item.statusTariff === "WAITING" ? 'spbtn' : item.statusTariff === "REJECTED" ? 'redbtn' : 'bluebtn'} `}>
                                                <img src={Edit} className={'mx-1'}/>STATUS
                                            </button>
                                            <button
                                                onClick={() => changeBusinessTariff(item.businessId, item.businessName,item.tariffId)}
                                                className={'bluebtn'}>
                                                <img src={Edit} className={'mx-1'}/>Tariffni o'zgartirish
                                            </button>
                                        </td>
                                    </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <TablePagination
                            component="div"
                            count={subscripreducer.subscrip?.totalItem}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[10, 20, 50]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </> :
                    <div>
                        <h4 className={'text-center'}>{subscripreducer.message}</h4>
                    </div>

            }

            <Modal isOpen={active} toggle={toggle}>
                <ModalHeader>
                    <h3>Tarifni o'zgartirish</h3>
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-6  col-sm-12 mb-4">
                            <h6>Biznes nomi: </h6>
                            <h4>{businessName}</h4>
                        </div>
                        <div className="col-md-6 col-sm-12 mb-4">
                            <h6>Tariff</h6>
                            <select value={tariff} onChange={(e) => setTariff(e.target.value)} className='form-control'>
                                {
                                    tariffReducer.tariffchoose.map((item, index) => <option
                                        value={item.id} disabled={item.id === tariff}>{item.name} ({item.price} so'm ) </option>)
                                }
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button onClick={toggle} className={'btn btn-danger'}>Chiqish</button>
                    <button onClick={()=>setAgree(true)} className={'btn btn-success'}>Saqlash</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={changeStatusTariffActive} toggle={toggleEdit}>
                <ModalHeader>
                    <h3>Holatni tahrirlash</h3>
                </ModalHeader>
                <ModalBody>
                    <label htmlFor="">STATUS</label>
                    <select className={'form-control'} id="" value={tariffStatus}
                            onChange={(e) => setTariffStatus(e.target.value)}>
                        <option value={'REJECTED'} disabled={tariffStatus === 'REJECTED' ? true : false}>REJECTED
                        </option>
                        <option value={'CONFIRMED'} disabled={tariffStatus === 'CONFIRMED' ? true : false}>CONFIRMED
                        </option>
                    </select>

                </ModalBody>
                <ModalFooter>
                    <button onClick={toggleEdit} className={'btn btn-danger'}>Chiqish</button>
                    <button onClick={saqla} className={'btn btn-success'}>Saqlash</button>

                </ModalFooter>
            </Modal>
            <AgreeModal deleteFunc={save} deleteModaltoggle={()=>setAgree(prevState => !prevState)} deletemodal={agree}/>
        </div>
    )
}

export default connect((tariffReducer, users, subscripreducer), {
    getTariffChoose,
    getAllSubscrip,
    saveSubscrip,
    editSubscrip,
})(PackageSubscripton)
