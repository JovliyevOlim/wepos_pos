import React from 'react';
import {useTranslation} from "react-i18next";
import MaxsulotlarRoyxariReducer from "../../reducer/MaxsulotlarRoyxariReducer";
import {connect} from "react-redux";
import users from "../../../../../../reducer/users";
import Imagecom from "../../../../../Imagecom";
function ProductOneImage({MaxsulotlarRoyxariReducer}) {
    const {t} = useTranslation();


    const {name, photoId, salePrice, measurementName, many} = MaxsulotlarRoyxariReducer.productView
    const {average,day} = MaxsulotlarRoyxariReducer.productViewExtra

    function FindPercent() {
        let number = 0
        if (MaxsulotlarRoyxariReducer.productView) {
            let averageNumber = MaxsulotlarRoyxariReducer?.productView?.productManyGetDtoList?.length
            let totalSalePrice = 0
            MaxsulotlarRoyxariReducer.productView.productManyGetDtoList?.map(item => {
                totalSalePrice += item.salePrice
            })
            number = totalSalePrice/averageNumber
        }
        return number
    }

    return (
        <div>
            <div className={'productOne-img'}>
                {
                    photoId === null ?
                        <Imagecom/> :
                        <Imagecom id={photoId}/>

                }
            </div>
        </div>
    );
}

export default connect(MaxsulotlarRoyxariReducer) (ProductOneImage);