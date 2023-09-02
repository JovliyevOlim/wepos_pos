import React, {useState} from 'react'
import './communicator.css'
import {connect} from "react-redux";
import SuperAdminReducer, {getUserForPassword, changePassword} from "../../reducers/SuperAdminReducer";
import {toast} from "react-toastify";

function Communicator({getUserForPassword, SuperAdminReducer, changePassword}) {


    const [user, setUserName] = useState('')
    const [id, setId] = useState(null)
    const [active, setActive] = useState(false)
    const [search, setSearch] = useState('')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function onChangeUser(e) {
        getUserForPassword(e.target.value)
        setSearch(e.target.value)
        setActive(true)
        setUserName('')
        setId(null)
    }

    function selectUser(name, id) {
        setActive(false)
        setUserName(name)
        setId(id)
    }

    function SavePassword() {
        if (password === "" && confirmPassword === "") {
            toast.error('Parolni kiriting')
        } else if (password === confirmPassword) {
            changePassword({
                id: id,
                password: password
            })
            setActive(true)
            setUserName('')
            setId(null)
            setSearch('')
        } else {
            toast.error('Parollar teng emas')
        }
    }


    return (
        <div className='containerCommunicator'>
            <h4 className='text-center mb-3'>Change Password User</h4>
            <div className="row">
                <div className="col-md-12 mb-4 ">
                    <h6>Search by Login</h6>
                    <div className={'position-relative'}>
                        <input type="text" value={search} onChange={onChangeUser} className='form-control'
                               placeholder={'Search....'}/>
                        {
                            active ?
                                SuperAdminReducer.user.length > 0 ?
                                    <div className={'position-absolute left-0  resultUser'}>
                                        {
                                            SuperAdminReducer.user.map(item =>
                                                <p onClick={() => selectUser(item.username, item.id)}
                                                   className={'resultUser-item'}>{item.username}</p>
                                            )
                                        }
                                    </div> : 'not found user'
                                : ""
                        }

                    </div>
                </div>
            </div>
            {
                id ?
                    <div className="row mt-5">
                        <h5>Login : <b>{user}</b></h5>
                        <div className="col-md-12 p-0 d-flex mt-3 mb-4 ">
                            <div className={'col-md-6'}>
                                <h6>Password</h6>
                                <div className={'position-relative'}>
                                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}
                                           className='form-control' placeholder={'Password'}/>
                                </div>
                            </div>
                            <div className={'col-md-6'}>
                                <h6>Confirm Password</h6>
                                <div className={'position-relative'}>
                                    <input type="text" value={confirmPassword}
                                           onChange={(e) => setConfirmPassword(e.target.value)} className='form-control'
                                           placeholder={'Confirm Password'}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 d-flex justify-content-end">
                            <button onClick={SavePassword} className={'btn btn-primary'}>Save</button>
                        </div>
                    </div> : ''
            }

        </div>
    )
}

export default connect((SuperAdminReducer), {getUserForPassword, changePassword})(Communicator)