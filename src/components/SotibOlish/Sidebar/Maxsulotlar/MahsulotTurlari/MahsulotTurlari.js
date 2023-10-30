import {connect} from "react-redux";
import MahsulotTurlariReducer, {
    deleteProductType,
    editProductType,
    getProductType,
    saveProductType
} from "../reducer/MahsulotTurlariReducer";
import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import './mahsulotturlari.css'
import users from "../../../../../reducer/users";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";
import MainHeaderText, {AddOrEditText} from "../../../../Components/MainHeaderText";
import {ButtonAnt} from "../../../../Components/SelectAnt";
import CardBody from "../../../../Components/CardBody";
import CommonTable from "../../../../Components/CommonTable";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";

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


    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: 10,
        },
        {
            title: t('ProductType.1'),
            width: 50,
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: t('ProductType.2'),
            dataIndex: 'values',
            key: 'values',
            width: 100,
            render: (item) => <p className={'m-0'}>
                {item.map(item2 =>
                    <span className={'p-0 m-0'}>{item2.name}, </span>
                )
                }
            </p>
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-center gap-1 flex-wrap'}>
                {
                    users.productTypeRoles &&
                    <ButtonAnt text={t('button.edit')} type={'primary'} onClick={() => {
                        editt(values.id)
                    }
                    } icon={<EditOutlined/>}/>
                }
                {
                    users.productTypeRoles &&
                    <ButtonAnt text={t('button.delete')} danger={true} type={'primary'} onClick={() => {
                        deleteProductTypeById(values.id)
                    }
                    } icon={<DeleteOutlined/>}/>
                }

            </div>,

        },
    ];


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

    function handleDelete(index, id) {
        if (id) {
            const newArr = valueList.map((obj, val) => {
                if (val === index) {
                    return {...obj, delete: true};
                }
                return obj;
            })
            setValueList(newArr)
        } else {
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
            setLoading(true)
    }, [MahsulotTurlariReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])


    return (
        <div>
            <div className="col-md-12 d-flex align-items-center justify-content-between">
                <MainHeaderText text={t('sidebar.addType')}/>
                <ButtonAnt onClick={toggle} type={'primary'} icon={<PlusOutlined/>} text={t('button.add')}/>
            </div>

            <CardBody>
                <Loading spinning={loading}>
                    {
                        MahsulotTurlariReducer.productType?.length > 0 ?
                            <div className="table-responsive table-wrapper-scroll-y mb-4">
                                <CommonTable data={MahsulotTurlariReducer?.productType} columns={columns}
                                             size={MahsulotTurlariReducer.productType?.length} page={0}
                                             pagination={false}/>
                            </div>
                            : <div className={'text-center'}>
                                <h4 className={'text-center'}>{MahsulotTurlariReducer.message || 'NOT FOUND'}</h4>
                            </div>
                    }
                </Loading>
            </CardBody>
            <Modal isOpen={active} toggle={toggle}>
                <ModalHeader>
                    <AddOrEditText text={t('mah.1')}/>
                </ModalHeader>
                <ModalBody>
                    <label className={'global-label'} htmlFor="xl">{t('mah.2')}</label>
                    <input value={typeName} onChange={(e) => setTypeName(e.target.value)} type="text"
                           className={'form-control'} placeholder={'Turni nomi'}
                           id={'xl'}/>

                    <div className={'mt-1'}>
                        {
                            valueList.map((data, index) => {
                                return (
                                    data.delete === false ?
                                        <div className={'d-flex'}>
                                            <input value={data.name} placeholder={`Tur ${index + 1}`}
                                                   className={'form-control mt-2'} type="text"
                                                   onChange={e => handleChange(e, index)}/>
                                            {
                                                index === 0 ? <button onClick={handleAdd}
                                                                      className={'btn mt-2 mr-1 btnLeft btn-primary'}>+</button>
                                                    :
                                                    <button className={'btn mt-2 btnLeft mr-1 btn-danger'}
                                                            onClick={() => handleDelete(index, data?.id ? data?.id : null)}>x
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
    )
}

export default connect((MahsulotTurlariReducer, users), {
    getProductType, saveProductType, editProductType, deleteProductType
})(MahsulotTurlari)