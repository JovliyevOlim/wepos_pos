import './business.css'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import allbusinessreducer, {changeBusinessMinus, getOneBusiness,editMyBusiness} from "../../../SUPERADMIN/reducers/allbusinessreducer";
import users from "../../../../../../reducer/users";
import {useTranslation} from "react-i18next";

function Business({changeBusinessMinus, users, getOneBusiness, allbusinessreducer,editMyBusiness}) {


    const [businessName, setBusinessName] = useState('')
    const [businessDescription, setBusinessDescription] = useState('')
    const [editActive, setEditActive] = useState(false)
    const {t} = useTranslation()


    useEffect(() => {
        getOneBusiness(users.businessId)
        setEditActive(false)
    }, [allbusinessreducer.current])


    useEffect(() => {
        if (allbusinessreducer.onebusiness) {
            setBusinessName(allbusinessreducer.onebusiness?.name)
            setBusinessDescription(allbusinessreducer.onebusiness?.description)
        }
    }, [allbusinessreducer.businessMinusSHopBoolean])

   function editMyBusinessById(){
        editMyBusiness({
            name:businessName,
            description:businessDescription
        })
   }


    return (
        <div className={'MaxsulotCont'}>
            <h3 className='text-center pb-3'>{t('set.12')}</h3>
            <div className={'col-md-12 d-flex align-items-end'}>
                <div className={'col-md-4'}>
                    <label>{t('set.13')}</label>
                    <input type="text" disabled={!editActive} value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                           className={'form-control'}/>
                </div>
                <div className={'col-md-4'}>
                    <label>{t('set.14')}</label>
                    <input type="text" value={businessDescription} disabled={!editActive}
                           onChange={(e) => setBusinessDescription(e.target.value)} className={'form-control'}/>
                </div>
                <div className={'col-md-4'}>
                    {
                        editActive ? <button onClick={editMyBusinessById} className={'btn btn-success'}>{t('set.11')}</button>
                            : <button onClick={()=>setEditActive(prevState => !prevState)} className={'btn btn-primary'}>{t('set.15')}</button>

                    }
                </div>
            </div>
        </div>
    )
}

export default connect((allbusinessreducer, users), {changeBusinessMinus, getOneBusiness,editMyBusiness})(Business)
