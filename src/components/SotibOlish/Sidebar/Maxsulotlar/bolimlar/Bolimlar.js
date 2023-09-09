import Excel from '../../../../../img/Excel.png'
import Edit from '../../../../../img/Edit.png'
import Delete from '../../../../../img/Delete.png'
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

            <div className="rowStyleBL">
                {

                    loading ?
                        BolimReducer.bolimlar.length > 0 ?
                            <div>
                                {
                                    <div
                                        className="table-responsive table-wrapper-scroll-y my-custom-scrollbar mb-4">
                                        <table className='table table-striped table-bordered mt-4'>
                                            <thead>
                                            <tr>
                                                <th>T/R</th>
                                                <th>{t('as.4')}</th>
                                                <th>{t('as.5')}</th>
                                                <th>{t('as.6')}</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            {
                                                BolimReducer.bolimlar.map((item, index) => <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.description}</td>
                                                        <td>
                                                            {users.categoryRoles ?
                                                                <button onClick={() => editBolimF(item.id)}
                                                                        className='taxrirlash'><img
                                                                    src={Edit}
                                                                    alt=""/> {t('Buttons.1')}
                                                                </button> : ''}
                                                            {
                                                                users.categoryRoles ?
                                                                    <button className='ochirish'
                                                                            onClick={() => deleteCategoryById(item.id)}>
                                                                        <img
                                                                            src={Delete}
                                                                            alt=""/> {t('Buttons.3')}
                                                                    </button> : ''}

                                                        </td>
                                                    </tr>
                                                )
                                            }

                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </div>
                            :
                            <div>
                                <h4 className={'text-center'}>{BolimReducer.message}</h4>
                            </div>
                        : <Loading/>}


            </div>
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
