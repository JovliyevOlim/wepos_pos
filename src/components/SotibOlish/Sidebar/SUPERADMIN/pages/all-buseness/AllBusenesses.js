import React, {useEffect, useState} from 'react'
import './allbusenesses.css'
import Excel from '../../../../../../img/Excel.png'
import Edit from '../../../../../../img/Edit.png'
import Delete from '../../../../../../img/Delete.png'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import allbusinessreducer, {
    deleteBusiness,
    editBusiness,
    getAllBusiness,
    getOneBusiness,
    saveBusiness,
    changeBusinessActive
} from "../../reducers/allbusinessreducer";
import users from "../../../../../../reducer/users";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {TablePagination} from "@mui/material";
import AgreeModal from "../../../../../AgreeModal";


function AllBusenesses({
                           allbusinessreducer,
                           users,
                           deleteBusiness,
                           editBusiness,
                           getOneBusiness,
                           getAllBusiness,
                           changeBusinessActive
                       }) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        getAllBusiness({
            page: page,
            size: rowsPerPage
        })
    }, [allbusinessreducer.current, page, rowsPerPage])

    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const [active, setActive] = useState(false)

    function toggle() {
        setActive(!active)
    }

    const [isActive, setIsActive] = useState(false)

    const [eslatma, setEslatma] = useState('')
    const [name, setName] = useState('')
    const [editID, setEditId] = useState('')

    function edit(id, name, active, description) {
        getOneBusiness(id)
        toggle()
        if (isActive === "true") {
            setActive(true)
        } else {
            setIsActive(false)
        }
        console.log(id)

        setIsActive(active)
        setEditId(id)
        setName(name)
        setEslatma(description)

    }

    function save() {
        editBusiness({
            active: isActive,
            delete: false,
            description: eslatma,
            name,
            id: editID
        })

        toggle()
    }

    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState('')

    function deleteBusinessById(item) {
        setdeletemodal(true)
        setdeletID(item)
    }

    function deleteFunc() {
        deleteBusiness(deleteID)
        setdeletemodal(false)
    }


    return (
        <div className="mt-2">
            <div className="rowStyleSuperAdmin">
                <div className="headerTextBox">
                    <h4 className='me-2'>All Businesses </h4>
                    <p>Manage all registered Businesses</p>
                </div>
            </div>

            <div className="rowStyleSA2">
                <div className="qoshishBH">
                    <Link to={'/main/superadmin/allbusenesses/addbusiness'}>
                        <button className='btn btn-primary'>+Qo'shish</button>
                    </Link>
                </div>
                <div className="izlashBH">
                    <div>
                        <button style={{width: "100%"}}><img src={Excel} alt=""/> Export Excel</button>
                    </div>
                    <div className="izlashBox2">
                        <input type="text" placeholder='Izlash...'/>
                    </div>
                </div>
                {
                    allbusinessreducer.business ?
                        <div className="table-responsive  table-wrapper-scroll-y my-custom-scrollbar">
                            <table className='table  table-striped table-bordered mt-4'>
                                <thead>
                                <tr>
                                    <th>T/R</th>
                                    <th>Business Name</th>
                                    <th>Biznes Egasi</th>
                                    <th>Telefon raqam</th>
                                    <th>Eslatma</th>
                                    <th>Active</th>
                                    <th>Amallar</th>
                                </tr>
                                </thead>

                                <tbody>
                                {allbusinessreducer.business?.aboutDtoList.map((item, index) => <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div>
                                            <p className={'p-0 m-0'}>{item.userShortDto?.fio}</p>
                                        </div>
                                    </td>
                                    <td>{item.userShortDto?.phoneNumber}</td>
                                    <td>{item.description}</td>
                                    <td>{item.active === true ?
                                        <button onClick={()=>changeBusinessActive(item.id)} className={'bluebtn p-1'}>Active holatda</button>
                                        : <button onClick={()=>changeBusinessActive(item.id)} className={'redbtn p-1'}>Active qilish</button>
                                    }</td>
                                    <td>
                                        <Link to={'/main/superadmin/allbusenesses/addbusiness/' + item.id}>
                                            <button
                                                onClick={() => edit(item.id, item.name, item.active, item.description)}
                                                className={'spbtn'}><img src={Edit}/> Tahrirlash
                                            </button>
                                        </Link>
                                        <button onClick={() => deleteBusinessById(item.id)} className={'spbtn '}><img
                                            src={Delete}/> O'chirish
                                        </button>
                                    </td>
                                </tr>)}
                                </tbody>
                            </table>
                            <TablePagination
                                component="div"
                                count={allbusinessreducer.business?.totalItem}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOptions={[10, 20, 50]}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            /></div> : ''
                }


                <AgreeModal deletemodal={deletemodal} deleteFunc={deleteFunc}
                            deleteModaltoggle={() => setdeletemodal(!deletemodal)}/>

                <Modal isOpen={active} toggle={toggle}>
                    <ModalHeader>
                        <h3>TahRirLash</h3>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row mt-2">
                            <div className="col-md-6  col-sm-12 mb-4">
                                <h6>isActive</h6>
                                {/*<input  type="text" className='form-control'/>*/}
                                <select className={'form-control'} value={isActive}
                                        onChange={(e) => setIsActive(e.target.value)}>
                                    <option value="true">Faol</option>
                                    <option value="false">Faol emas</option>
                                </select>
                            </div>
                            <div className="col-md-6 col-sm-12 mb-4">
                                <h6>Qisqa eslatma</h6>
                                <input type="text" value={eslatma} onChange={(e) => setEslatma(e.target.value)}
                                       className='form-control'/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label htmlFor="">Ismi</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text"
                                       className={'form-control'}/>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={save} className={'btn btn-outline-primary'}>SaqLash</button>
                        <button onClick={toggle} className={'btn btn-primary'}>Chiqish</button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}

export default connect((allbusinessreducer, users), {
    getOneBusiness,
    deleteBusiness,
    getAllBusiness,
    editBusiness,
    saveBusiness,
    changeBusinessActive
})(AllBusenesses)
