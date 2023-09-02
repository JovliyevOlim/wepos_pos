import React, {useEffect} from 'react'
import './packageadd.css'
import {useForm} from "react-hook-form";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import tariffReducer, {saveTariff, getTariffById, editTariff} from "../../../../../../../reducer/tariffReducer";

function PackageAdd({saveTariff, match, getTariffById, editTariff, tariffReducer}) {

    const history = useHistory()
    const {setValue, formState: {errors}, register, handleSubmit} = useForm()


    useEffect(() => {
        if (match.params.id) {
            getTariffById(match.params.id)
        }
    }, [])

    useEffect(() => {
        if (match.params.id) {
            editTariffs()
        }
    }, [tariffReducer.current])

    function editTariffs() {
        if (tariffReducer.oneTariff) {
            const {
                name,
                description,
                branchAmount,
                employeeAmount,
                interval,
                price,
                testDay,
                history,
                branchPrice
            } = tariffReducer.oneTariff
            setValue('name', name)
            setValue('description', description)
            setValue('branchAmount', branchAmount)
            setValue('employeeAmount', employeeAmount)
            setValue('interval', interval)
            setValue('price', price)
            setValue('testDay', testDay)
            setValue('branchPrice', branchPrice)
            setValue('history', history)
        }
    }




    function onSubmitTariff(data) {
        if (match.params.id) {
            editTariff({
                ...data,
                id: match.params.id,
            })
        } else {
            saveTariff({
                ...data,
            })
        }
    }


    useEffect(()=>{
        if (tariffReducer.saveTariffBoolean){
            history.push('/main/superadmin/paskages')
        }
    },[tariffReducer.current])

    return (
        <div className='containerStyle'>
            <form onSubmit={handleSubmit(onSubmitTariff)}>
                <div className="textBlock ">
                    <h4 className='me-2'>Tarifflar </h4>
                    <p>Yangi Tariff qo'shish</p>
                </div>
                <div className='container mt-3 styleBlock'>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <h6>Nomi:</h6>
                            <input
                                type="text"
                                className='form-control '
                                {...register('name', {required: true})}
                                placeholder={errors.name ? errors.name.type === "required" && "Name is required" : 'Name'}
                            />
                        </div>
                        <div className="col-md-6 ">
                            <h6>Tariff Tavsifi:</h6>
                            <input type="text" className='form-control '
                                   {...register('description', {required: true})}
                                   placeholder={errors.description ? errors.description.type === "required" && "Description is required" : 'Description'}
                            />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6 ">
                            <h6>Filiallar soni:</h6>
                            <input type="number" className='form-control'
                                   {...register('branchAmount', {required: true})}
                                   placeholder={errors.branchAmount ? errors.branchAmount.type === "required" && "BranchAmount is required" : 'BranchAmount'}
                            />
                            <p className={'p-0 m-0'}> 0 = unlimited</p>
                        </div>
                        <div className="col-md-6">
                            <h6>Xodimlar soni:</h6>
                            <input type="number" className='form-control'
                                   {...register('employeeAmount', {required: true})}
                                   placeholder={errors.employeeAmount ? errors.employeeAmount.type === "required" && "EmployeeAmount is required" : 'EmployeeAmount'}
                            />
                            <p className={'p-0 m-0'}> 0 = unlimited</p>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <h6>Interval:</h6>
                            <input type="number" className='form-control mb-4'
                                   {...register('interval', {required: true})}
                                   placeholder={errors.interval ? errors.interval.type === "required" && "Interval is required" : 'Interval'}
                            />
                        </div>
                        <div className="col-md-6">
                            <h6>Price: So'm</h6>
                            <input type="number" className='form-control mb-4'
                                   {...register('price', {required: true})}
                                   placeholder={errors.price ? errors.price.type === "required" && "Price is required" : 'Price'}
                            />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <h6>Test kuni:</h6>
                            <input type="number" className='form-control mb-4'
                                   {...register('testDay', {required: true})}
                                   placeholder={errors.testDay ? errors.testDay.type === "required" && "Test kunini kiriting" : 'Test kuni'}
                            />
                        </div>
                        <div className="col-md-6">
                            <h6>Qo'shimcha branch narxi</h6>
                            <input type="number" className='form-control mb-4'
                                   {...register('branchPrice', {required: true})}
                                   placeholder={errors.branchPrice ? errors.branchPrice.type === "required" && "Filial narxi" : 'Filial narxi'}
                            />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6 d-flex gap-2 align-items-center">
                            <input type="checkbox"
                                   {...register('history')}
                                style={{transform:'scale(1.3)'}}
                            />
                            <label>Xodimlar tarixi</label>
                        </div>
                    </div>


                </div>
                <div className='d-flex justify-content-end'>
                    <button type={'submit'} className='btn btn-primary'>Saqlash</button>
                </div>
            </form>
        </div>
    )
}

export default connect((tariffReducer), {saveTariff, getTariffById, editTariff})(PackageAdd)