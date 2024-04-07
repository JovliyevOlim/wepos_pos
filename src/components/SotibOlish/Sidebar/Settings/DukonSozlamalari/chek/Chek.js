import {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {QRCode} from "antd";
import { Editor } from '@tinymce/tinymce-react'

import photoreducer,{savephoto,clearPhotoId,deletePhoto} from "../../../../../../reducer/photoreducer";
import checkReducer,{getInvoice,editInvoice} from "../../../../../../reducer/checkReducer";
import users from "../../../../../../reducer/users";
import Imagecom from "../../../../../Imagecom";

import './chek.css'
import moment from "moment/moment";

function Chek({savephoto,photoreducer,checkReducer,getInvoice,editInvoice,users,deletePhoto}){
    const [name,setName] = useState('')
    const [chekHead,setchekHead] = useState('')
    const [chekFooter,setFooter] = useState('')
    const [chekQrCode,setQrCode] = useState('')
    const [photo,setPhoto] = useState(null)
    const [branch,setbranch] = useState(null)
    const {t} = useTranslation()

    useEffect(()=>{
        getInvoice(users.branchId)
        setbranch(users.branchId)
    },[checkReducer.current])

    useEffect(()=>{
        if (checkReducer.check){
            const {name,footer,description,photoId, qrCode} = checkReducer.check
            setName(name)
            setchekHead(description)
            setFooter(footer)
            setQrCode(qrCode)
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
            qrCode: chekQrCode,
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
                        <input type="text" id={'login1'} value={name} onChange={(e) => setName(e.target.value)}
                               className={'form-control'}/>
                    </div>
                    <div className="col-sm-12 mb-2">
                        <label htmlFor={'qrcode'}>Qr Ma'lumot</label>
                        <input type="text" id={'qrcode'} value={chekQrCode} onChange={(e) => setQrCode(e.target.value)}
                               className={'form-control'}/>
                    </div>
                    <div className={'col-md-12 col-sm-12'}>
                        <p className={"p-0 m-0"}>Logo</p>
                        <label htmlFor={'mahRasm'} style={{width: "100%"}}>
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

                      apiKey='kkjjryyh1qoiepsxtam1vtgslftwdprq3whrt32rc1gloupt'
                      initialValue={chekHead}
                      onChange={onChangeHeadText}
                    />
                </div>
                <div className="col-sm-12 mb-2">
                    <h4>{t('set.26')}</h4>
                    <Editor
                      apiKey='kkjjryyh1qoiepsxtam1vtgslftwdprq3whrt32rc1gloupt'
                      initialValue={chekFooter}
                      onChange={onChangeFooterText}/>
                </div>
                <div className="col-12">
                    <div className="d-flex justify-content-center bgGary py-3">
                        <div className="bg-white" style={{width: "300px"}}>
                            <svg className="w-100 checkTop" width="306" height="9" viewBox="0 0 306 9" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M0 9H8.99992H26.9999H44.9999H62.9999H80.9999H98.9999H117H135H153H171H189H207H225H243H252H261H279H297H306V0L297 9L288 0L279 9L270 0L261 9L252 0L243 9L234 0L225 9L216 0L207 9L198 0L189 9L180 0L171 9L162 0L153 9L144 0L135 9L126 0L117 9L108 0L98.9999 9L89.9999 0L80.9999 9L71.9999 0L62.9999 9L53.9999 0L44.9999 9L35.9999 0L26.9999 9L17.9999 0L8.99992 9L0 0V9Z"
                                  fill="white"></path>
                            </svg>
                            <div className="px-2">
                                {
                                    photo ? <div className={'d-flex justify-content-center align-items-center'}>
                                        <Imagecom id={photo}/>
                                    </div> : null
                                }
                                {
                                    name ? <h2 className={'text-center'}>{name}</h2> : null
                                }
                                {
                                    checkReducer.check ?
                                      <div dangerouslySetInnerHTML={{__html: chekHead}}>
                                      </div> : null
                                }
                                <br/>
                                <div className={'d-flex justify-content-between align-items-center'}>
                                    <div style={{fontSize: 12, fontWeight: 600}}>
                                        {
                                            moment(new Date()).format("DD:MM:YYYY")
                                        }
                                    </div>
                                    <div style={{fontSize: 12, fontWeight: 600}}>
                                        {
                                            moment(new Date()).format("HH:mm:ss")
                                        }
                                    </div>
                                </div>
                                <div className={'d-flex justify-content-between align-items-center'}>
                                    <div style={{fontSize: 12, fontWeight: 600}}>
                                        {t('mah.41')}
                                    </div>
                                    <div style={{fontSize: 12, fontWeight: 600}}>10</div>
                                </div>
                                <div className={'d-flex align-items-center justify-content-between'}>
                                    <h1 style={{fontSize: 12, fontWeight: 600}}>{t('mah.42')} </h1>
                                    <h1 style={{fontSize: 12, fontWeight: 600}}>Abdulbosit</h1>
                                </div>
                                <div style={{borderBottom: "1px dashed #000"}}></div>
                                <div className={'mt-3 table-responsive'}>
                                    <div>
                                        <h1 style={{fontSize: 12, fontWeight: 600}}>1. Kartoshka</h1>
                                        <div style={{marginLeft: 20, marginTop: -7}}
                                             className={"d-flex align-items-center justify-content-between"}>
                                            <h1 style={{
                                                fontSize: 12,
                                                fontWeight: 600,
                                                lineHeight: 1
                                            }}>
                                                1.5 kg * 4000 {t('mah.39')}</h1>
                                            <h1 style={{fontSize: 12, fontWeight: 600, lineHeight: 1}}>
                                                = 6000 {t('mah.39')}
                                            </h1>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 style={{fontSize: 12, fontWeight: 600}}>2. Non</h1>
                                        <div style={{marginLeft: 20, marginTop: -7}}
                                             className={"d-flex align-items-center justify-content-between"}>
                                            <h1 style={{
                                                fontSize: 12,
                                                fontWeight: 600,
                                                lineHeight: 1
                                            }}>
                                                3 dona * 5000 {t('mah.39')}</h1>
                                            <h1 style={{fontSize: 12, fontWeight: 600, lineHeight: 1}}>
                                                = 15000 {t('mah.39')}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div style={{borderBottom: "1px dashed #000", marginTop: 20}}></div>
                                <div className={'d-flex'}>

                                    <div style={{width: "100%"}}>
                                        <div className={"d-flex justify-content-between"}>
                                            <h1 style={{fontSize: 14, fontWeight: 800}}>{t('mah.43')} </h1>
                                            <h1 style={{
                                                fontSize: 14,
                                                fontWeight: 800
                                            }}>21000 {t('mah.39')}</h1>
                                        </div>
                                        <div className={"d-flex justify-content-between"}>
                                            <h1 style={{
                                                fontSize: 13,
                                                fontWeight: 600
                                            }}>Naqd:</h1>
                                            <h1 style={{
                                                fontSize: 13,
                                                fontWeight: 600
                                            }}>10000 {t('mah.39')}</h1>
                                        </div>
                                        <div className={"d-flex justify-content-between"}>
                                            <h1 style={{
                                                fontSize: 13,
                                                fontWeight: 600
                                            }}>Plastik:</h1>
                                            <h1 style={{
                                                fontSize: 13,
                                                fontWeight: 600
                                            }}>5000 {t('mah.39')}</h1>
                                        </div>
                                        <div className={"d-flex justify-content-between"}>
                                            <h1 style={{fontSize: 13, fontWeight: 600}}>{t('mah.44')}</h1>
                                            <h1 style={{
                                                fontSize: 13,
                                                fontWeight: 600
                                            }}>15000 {t('mah.39')}</h1>
                                        </div>
                                        <div className={"d-flex justify-content-between"}>
                                            <h1 style={{fontSize: 14}}>{t('mah.45')} </h1>
                                            <h1 style={{
                                                fontSize: 14,
                                            }}>6000 {t('mah.39')}</h1>
                                        </div>
                                        <div className={"d-flex justify-content-between"}>
                                            <h1 style={{fontSize: 14, fontWeight: 800}}>{t('mah.46')} </h1>
                                            <h1 style={{
                                                fontSize: 14,
                                                fontWeight: 800
                                            }}>45000 {t('mah.39')}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div style={{borderBottom: "1px dashed #000"}}></div>
                                {
                                    checkReducer.check ?
                                      <div dangerouslySetInnerHTML={{__html: chekFooter}}>
                                      </div>
                                      : null
                                }
                                {
                                    chekQrCode ? <div className="d-flex align-items-center justify-content-center">
                                        <QRCode
                                          value={chekQrCode || '-'}
                                          errorLevel={"H"}
                                          size={200}
                                        />
                                    </div> : null
                                }
                            </div>
                            <svg className="w-100 checkBottom" width="306" height="9" viewBox="0 0 306 9" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M0 0H8.99992H26.9999H44.9999H62.9999H80.9999H98.9999H117H135H153H171H189H207H225H243H252H261H279H297H306V9L297 0L288 9L279 0L270 9L261 0L252 9L243 0L234 9L225 0L216 9L207 0L198 9L189 0L180 9L171 0L162 9L153 0L144 9L135 0L126 9L117 0L108 9L98.9999 0L89.9999 9L80.9999 0L71.9999 9L62.9999 0L53.9999 9L44.9999 0L35.9999 9L26.9999 0L17.9999 9L8.99992 0L0 9V0Z"
                                  fill="white"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'d-flex justify-content-end mt-3'}>
                <button onClick={onSubmit2} className={'btn btn-primary w-100'}>{t('set.11')}</button>
            </div>
        </div>
    )
}

export default connect((photoreducer, checkReducer, users), {savephoto, getInvoice, editInvoice, deletePhoto})(Chek)
