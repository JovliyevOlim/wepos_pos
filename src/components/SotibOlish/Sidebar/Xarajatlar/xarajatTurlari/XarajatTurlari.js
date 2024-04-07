import {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

import users from "../../../../../reducer/users";
import XarajatTurlariReducer, {
    deleteXarajatlarTurlari,
    editXarajatlarTurlari,
    getXarajatlarTurlari,
    saveXarajatlarTurlari,
} from "../reducer/XarajatTurlariReducer";
import branchreducer, {getbranch} from "../../../../../reducer/branchreducer";
import XarajatlarReducer, {editXarajatlar, getXarajatlar, saveXarajatlar,} from "../reducer/XarajatlarReducer";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import CommonTable from "../../../../Components/CommonTable";
import {AddButton, DeleteButton, EditButton} from "../../../../Components/Buttons";

import './xarajatTurlari.css'

function XarajatTurlari({
                            getXarajatlarTurlari,
                            XarajatTurlariReducer,
                            editXarajatlarTurlari,
                            users,
                            saveXarajatlarTurlari,
                            deleteXarajatlarTurlari
                        }) {
    const {t} = useTranslation()
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(false)
    const [editId, setEditId] = useState(null)
    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState(null)
    const [saveModal, setSaveModal] = useState(false)

    const columns = [
        {
            title: 'Id',
            key:'index',
            dataIndex: 'index',
            width: '2%',
        },
        {
            title: 'Nomi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('ol.20'),
            dataIndex: 'name',
            key: 'name',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-center gap-2 flex-wrap'}>
                {
                    users.editOutlay && <EditButton onClick={() => {edit(values.id)}}/>
                }
                {
                    users.deleteOutlay  && <DeleteButton onClick={() => {deleteOutlayCategoryById(values.id)}}/>
                }
            </div>,
        },
    ];

    function toggle() {
        setActive(!active)
        setName('')
        setEditId(null)
    }

    function edit(id) {
        setActive(true)
        setEditId(id)
        let a = XarajatTurlariReducer.xarajatturlari.filter(item => item.id === id)
        setName(a[0].name)
    }

    function saqla() {
        if (editId) {
            editXarajatlarTurlari({
                name,
                businessId: users.businessId,
                id: editId
            })
        } else {
            saveXarajatlarTurlari(
                {
                    name,
                    businessId: users.businessId
                }
            )
        }
        setSaveModal(true)
    }

    function deleteFunc() {
        deleteXarajatlarTurlari(deleteID)
    }

    function deleteOutlayCategoryById(item) {
        setdeletemodal(true)
        setdeletID(item)
    }

    useEffect(() => {
        if (XarajatTurlariReducer.saveBoolean) {
            setName('')
            setEditId(null)
            setActive(false)
            setLoading(false)
            setdeletemodal(false)
            setdeletID(null)
        }
        setSaveModal(false)
    }, [XarajatTurlariReducer.current])

    useEffect(() => {
        getXarajatlarTurlari(users.businessId)
    }, [XarajatTurlariReducer.current])

    useEffect(() => {
            setLoading(true)
    }, [XarajatTurlariReducer.getOutlayBool])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div>
            <div className={'d-flex col-md-12 mb-5 align-items-center justify-content-between'}>
                <MainHeaderText text={t('sidebar.outlayCategory')}/>
                {
                    users.addOutlay ? <AddButton onClick={toggle} text={t('button.add')} />
                    : null
                }
            </div>
            <CardBody>
                <Loading spinning={loading}>
                    {
                            XarajatTurlariReducer.xarajatturlari?.length>0 ?
                                <div className="table-responsive table-wrapper-scroll-y  mb-4">
                                    <CommonTable
                                        data={XarajatTurlariReducer.xarajatturlari}
                                        columns={columns}
                                        pagination={false}
                                        page={0}
                                        size={XarajatTurlariReducer.xarajatturlari.length}
                                    />
                                </div>
                                : <div>
                                    <h4 className={'text-center'}>{XarajatTurlariReducer.message}</h4>
                                </div>
                    }
                </Loading>
            </CardBody>
            <Modal isOpen={active} toggle={toggle}>
                <ModalHeader>
                    {t('Sections.8')}
                </ModalHeader>
                <ModalBody>
                    <label htmlFor={'nomi'}>{t('Expenses.11')}</label>
                    <input type="text" value={name} placeholder={'Nomi'} onChange={(e) => setName(e.target.value)}
                           className={'form-control'} id={'nomi'}/>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-danger'} onClick={toggle}>{t('Buttons.7')}</button>
                    <button className={'btn btn-success'} onClick={saqla}>{t('Buttons.6')}</button>
                </ModalFooter>
            </Modal>
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deleteModaltoggle={() => setdeletemodal(prevState => !prevState)} deleteFunc={deleteFunc}
                        deletemodal={deletemodal}/>
        </div>
    )
}

export default connect((XarajatTurlariReducer, branchreducer, users, branchreducer, XarajatlarReducer), {
    editXarajatlar,
    getXarajatlar,
    getXarajatlarTurlari,
    saveXarajatlarTurlari,
    editXarajatlarTurlari,
    deleteXarajatlarTurlari,
    getbranch,
    saveXarajatlar
})(XarajatTurlari)
