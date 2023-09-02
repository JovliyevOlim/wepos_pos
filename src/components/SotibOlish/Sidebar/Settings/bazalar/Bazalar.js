import Edit from '../../../../../img/Edit.png'
import Delete from '../../../../../img/Delete.png'
import './bazalar.css'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {useForm} from "react-hook-form";
import {useEffect, useState} from 'react'
import {connect} from "react-redux";
import branchreducer, {getbranch, savebranch, editbranch, deletebranch} from "../../../../../reducer/branchreducer";
import users,{getSelfInfo} from "../../../../../reducer/users";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import formatDate from "../../../../../util";
import AgreeModal from "../../../../AgreeModal";

function Bazalar({
                     branchreducer,
                     getbranch,
                     users,
                     savebranch,
                     editbranch,
                     deletebranch,
                     getSelfInfo
                 }) {

    const [active, setActive] = useState(false)
    const [saveModal, setSaveModal] = useState(false)
    const [search, setSearch] = useState('')
    const {register, reset, setValue, handleSubmit, formState: {errors}, resetField} = useForm();
    const [editID, setEditID] = useState(null)
    const [loading, setLoading] = useState(false)


    function toggle() {
        setActive(!active)
        setEditID(null)
        reset('')
    }

    function editBranchById(id) {
        toggle()
        setEditID(id)
        branchreducer.branch.map(item =>{
            if(item.id === id){
                setValue('name',item.name)
            }
        })
    }

    function saveBranchToDB(data) {
        savebranch({
            businessId: users.businessId,
            name: data.name,
        })
    }

    function editBranchToDB(data) {
        editbranch({
            businessId: users.businessId,
            id:editID,
            name: data.name,
        })
    }


    useEffect(() => {
        if (users.getBranch){
            getbranch(users.businessId)
        }
    }, [branchreducer.current])



    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState('')


    function deleteBranchById(id) {
        setdeletemodal(!deletemodal)
        setdeletID(id)
    }

    function deleteFunc() {
        deletebranch(deleteID)
        setSaveModal(true)
    }


    function onSubmit(data) {
        if (editID) {
           editBranchToDB(data)
        } else {
            saveBranchToDB(data)
        }
        setSaveModal(true)
    }

    useEffect(() => {
        if (branchreducer.saveBranchBool) {
            setActive(false)
            setdeletemodal(false)
            setdeletID('')
            setLoading(false)
            getSelfInfo(users.id)
        }
        setTimeout(() => {
            setSaveModal(false)
        }, 500)

    }, [branchreducer.current])



    useEffect(() => {
        setLoading(false)
    }, [])


    useEffect(() => {
        setTimeout(()=>{
            setLoading(true)
        },500)
    }, [branchreducer.getBranchBool])

    return (
        <div>
            <div className="col-md-12 mt-4 mb-4">
                <div className="textHeaderBaza">
                    <h2>Bazalar</h2>
                    <p> boshqaruvi</p>
                </div>
                <div className="rowStyleBaza">
                    <div className="qoshish">
                        <h5>Sizning bazalaringiz</h5>
                        {
                            users.addBranch && <button onClick={toggle} className='btn btn-primary'>+Qo'shish</button>
                        }
                    </div>

                    {
                        users.getBranch ?
                        loading ?
                            branchreducer.branch.length > 0 ?
                                <div>
                                    <div className="izlashBaza">
                                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text"
                                               placeholder='Izlash...'/>
                                    </div>
                                    <div className="table-responsive">
                                        <table className='table table-striped table-bordered mt-4'>
                                            <thead>
                                            <tr>
                                                <th>Nomi</th>
                                                {/*<th>Hudud</th>*/}
                                                <th>Yaratilgan vaqti</th>
                                                <th>Amallar</th>
                                            </tr>
                                            </thead>

                                            <tbody>

                                            {
                                                branchreducer.branch.filter(val => {
                                                    if (search === '') {
                                                        return val
                                                    } else if (val.name.toUpperCase().includes(search.toUpperCase())) {
                                                        return val
                                                    }
                                                })
                                                    .map(item =>
                                                        <tr>
                                                            <td>{item.name}</td>
                                                            {/*<td></td>*/}
                                                            <td>{formatDate(item?.createdAt)}</td>
                                                            <td>
                                                                {
                                                                    users.editBranch &&
                                                                    <button
                                                                        onClick={() => editBranchById(item.id)}
                                                                        className='taxrirlash'><img
                                                                        src={Edit} alt=""/>Taxrirlash
                                                                    </button>
                                                                }
                                                                {
                                                                    users.deleteBranch &&
                                                                    <button className='ochirish'
                                                                            onClick={() => deleteBranchById(item.id)}>
                                                                        <img src={Delete} alt=""/>Bazani
                                                                        o'chirish
                                                                    </button>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div> : branchreducer.getMessage
                            : <Loading/> : ''
                    }
                </div>
            </div>
            <div className="col-md-12">
                <Modal isOpen={active} toggle={toggle}>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>
                            {
                                editID ? 'Taxrirlash' : "Qo'shish"
                            }
                        </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-md-12 d-flex flex-wrap p-0">
                                    <div className="col-md-6">
                                        <label htmlFor={'nomi'}>Nomi</label>
                                        <input {...register('name', {required: true})}
                                               placeholder={errors.name ? errors.name.type === 'required' && 'Filial nomini kiriting' : 'Filial nomi'}
                                               type="text" className={'form-control mb-3'} id={'nomi'}/>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button type={'button'} className={'btn btn-danger'} onClick={toggle}>Chiqish
                            </button>
                            <button type={'submit'} className={'btn btn-success'}>Saqlash</button>

                        </ModalFooter>
                    </form>
                </Modal>
            </div>
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deletemodal={deletemodal} deleteFunc={deleteFunc} deleteModaltoggle={()=>setdeletemodal(prevState => !prevState)}/>
        </div>
    )
}

export default connect((branchreducer, users), {
    getbranch,
    savebranch,
    editbranch,
    deletebranch,
    getSelfInfo
})(Bazalar)
