import {connect} from "react-redux";
import MahsulotTurlariReducer, {
    deleteProductType,
    editProductType,
    getProductType,
    saveProductType
} from "../reducer/MahsulotTurlariReducer";
import Edit from '../../../../../img/Edit.png'
import Delete from '../../../../../img/Delete.png'
import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import './mahsulotturlari.css'
import users from "../../../../../reducer/users";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";
import MainHeaderText from "../../../../Svg/MainHeaderText";
import {ButtonAnt} from "../../../../Svg/SelectAnt";

function MahsulotTurlari({
                             saveProductType,
                             getProductType,
                             users,
                             MahsulotTurlariReducer,
                             editProductType,
                             deleteProductType
                         }) {

    const {t} = useTranslation()


    const [typeName, setTypeName] = useState('')
    const [valueList, setValueList] = useState([{
        name: '',
        delete: false
    }])
    const [saveModal, setSaveModal] = useState(false)
    const [active, setActive] = useState(false)
    const [isCheck, setIsCheck] = useState(false)


    // function search(e) {
    //     input.search = e.target.value
    //     let a = {...input}
    //     setInput(a)
    // }


    function toggle() {
        setActive(!active)
        setTypeName('')
        setValueList([{
            name: '',
            delete: false
        }])
    }


    function handleAdd() {
        let a = [...valueList, {
            name: '',
            delete: false
        }]
        setValueList(a)
    }

    function save() {
        if (!typeName || valueList?.length === 0) {

        }
        if (editId) {
            editProductType({
                id: editId,
                businessId: users.businessId,
                name: typeName,
                typeValueDtoList: valueList
            })
        } else {
            saveProductType({
                businessId: users.businessId,
                name: typeName,
                typeValueDtoList: valueList
            })

        }
        setSaveModal(true)

    }

    useEffect(() => {
        if (MahsulotTurlariReducer.saveBoolean) {
            setTypeName('')
            setValueList([{
                name: ''
            }])
            setEditId(null)
            setActive(false)
            setLoading(false)
            setdeletemodal(false)
            setdeletID(null)
        }
        setSaveModal(false)
    }, [MahsulotTurlariReducer.current])

    function handleDelete(index,id) {
        if (id) {
            const newArr = valueList.map((obj, val) => {
                if (val === index) {
                    return {...obj, delete: true};
                }
                return obj;
            })
            setValueList(newArr)
        }
        else {
            valueList.splice(index, 1)
            let a = [...valueList]
            setValueList(a)
        }

    }

    function handleChange(e, i) {
        const newArr = valueList.map((obj, val) => {
            if (val === i) {
                return {...obj, name: e.target.value};
            }
            return obj;
        })
        setValueList(newArr)
    }


    const [deletemodal, setdeletemodal] = useState(false)


    const [editId, setEditId] = useState(null)


    function editt(id) {
        setActive(true)
        setEditId(id)
        MahsulotTurlariReducer.productType.map(item => {
            if (item.id === id) {
                setTypeName(item.name)
                setValueList(item.values)
            }
        })

    }


    const [deleteID, setdeletID] = useState(null)

    function deleteFunc() {
        deleteProductType(deleteID)
        setSaveModal(true)
    }

    function deleteProductTypeById(productId) {
        setdeletID(productId)
        setdeletemodal(true)
    }

    useEffect(() => {
        getProductType(users.businessId)
    }, [MahsulotTurlariReducer.current])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 500)
    }, [MahsulotTurlariReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])


    return (
        <div>
            <div className="col-md-12 d-flex align-items-center justify-content-between">
                <MainHeaderText text={t('ProductType.1')}/>
                <ButtonAnt onClick={toggle} type={'primary'} text={t('Employ.4')}/>
            </div>

            <div className="rowStyleBL">
                {
                    loading ?
                        <div>
                            {
                                MahsulotTurlariReducer.productType?.length > 0 ?
                                    <div className="table-responsive table-wrapper-scroll-y mb-4">
                                        <table className='table  table-bordered mt-4'>
                                            <thead>
                                            <tr>
                                                <th>T/R</th>
                                                <th>{t('ProductType.1')}</th>
                                                <th>{t('ProductType.2')}</th>
                                                <th>{t('as.6')}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                MahsulotTurlariReducer?.productType
                                                    .map((item, index) =>
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item?.name}</td>
                                                            <td>
                                                                {item?.values.map(item2 =>
                                                                    <span className={'p-0 m-0'}>{item2.name}, </span>
                                                                )
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    users.productTypeRoles ?
                                                                        <button className='btn btn-info'
                                                                                onClick={() => editt(item.id)}>
                                                                            <img
                                                                                src={Edit} alt=""/> {t('Buttons.1')}
                                                                        </button> : ''
                                                                }
                                                                {
                                                                    users.productTypeRoles ?
                                                                        <button className='btn btn-danger'
                                                                                onClick={() => deleteProductTypeById(item.id)}>
                                                                            <img src={Delete} alt=""/> {t('Buttons.3')}
                                                                        </button> : ''
                                                                }
                                                            </td>
                                                        </tr>)
                                            }

                                            </tbody>
                                        </table>
                                    </div>
                                    : <div className={'text-center'}>
                                        <h4 className={'text-center'}>{MahsulotTurlariReducer.message || 'NOT FOUND'}</h4>
                                    </div>
                            }

                        </div> : <Loading/>
                }


                <Modal isOpen={active} toggle={toggle}>
                    <ModalHeader>
                        {t('mah.1')}
                    </ModalHeader>
                    <ModalBody>
                        <label htmlFor="xl">{t('mah.2')}</label>
                        <input value={typeName} onChange={(e) => setTypeName(e.target.value)} type="text"
                               className={'form-control'}
                               id={'xl'}/>

                        <div className={'mt-1'}>
                            {
                                valueList.map((data, index) => {
                                    return (
                                        data.delete === false ?
                                            <div className={'d-flex'}>
                                                <input value={data.name} className={'form-control mt-2'} type="text"
                                                       onChange={e => handleChange(e, index)}/>
                                                {
                                                    index === 0 ? <button onClick={handleAdd}
                                                                          className={'btn mt-2 mr-1 btnLeft btn-primary'}>+</button>
                                                        :
                                                        <button className={'btn mt-2 btnLeft mr-1 btn-danger'}
                                                                onClick={() => handleDelete(index,data?.id ? data?.id : null)}>x
                                                        </button>
                                                }

                                            </div> : ''
                                    )
                                })

                            }
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <button className={'btn btn-danger'}
                                onClick={() => setActive(prevState => !prevState)}>{t('Buttons.7')}</button>
                        <button className={'btn btn-success'} onClick={save}>{t('Buttons.6')}</button>
                    </ModalFooter>
                </Modal>

                <ModalLoading isOpen={saveModal}/>
                <AgreeModal deleteModaltoggle={() => setdeletemodal(prevState => !prevState)} deleteFunc={deleteFunc}
                            deletemodal={deletemodal}/>
            </div>
        </div>)
}

export default connect((MahsulotTurlariReducer, users), {
    getProductType, saveProductType, editProductType, deleteProductType
})(MahsulotTurlari)