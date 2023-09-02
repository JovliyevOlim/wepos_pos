import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

export default function ApplicationSettings() {
    return (
        <div className='ms-3 me-3'>
            <h5 className='mb-3 text-center'>Application Settings</h5>
            <div className="row">
                <div className="col-sm-12 col-md-6 col-xl-4  mb-4">
                    <h6>App Name:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className=" col-sm-12 col-md-6 col-xl-4  mb-4">
                    <h6>App Title:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className="col-md-6 col-xl-4  col-sm-12  mb-4">
                    <h6>App Default Language:</h6>
                    <select name="" id="" className='form-control' style={{ cursor: 'pointer' }}>
                        <option value="">Tanlang</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-sm-12 mb-md-4">
                    <label className='container d-flex'>
                        <input type="checkbox" style={{ width: '40px', height: '20px' }} />
                        Allow Registration
                    </label>
                </div>
                <div className="col-md-6 col-sm-12 mb-md-4">
                    <label className='container d-flex'>
                        <input type="checkbox" style={{ width: '40px', height: '20px' }} />
                        Enable Terms / Conditions in Registration
                    </label>
                </div>
            </div>
            <div className="row mb-4 mt-4">
                <div className="col-md-12">
                    <Editor/>
                </div>
            </div>
                       
            <div className="d-flex justify-content-end">
                <button className='btn btn-primary'>Saqlash</button>
            </div>
        </div>
    )
}
