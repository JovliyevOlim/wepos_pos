import './bolimlar.css'
import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import BolimReducer, {deleteBolim, editBolim, getBolim, saveBolim,} from "../reducer/BolimReducer";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";
import MainHeaderText from "../../../../Components/MainHeaderText";
import {ButtonAnt} from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import CardBody from "../../../../Components/CardBody";

function Bolimlar({
                      editBolim,
                      getBolim,
                      saveBolim,
                      deleteBolim,
                      BolimReducer,
                      users,
                  }) {

    const {t} = useTranslation()
    const {resetField, reset, setValue, handleSubmit, register, formState: {errors}} = useForm()
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(false)
    const [editId, setEditId] = useState(null)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: 10,
        },
        {
            title: t('as.4'),
            width: 50,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('as.5'),
            dataIndex: 'description',
            key: 'description',
            width: 50,
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-start gap-1 flex-wrap'}>

                {
                    users.categoryRoles &&
                    <ButtonAnt text={t('ol.78')} type={'primary'} onClick={() => {
                        editBolimF(values.id)
                    }
                    } icon={<EditOutlined/>}/>
                }
                {
                    users.categoryRoles && <ButtonAnt text={t('ol.79')} danger={true} type={'primary'} onClick={() => {
                        deleteCategoryById(values.id)
                    }
                    } icon={<DeleteOutlined/>}/>
                }

            </div>,
        },
    ];

    function toggle() {
        setActive(!active)
        resetField('name', '')
        resetField('description', '')
        setEditId('')
    }


    function editBolimF(id) {
        setActive(true)
        setEditId(id)
        let a = BolimReducer.bolimlar.filter(i => i.id === id)
        setValue('name', a[0].name)
        setValue('description', a[0].description)
    }


    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState('')

    function deleteFunc() {
        deleteBolim(deleteID)
    }

    function deleteCategoryById(id) {
        setdeletemodal(!deletemodal)
        setdeletID(id)
    }

    useEffect(() => {
        getBolim(users.businessId)
    }, [BolimReducer.current])

    const [saveModal, setSaveModal] = useState(false)

    useEffect(() => {
        if (BolimReducer.saveBoolean) {
            resetField('name', '')
            resetField('description', '')
            setEditId('')
            setActive(false)
            setLoading(false)
            setdeletemodal(false)
            setdeletID('')
        }
        setSaveModal(false)
    }, [BolimReducer.current])

    function onSubmit(data) {
        if (editId) {
            editBolim({
                ...data, businessId: users.businessId, id: editId
            })
        } else {
            save(data)
        }
        setSaveModal(true)
    }

    function save(data) {
        saveBolim({
            ...data, businessId: users.businessId, parentCategory: null
        })
    }


    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 500)
    }, [BolimReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div>
                <div  className="col-md-12 d-flex justify-content-between align-items-center mb-5">
                    <MainHeaderText text={t('as.1')}/>
                    {
                        users.categoryRoles ?
                            <ButtonAnt onClick={toggle} type={'primary'} text={t('ol.2')}/> : ''
                    }
                </div>

            <CardBody>
                {

                    loading ?
                        BolimReducer.bolimlar.length > 0 ?
                            <div>
                                {
                                    <div
                                        className="table-responsive table-wrapper-scroll-y  mb-4">
                                        <CommonTable data={BolimReducer.bolimlar} columns={columns} page={0} pagination={false} size={BolimReducer.bolimlar?.length}/>
                                    </div>
                                }
                            </div>
                            :
                            <div>
                                <h4 className={'text-center'}>{BolimReducer.message}</h4>
                            </div>
                        : <Loading/>}


            </CardBody>
            <Modal isOpen={active} toggle={toggle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>
                        {t('Sections.8')}
                    </ModalHeader>
                    <ModalBody>
                        <label htmlFor={'bnomi'}>{t('Sections.9')}</label>
                        <input type="text" className={'form-control '}
                               {...register('name', {required:{value:true,message:(t('as.7'))}})}
                               placeholder={t('as.8')}
                               id={'bnomi'}/>
                        {
                            errors.name && <div>
                                <p className={'text-danger text-center m-0 p-0'}>{errors.name.message}</p>
                            </div>
                        }
                        <label className={'mt-3'} htmlFor={'area'}>{t('Buttons.17')}</label>
                        <input type="text" {...register('description', {required: false})}
                               placeholder={'Description'}
                               className={'form-control'} name="description"/>
                    </ModalBody>
                    <ModalFooter>
                        <button className={'btn btn-danger'} onClick={toggle}
                                type={"button"}>{t('Buttons.7')}
                        </button>
                        <button className={'btn btn-success'} type={"submit"}>{t('Buttons.6')}</button>
                    </ModalFooter>
                </form>
            </Modal>
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deleteModaltoggle={()=>setActive(prevState => !prevState)} deletemodal={deletemodal} deleteFunc={deleteFunc}/>
        </div>
    )
}

export default connect((BolimReducer, users), {
    getBolim,
    saveBolim,
    deleteBolim,
    editBolim,
})(Bolimlar)
