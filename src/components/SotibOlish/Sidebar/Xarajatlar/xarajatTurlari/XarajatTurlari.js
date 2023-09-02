import {Link} from 'react-router-dom'
import Excel from '../../../../../img/Excel.png'
import Edit from '../../../../../img/Edit.png'
import Delete from '../../../../../img/Delete.png'
import './xarajatTurlari.css'
import {useState, useEffect} from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import XarajatTurlariReducer, {
    deleteXarajatlarTurlari,
    editXarajatlarTurlari,
    getXarajatlarTurlari,
    saveXarajatlarTurlari,

} from "../reducer/XarajatTurlariReducer";
import branchreducer, {getbranch} from "../../../../../reducer/branchreducer";
import users from "../../../../../reducer/users";
import XarajatlarReducer, {editXarajatlar, getXarajatlar, saveXarajatlar,} from "../reducer/XarajatlarReducer";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";

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
    const [search, setSearch] = useState('')
    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState(null)

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

    const [saveModal, setSaveModal] = useState(false)


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
        setTimeout(() => {
            setLoading(true)
        }, 500)
    }, [XarajatTurlariReducer.getOutlayBool])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div className="col-md-12 mt-4 mb-4">
            <div className="textHeaderXRT">
                <h2>{t('Expenses.3')}</h2>
            </div>
            <div className="rowStyleXRT ">
                <div className="qoshish">
                    <h5>Barcha turlar</h5>
                    {
                        users.addOutlay ?
                            <button onClick={toggle} className='btn btn-primary'>+{t('Buttons.2')}</button>
                            : ''
                    }
                </div>

                {
                    loading ?
                        XarajatTurlariReducer.xarajatturlari?.length>0 ?
                            <div>
                                <div className="izlashXRT">
                                    <div>
                                        <button><img src={Excel} alt=""/> Export Excel</button>
                                    </div>
                                    <div className="izlashBox2">
                                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                                               placeholder='Izlash...'/>
                                    </div>
                                </div>
                                <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar mb-4">
                                    <table className='table table-striped table-bordered mt-4'>
                                        <thead>
                                        <tr>
                                            <th>Nomi</th>
                                            <th>Amallar</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {
                                            XarajatTurlariReducer.xarajatturlari
                                                .filter(val => {
                                                    if (search === '') {
                                                        return val
                                                    } else if (val.name.toUpperCase().includes(search.toUpperCase())) {
                                                        return val
                                                    }

                                                })
                                                .map(item => <tr key={item.id}>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        {
                                                            users.editOutlay ?
                                                                <button onClick={() => edit(item.id)}
                                                                        className='taxrirlash'><img
                                                                    src={Edit} alt=""/> {t('Buttons.1')}
                                                                </button> : ''
                                                        }
                                                        {
                                                            users.deleteOutlay ?
                                                                <button
                                                                    onClick={() => deleteOutlayCategoryById(item.id)}
                                                                    className='ochirish'><img src={Delete}
                                                                                              alt=""/> {t('Buttons.3')}
                                                                </button>
                                                                : ''
                                                        }
                                                    </td>
                                                </tr>)
                                        }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            : <div>
                                <h4 className={'text-center'}>{XarajatTurlariReducer.message}</h4>
                            </div>
                        : <Loading/>
                }


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

            </div>
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
