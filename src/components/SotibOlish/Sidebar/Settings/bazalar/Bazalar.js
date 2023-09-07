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
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation()


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
                    <h2>{t('Sidebar.41')}</h2>
                    <p> {t('set.1')}</p>
                </div>
                <div className="rowStyleBaza">
                    <div className="qoshish">
                        <h5>{t('set.2')}</h5>
                        {
                            users.addBranch && <button onClick={toggle} className='btn btn-primary'>{t('set.3')}</button>
                        }
                    </div>

                    {
                        users.getBranch ?
                        loading ?
                            branchreducer.branch.length > 0 ?
                                <div>
                                    <div className="izlashBaza">
                                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text"
                                               placeholder={t('set.4')}/>
                                    </div>
                                    <div className="table-responsive">
                                        <table className='table table-striped table-bordered mt-4'>
                                            <thead>
                                            <tr>
                                                <th>{t('set.5')}</th>
                                                {/*<th>Hudud</th>*/}
                                                <th>{t('set.6')}</th>
                                                <th>{t('as.6')}</th>
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
                                                                        src={Edit} alt=""/>{t('Roles.42')}
                                                                    </button>
                                                                }
                                                                {
                                                                    users.deleteBranch &&
                                                                    <button className='ochirish'
                                                                            onClick={() => deleteBranchById(item.id)}>
                                                                        <img src={Delete} alt=""/>{t('set.7')}
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
                                editID ? (t('mah.24')) : (t('as.96'))
                            }
                        </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-md-12 d-flex flex-wrap p-0">
                                    <div className="col-md-6">
                                        <label htmlFor={'nomi'}>{t('as.4')}</label>
                                        <input {...register('name', {required: true})}
                                               placeholder={errors.name ? errors.name.type === 'required' && (t('set.8')) : (t('set.9'))}
                                               type="text" className={'form-control mb-3'} id={'nomi'}/>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button type={'button'} className={'btn btn-danger'} onClick={toggle}>{t('set.10')}
                            </button>
                            <button type={'submit'} className={'btn btn-success'}>{t('set.11')}</button>

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
