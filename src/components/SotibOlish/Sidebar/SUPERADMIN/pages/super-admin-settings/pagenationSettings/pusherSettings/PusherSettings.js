import React from 'react'

export default function PusherSettings() {
    return (
        <div>
            <div className='ms-3 me-3'>
                <h5 className='mb-3 text-center'>Pusher Settings</h5>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <h6>BPUSHER APP ID:</h6>
                        <input type="text" className='form-control' />
                    </div>
                    <div className="col-md-6 mb-4">
                        <h6>EPUSHER APP KEY:</h6>
                        <input type="text" className='form-control' />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <h6>PUSHER APP SECRET:</h6>
                        <input type="text" className='form-control' />
                    </div>
                    <div className="col-md-6 mb-4">
                        <h6>PUSHER APP CLUSTER:</h6>
                        <input type="text" className='form-control' />
                    </div>
                </div>



                <div className="d-flex justify-content-end" style={{ marginTop: '200px' }}>
                    <button className='btn btn-primary'>Saqlash</button>
                </div>
            </div>

        </div>
    )
}
