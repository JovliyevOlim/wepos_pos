import React from 'react'
import './paymentSettings.css'
import { Editor } from '@tinymce/tinymce-react'

export default function PaymentSettings() {
    return (
        <div className='ms-3 me-3'>
            <h5 className='mb-3 text-center'>Payment Gateways</h5>

            <div className="row">
                <div className="col-sm-12 col-md-6 mb-4">
                    <label className='container d-flex'>
                        <input type="checkbox" style={{ width: '40px', height: '20px' }} />
                        Enable Offline Payment
                    </label>
                </div>
                <div className="col-sm-12 col-md-6 mb-4">
                    <p><label htmlFor="tex">Offline payment details:</label></p>
                    <textarea name="" id="tex"  rows="4"></textarea>
                </div>
            </div>


            <div className="row">
                <b className={'mb-3'}>Stripe:</b>
                <div className="col-sm-12 col-md-6 mb-4">
                    <h6>App Name:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className="col-sm-12 col-md-6 mb-4">
                    <h6>App Title:</h6>
                    <input type="text" className='form-control' />
                </div>
            </div>
            <hr />

            <div className="row">
                <b className={'mb-3'}>Razorpay:</b>
                <div className="col-sm-12 col-md-6 mb-4">
                    <h6>Key ID:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className="col-sm-12 col-md-6 mb-4">
                    <h6>Key Secret:</h6>
                    <input type="text" className='form-control' />
                </div>
            </div>

            <hr />
            <div className="row">
                <b className={'mb-3'}>Paystack</b>
                <div className="col-sm-12 col-md-6 mb-4">
                    <h6>Public key:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className="col-sm-12 col-md-6 mb-4">
                    <h6>Secret key:</h6>
                    <input type="text" className='form-control' />
                </div>
            </div>

            <hr />
            <div className="row">
                <b className='mt-3'>Paypal:</b>
                <div className="col-md-4 mb-4">
                    <h6>Mode:</h6>
                    <select name="" id="" className='form-control'>
                        <option value="">Tanlang</option>
                    </select>
                </div>
                <div className="col-md-4 mb-4">
                    <h6>Sandbox api Username:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className="col-md-4 mb-4">
                    <h6>Sandbox api Password:</h6>
                    <input type="text" className='form-control' />
                </div>
            </div>

<hr />
            <div className="row">
                <div className="col-md-3 mb-4">
                    <h6>Sandbox api Secret:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className="col-md-3 mb-4">
                    <h6>Live api Username:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className="col-md-3 mb-4">
                    <h6>Live api Password:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className="col-md-3 mb-4">
                    <h6>Live api Secret:</h6>
                    <input type="text" className='form-control' />
                </div>
            </div>


        <hr />

            <div className="row">
                <b className='mt-3'>Pesapal: <h style={{ fontSize: '12px' }}>For NGN Nigeria, GHS Ghana</h></b>
                <div className="col-md-4 mb-4">
                    <h6>Consumer Key:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className="col-md-4 mb-4">
                    <h6>Consumer Secret:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className="col-md-4 mb-4">
                    <h6>Is Live?</h6>
                    <select name="" id="" className='form-control'>
                        <option value="">Tanlang</option>
                    </select>
                </div>
            </div>

<hr />

            <div className="row">
                <b className='mt-3'>Flutterwave:</b>
                <div className="col-md-4 mb-4">
                    <h6>Consumer Key:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className="col-md-4 mb-4">
                    <h6>Secret key:</h6>
                    <input type="text" className='form-control' />
                </div>
                <div className="col-md-4 mb-4">
                    <h6>Encryption key:</h6>
                    <input type="text" className='form-control' />
                </div>
            </div>

            <a href="https://support.flutterwave.com/en/articles/3632719-accepted-currencies">Click this link to check supported currencies for flutterwave</a>

            <div className="d-flex justify-content-end">
                <button className='btn btn-primary'>Saqlash</button>
            </div>
        </div>
    )
}
