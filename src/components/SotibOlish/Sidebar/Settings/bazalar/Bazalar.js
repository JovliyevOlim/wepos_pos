import Edit from '../../../../../img/Edit.png'
import Delete from '../../../../../img/Delete.png'
import './bazalar.css'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import branchreducer, {getbranch, savebranch, editbranch, deletebranch} from "../../../../../reducer/branchreducer";
import users, {getSelfInfo} from "../../../../../reducer/users";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import formatDate from "../../../../../util";
import AgreeModal from "../../../../AgreeModal";
import {useTranslation} from "react-i18next";
import MainHeaderText from "../../../../Components/MainHeaderText";
import {ButtonAnt} from "../../../../Components/SelectAnt";
import CardBody from "../../../../Components/CardBody";
import CommonTable from "../../../../Components/CommonTable";
import moment from "moment";
import 'moment/locale/uz-latn'
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

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
    const columns = [
        {
            title: t('set.5'),
            dataIndex: 'name',
            key: 'name',
            width: '50px'
        },
        {
            title: t('set.6'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '50px',
            render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-start gap-1 flex-wrap'}>
                {
                    users.editOutlay &&
                    <ButtonAnt text={t('ol.78')} type={'primary'} onClick={() => {
                        editBranchById(values.id)
                    }
                    } icon={<EditOutlined/>}/>
                }
                {
                    users.deleteOutlay && <ButtonAnt text={t('ol.79')} danger={true} type={'primary'} onClick={() => {
                        deleteBranchById(values.id)
                    }
                    } icon={<DeleteOutlined/>}/>
                }

            </div>,
        },
    ];


    function toggle() {
        setActive(!active)
        setEditID(null)
        reset('')
    }

    function editBranchById(id) {
        toggle()
        setEditID(id)
        branchreducer.branch.map(item => {
            if (item.id === id) {
                setValue('name', item.name)
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
            id: editID,
            name: data.name,
        })
    }


    useEffect(() => {
        if (users.getBranch) {
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
            setLoading(true)
    }, [branchreducer.getBranchBool])

    return (
        <div>
            <div className={'d-flex col-md-12 mb-5 align-items-center justify-content-between'}>
                <MainHeaderText text={'Filiallar'}/>
                {
                    users.addBranch ?
                        <ButtonAnt text={t('ol.2')} type={'primary'} onClick={toggle}/>
                        : ''
                }
            </div>
            {
                users.getBranch ?
                    <CardBody>
                        <Loading spinning={loading}>
                            {
                                branchreducer.branch.length > 0 ?
                                    <div>
                                        <div className="table-responsive">
                                            <CommonTable pagination={false} data={branchreducer.branch.filter(val => {
                                                if (search === '') {
                                                    return val
                                                } else if (val.name.toUpperCase().includes(search.toUpperCase())) {
                                                    return val
                                                }
                                            })} columns={columns}/>
                                        </div>
                                    </div> : branchreducer.getMessage
                            }
                        </Loading>
                    </CardBody>
                    : ''
            }
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
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deletemodal={deletemodal} deleteFunc={deleteFunc}
                        deleteModaltoggle={() => setdeletemodal(prevState => !prevState)}/>
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
