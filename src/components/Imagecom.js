import {BaseUrl} from "../middleware";
import defaultProduct from '../img/image 3.jpg'

import './imageCom.css'

function Imagecom({id}) {
    return (
        <div className={'d-flex justify-content-center'}>
            {
                id ?
                <img className={'img-fluid picture-fluid'} src={`${BaseUrl}/attachment/download/${id}`} alt={`product ${id}`}/>
                    :  <img className={'img-fluid  picture-fluid'}
                            src={defaultProduct}
                            alt="default product"/>
            }
        </div>
    );
}

export default Imagecom;
