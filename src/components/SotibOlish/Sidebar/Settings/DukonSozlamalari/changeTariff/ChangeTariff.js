import './changeTariff.css'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import users from "../../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import tariffReducer,{getTariffChoose} from "../../../../../../reducer/tariffReducer";
import { Carousel } from 'antd';

function ChangeTariff({users,getTariffChoose,tariffReducer}){

    const {t} = useTranslation()

    const [tariffId,setTariffId] = useState(null)

    useEffect(()=>{
        getTariffChoose()
    },[])


    const contentStyle = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };



    return(
        <div className={'aloqaCont'}>
             <h3 className='text-center pb-3'>Tariffni o'zgartirish</h3>
                    <div className="col-md-12">
                        <Carousel effect="fade">
                            <div>
                                <h3 style={contentStyle}>1</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>2</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>3</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>4</h3>
                            </div>
                        </Carousel>
                            {

                                tariffReducer.tariffchoose.length > 0 ?
                                        <div className={'col-md-6 col-sm-12'}>
                                        <h4>Tariffni tanlang</h4>
                                        <select onChange={(e)=>setTariffId(e.target.value)} value={tariffId} className={'form-control'}>
                                            <option value="">Tanlang</option>
                                            {
                                                tariffReducer.tariffchoose.map(item=>
                                                            <option value={item.id}>{item.name}</option>)
                                            }
                                        </select>
                                        </div>
                                        :''
                            }

                    </div>

                <div className={'d-flex justify-content-end'}>
                    {/*<button onClick={onSubmit2} className={'btn btn-primary'} >{t('set.11')}</button>*/}
                </div>
        </div>
    )
}
export default connect((users,tariffReducer),{getTariffChoose}) (ChangeTariff)