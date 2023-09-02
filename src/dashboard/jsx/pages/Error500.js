import React from "react";
import {Link} from "react-router-dom";

const Error500 = () => {
    return (
        <div className="authincation h-100 p-meddle">
            <div className="container h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-md-5 mt-5">
                        <div className="form-input-content text-center error-page">
                            <h1 className="error-text font-weight-bold">
                                <i className={"fa flaticon-381-success-2 text-success"}></i>
                            </h1>
                            <h4 className={'text-success'}>
                                <i className="fa fa-link "/>{" "}
                                SIZ RO'YHATDAN O'TDINGIZ
                            </h4>
                            <p className={'text-success'}>Kirish uchun tugmani bosing</p>
                            <div>
                                <Link className="btn btn-success" to="/login">
                                    Login </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error500;
