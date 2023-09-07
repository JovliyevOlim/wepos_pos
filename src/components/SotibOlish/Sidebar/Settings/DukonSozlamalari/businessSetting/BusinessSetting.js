import './businessSetting.css'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import allbusinessreducer,{changeBusinessMinus,getOneBusiness} from "../../../SUPERADMIN/reducers/allbusinessreducer";
import users from "../../../../../../reducer/users";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

function BusinessSetting({changeBusinessMinus,users,getOneBusiness,allbusinessreducer}){


    const {t} = useTranslation()

    const [saleMinus,setSaleMinus] = useState(false)
    const [changeProductPrice, setChangeProductPrice] = useState(false)
    const [deleteDay,setDeleteDay] = useState(0)
    const [customerPercent,setCustomerPercent] = useState(false)
    const [gross,setGross] = useState(false)


    useEffect(()=>{
            if (allbusinessreducer.onebusiness){
                    setSaleMinus(allbusinessreducer.onebusiness?.saleMinus)
                    setDeleteDay(allbusinessreducer.onebusiness?.deleteDay)
                    setChangeProductPrice(allbusinessreducer.onebusiness?.discount)
                    setCustomerPercent(allbusinessreducer.onebusiness?.customer)
                    setGross(allbusinessreducer.onebusiness?.gross)
            }
    },[allbusinessreducer.businessMinusSHopBoolean])


    useEffect(()=>{
        getOneBusiness(users.businessId)
    },[allbusinessreducer.current])


    function saveChangeBusiness(){
        if (!deleteDay || deleteDay !== 0){
            changeBusinessMinus({
                deleteDay,saleMinus,discount:changeProductPrice,customer:customerPercent,gross
            })
        }
        else{
            toast.warning(t('set.16'))
        }

    }




    return(
        <div className={'MaxsulotCont'}>
             <h3 className='text-center pb-3'>{t('set.17')}</h3>

            <div className="row mb-4">
                <div className='col-12 mb-3 d-flex align-items-center  col-sm-12'>
                    <label htmlFor={'a'} className={'me-5'} style={{fontSize:'20px'}}>{t('set.18')}</label>
                    <input type="checkbox"  checked={saleMinus}
                           onChange={(e)=>setSaleMinus(e.target.checked)} style={{transform:'scale(2)'}}  id={'a'}/>
                </div>
                <div className='col-12 mb-3 d-flex align-items-center  col-sm-12'>
                    <label htmlFor={'a'} className={'me-5'} style={{fontSize:'20px'}}>{t('set.19')}</label>
                    <input type="checkbox"  checked={changeProductPrice}
                           onChange={(e)=>setChangeProductPrice(e.target.checked)} style={{transform:'scale(2)'}}  id={'a'}/>
                </div>
                <div className='col-12 mb-3 d-flex align-items-center  col-sm-12'>
                    <label htmlFor={'a'} className={'me-5'} style={{fontSize:'20px'}}>{t('set.20')}</label>
                    <input type="checkbox"  checked={customerPercent}
                           onChange={(e)=>setCustomerPercent(e.target.checked)} style={{transform:'scale(2)'}}  id={'a'}/>
                </div>
                <div className='col-12 mb-3 d-flex align-items-center  col-sm-12'>
                    <label htmlFor={'a'} className={'me-5'} style={{fontSize:'20px'}}>{t('set.21')}</label>
                    <input type="checkbox"  checked={gross}
                           onChange={(e)=>setGross(e.target.checked)} style={{transform:'scale(2)'}}  id={'a'}/>
                </div>
                <div className='col-12 mb-3 d-flex align-items-center  col-sm-12'>
                    <label htmlFor={'deleteDay'} className={'me-5'} style={{fontSize:'20px'}}>{t('set.22')}</label>
                    <input type="number" value={deleteDay}  size={'20'} className={'form-control'}
                           onChange={(e)=>setDeleteDay(e.target.value)}  id={'deleteDay'}/>
                </div>
            </div>
            <div className={'d-flex justify-content-center'} onClick={saveChangeBusiness}><button className={'btn btn-success'}>{t('set.11')}</button></div>
        </div>
    )
}
export default connect((allbusinessreducer,users),{changeBusinessMinus,getOneBusiness}) (BusinessSetting)
