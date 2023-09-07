import './chek.css'
import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import { Editor } from '@tinymce/tinymce-react'
import {connect} from "react-redux";
import photoreducer,{savephoto,clearPhotoId,deletePhoto} from "../../../../../../reducer/photoreducer";
import checkReducer,{getInvoice,editInvoice} from "../../../../../../reducer/checkReducer";
import users from "../../../../../../reducer/users";
import Imagecom from "../../../../../Imagecom";
function Chek({savephoto,photoreducer,checkReducer,getInvoice,editInvoice,users,deletePhoto}){

    const [name,setName] = useState('')
    const [chekHead,setchekHead] = useState('')
    const [chekFooter,setFooter] = useState('')
    const [photo,setPhoto] = useState(null)
    const [branch,setbranch] = useState(null)

    useEffect(()=>{
        getInvoice(users.branchId)
        setbranch(users.branchId)
    },[checkReducer.current])

    useEffect(()=>{
        if (checkReducer.check){
            const {name,footer,description,photoId} = checkReducer.check
            setName(name)
            setchekHead(description)
            setFooter(footer)
            setPhoto(photoId)
        }
    },[checkReducer.getBoolean])

    useEffect(()=>{
        if (photoreducer.photo){
            setPhoto(photoreducer.photo)
        }
    },[photoreducer.current])


    useEffect(()=>{
        if (checkReducer.saveBoolean){
            clearPhotoId()
        }
    },[checkReducer.saveBoolean])

    function selectBranch(e){
        setbranch(e.target.value)
        getInvoice(e.target.value)
    }

    function savePicture(e) {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        savephoto(data)
    }
     function onSubmit2(){
        editInvoice({
            name,
            footer:chekFooter,
            description:chekHead,
            photoId:photo,
            branchId:branch ? branch : users.branchId
        })
    }
    function onChangeHeadText(e){
        setchekHead(e.target.getContent())
    }

    function onChangeFooterText(e){
        setFooter(e.target.getContent())
    }

    return(
        <div className={'aloqaCont'}>
             <h3 className='text-center pb-3'>{t('set.23')}</h3>
                <div className={'row'}>
                    <div className="col-md-12">

                            {
                                users.branches  ?
                                    users.branches.length > 1 ?
                                        <div className={'col-md-6 col-sm-12'}>
                                        <h4>{t('set.24')}</h4>
                                        <select onChange={selectBranch} value={branch} className={'form-control'}>
                                            {
                                                        users.branches.map(item=>
                                                            <option value={item.id}>{item.name}</option>)
                                            }
                                        </select>
                                        </div>
                                        :'' :''
                            }

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="col-sm-12 mb-2">
                            <label htmlFor={'login1'}>Name</label>
                            <input type="text" id={'login1'} value={name} onChange={(e)=>setName(e.target.value)}
                                   className={'form-control'}/>
                        </div>
                        <div className={'col-md-12 col-sm-12'}>
                            <p className={"p-0 m-0"}>Logo</p>
                            <label htmlFor={'mahRasm'}  style={{width: "100%"}}>
                                <p className={'btn btn-outline-primary form-control'}>Add Picture</p>
                            </label>
                            <input type="file" className={'form-control d-none'}
                                   id={'mahRasm'} onChange={savePicture}
                                   style={{background: 'transparent'}}/>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <Imagecom id={photo}/>
                    </div>

                        <div className="col-sm-12  mb-2">
                            <h4>{t('set.25')}</h4>
                                    <Editor
                                        initialValue={chekHead}
                                        onChange={onChangeHeadText}

                                    />
                        </div>
                    <div className="col-sm-12  mb-2">
                        <h4>{t('set.26')}</h4>
                        <Editor
                            initialValue={chekFooter}
                            onChange={onChangeFooterText}/>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: chekHead}}>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: chekFooter}}>
                    </div>
                </div>
                <div className={'d-flex justify-content-end'}>
                    <button onClick={onSubmit2} className={'btn btn-primary'} >{t('set.11')}</button>
                </div>
        </div>
    )
}
export default connect((photoreducer,checkReducer,users),{savephoto,getInvoice,editInvoice,deletePhoto}) (Chek)