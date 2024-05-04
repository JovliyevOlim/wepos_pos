import {useTranslation} from 'react-i18next';
import MonthlyGoalsTarget from "./MonthlyGoalsTarget";
import React from "react";
import MaxsulotlarRoyxariReducer from "../../reducer/MaxsulotlarRoyxariReducer";
import {connect} from "react-redux";
import users from "../../../../../../reducer/users";
import FirmaReducer, {getFirma} from "../../reducer/FirmaReducer";
import Imagecom from "../../../../../Imagecom";
import {Space, Typography, Tag} from 'antd';
import ProductSomeDetails from "./ProductSomeDetails";
import Block1 from "./ProductQuantityDetails";


const {Text, Title} = Typography;


function ProductImagePercent({MaxsulotlarRoyxariReducer}) {
    const {t} = useTranslation();
    const {
        name, photoId, many,
        salePrice
    } = MaxsulotlarRoyxariReducer.productView

    function FindPercent() {
        let number = 0
        if (MaxsulotlarRoyxariReducer.productView) {
            let averageNumber = MaxsulotlarRoyxariReducer?.productView?.productManyGetDtoList?.length
            let totalSalePrice = 0
            MaxsulotlarRoyxariReducer.productView.productManyGetDtoList?.map(item => {
                totalSalePrice += item.salePrice
            })
            number = totalSalePrice / averageNumber
        }
        return number
    }


    return (
        <div>
            <div className="d-flex flex-wrap align-items-stretch">
                <div className={'d-flex flex-column align-items-stretch col-12  col-md-12 col-lg-4 gap-3 pe-2'}>
                    <div className={'bg-white rounded-bottom-4 rounded-start-0 p-4'}>
                        <div className={'col-md-12 p-4'}>
                            {
                                photoId === null ?
                                    <Imagecom/> :
                                    <Imagecom id={photoId}/>

                            }
                        </div>
                        <div className={'col-md-12 mt-4'}>
                            <Space direction="vertical">
                                <Text style={{margin: 0}} type={'secondary'}>
                                    {t('as.25')}
                                </Text>
                                <Title level={3} strong style={{margin: 0}}>
                                    {name}
                                </Title>
                                <Tag color="#108ee9"> {
                                    !many ?
                                        <strong style={{fontSize: '16px'}}>{salePrice} {t('as.27')} </strong>
                                        : <strong style={{fontSize: '16px'}}>{FindPercent()} {t('as.27')} </strong>

                                }</Tag>
                            </Space>
                        </div>
                    </div>
                    <div className={'bg-white rounded-end-4 h-100 rounded-start-0'}>
                        <MonthlyGoalsTarget></MonthlyGoalsTarget>
                    </div>
                </div>
                <div
                    className={'d-flex flex-column align-items-stretch col-12  col-md-12 col-lg-8 gap-3 ps-1 p-2 pb-0'}>
                    <ProductSomeDetails/>
                </div>
            </div>
            <Block1/>
        </div>

    );
}

export default connect((MaxsulotlarRoyxariReducer, users, FirmaReducer), {
    getFirma
})(ProductImagePercent)