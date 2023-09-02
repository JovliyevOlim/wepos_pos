import React, {useEffect, useState} from 'react'
import './mainpagetitles.css'
import Edit from '../../../../../../img/Edit.png'
import Delete from '../../../../../../img/Delete.png'
import {connect} from "react-redux";
import users from "../../../../../../reducer/users";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import formatDate from "../../../../../../util";
import {toast} from "react-toastify";
import Loading from "../../../../../Loading";
import {useForm} from "react-hook-form";
import photoreducer, {savePhotoTitle, clearPhotoId} from "../../../../../../reducer/photoreducer";
import Imagecom from "../../../../../Imagecom";

function MainPageTitles({
                            users,
                            titleReducer,
                            getTitle,
                            saveTitle,
                            savePhotoTitle,
                            photoreducer,
                            deleteTitle,
                            editTitle
                        }) {


    const {register, setValue, handleSubmit, resetField, formState: {errors}} = useForm()

    const [active, setActive] = useState(false)
    const [photoId, setPhotoId] = useState(null)

    useEffect(() => {
        getTitle()
    }, [titleReducer.current])

    function toggle() {
        setActive(!active)
        resetField('name')
        resetField('description')
        resetField('link')
        setPhotoId(null)
        setEditID(null)
    }


    const [editID, setEditID] = useState(null)

    function edit(id) {
        toggle()
        setEditID(id)
        if (titleReducer.title) {
            let a = titleReducer.title.filter(item => item.id === id)
            setValue('name', a[0].name)
            setValue('description', a[0].description)
            setValue('link', a[0].link)
            setPhotoId(a[0].photo?.id)
        }
    }

    let [counter, setCounter] = useState(0)
    const [visible, setvisible] = useState(5)

    function koproq() {

        //
        // for (let i=0; a;i++){
        //     counter+=visible
        //     if (counter<a){
        //         setvisible(prev => prev + 5)
        //         return;
        //     }else {
        //         toast.error(`Ko'rish uchun ma'lumot yo'q`)
        //         return
        //     }
        // }
    }


    useEffect(()=>{
        if (photoreducer.titlePhoto){
            setPhotoId(photoreducer.titlePhoto)
        }
    },[photoreducer.titlePhotoCurrent])


    function savePhoto(e) {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        savePhotoTitle(data)
    }

    useEffect(() => {
        if (titleReducer.saveBoolean) {
            toggle()
            setLoading(false)
            setEditID(null)
            clearPhotoId()
        }
    }, [titleReducer.current])

    function save(data) {
        if (editID) {
            editTitle({
                ...data,
                photoId: photoreducer.titlePhoto,
                id: editID
            })
        } else {
            saveTitle({
                ...data,
                photoId: photoreducer.titlePhoto
            })
        }

    }

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(false)
        clearPhotoId()
        setEditID(null)
    }, [])

    useEffect(() => {
        setLoading(true)
    }, [titleReducer.current])


    return (

        <div className="rowStylePageS">

            <div className="izlashPageS">
                <div>
                    <h4>Main pages Titles</h4>
                </div>
                <div className="izlashBox2">
                    <button className={'btn btn-outline-primary'} onClick={toggle}>+Qo'shish</button>
                </div>
            </div>
            <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
                <table className='table  table-striped table-bordered mt-4'>
                    <thead>
                    <tr>

                        <th>Title</th>
                        <th>Description</th>
                        <th>Link</th>
                        <th>Picture</th>
                        <th>Amallar</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        loading ?
                            titleReducer.title ?
                                titleReducer.title.map(item =>
                                    <tr>
                                        <th>{item.name}</th>
                                        <th>{item.description}</th>
                                        <th>{item.link}</th>
                                        <th>
                                            <Imagecom id={item.photo?.id}/>
                                        </th>
                                        <th>
                                            <button onClick={() => edit(item.id)} className={'btn btn-success'}>Edit
                                            </button>
                                            <button onClick={() => {
                                                deleteTitle(item.id)
                                                setLoading(false)
                                            }} className={'btn btn-danger'}>Delete
                                            </button>
                                        </th>
                                    </tr>
                                ) :
                                <div>
                                    <h4>{titleReducer.message}</h4>
                                </div>
                            : <Loading/>
                    }
                    </tbody>
                </table>
                {/*/!*<button className={'btn btn-outline-danger form-control'}>Ko'proq ko'rish</button>*!/*/}
                {/*{*/}
                {/*    subscripreducer.subscrip.length > 5 ?<button onClick={koproq} className={'btn btn-outline-danger form-control'}>Ko'proq ko'rish</button>:''*/}
                {/*}*/}
            </div>
            <Modal isOpen={active} toggle={toggle}>
                <form onSubmit={handleSubmit(save)}>
                    <ModalHeader>
                        <h3>Qo'shish</h3>
                    </ModalHeader>
                    <ModalBody>
                        <div className={'mb-4'}>
                            <label htmlFor="title" className={'fw-bold'}>Title</label>
                            <input type="text" id={'title'}
                                   {...register('name', {required: true})}
                                   placeholder={errors.name ? errors.name?.type === "required" && "Name is required" : 'Name'}
                                   className={'form-control mb-2'}/>
                        </div>
                        <div className={'d-flex flex-wrap mb-4'}>
                            <label htmlFor="description" className={'d-block fw-bold'}>Description</label>
                            <textarea name="" id="description"
                                      {...register('description')}
                                      placeholder={errors.description ? errors.description?.type === "required" && "Description is required" : 'Description'}
                                      cols="100" rows="5"></textarea>
                        </div>
                        <div className={'mb-4'}>
                            <label htmlFor="link" className={'fw-bold'}>Link</label>
                            <input type="text" id={'link'} className={'form-control mb-2'}
                                   {...register('link', {required: true})}
                                   placeholder={errors.link ? errors.link?.type === "required" && "Link is required" : 'Link'}
                            />
                        </div>
                        <div className={'mb-4'}>
                            <p className={"p-0 m-0"}>Add picture</p>
                            <label htmlFor={'mahRasm'} style={{width: "100%"}}>
                                <p className={'btn btn-outline-primary form-control'}>Add picture</p>
                            </label>
                            <input type="file" className={'form-control d-none'}
                                   onChange={savePhoto} id={'mahRasm'}
                                   style={{background: 'transparent'}}/>
                        </div>
                        <div className={'mb-4'}>
                            {
                                console.log(photoId)
                            }
                            {
                                photoId ?
                                    <Imagecom id={photoId}/>
                                    : ''
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type={'submit'} className={'btn btn-outline-primary'}>Saqlash</button>
                        <button onClick={toggle} type={'button'} className={'btn btn-primary'}>Chiqish</button>
                    </ModalFooter>
                </form>
            </Modal>

        </div>
    )
}

export default connect((users, photoreducer), {
    savePhotoTitle,
})(MainPageTitles)
