import React from 'react';
import {BaseUrl} from "../middleware";
import './imageCom.css'
import defaultProduct from '../img/image 3.jpg'
function Imagecom({id}) {
    return (
        <div className={'d-flex justify-content-center'}>
            {
                id ?
                <img   className={'img-fluid picture-fluid'} src={`${BaseUrl}/attachment/download/${id}`} alt="###"/>
                    :  <img className={'img-fluid  picture-fluid'}
                            src={defaultProduct}
                            alt="###"/>
            }
        </div>
    );
}

export default Imagecom;
